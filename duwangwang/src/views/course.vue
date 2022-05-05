<template>
<div class="course innerPage">
  <h2 class="innerPageTitle">{{ courseInfo.title }}</h2>
  <audio-player
    v-if="audioList && audioList.length > 0"
    ref="audioPlayer"
    class="audioPlayer"
    :currentPlayIndex="currentPlayIndex"
    :audio-list="audioList.map(elm => elm.src)"
    :before-play="handleBeforePlay"
    @pause="afterPause"
    theme-color="#ff2929"
    />
  <div class="talkContent">
    <el-button-group class="talkSetting" v-if="courseInfo.isVoice">
      <el-button type="primary" icon="el-icon-video-play" v-if="!isPlaying" @click.native="handlePlay">PLAY</el-button>
      <el-button type="info" icon="el-icon-video-pause" v-else @click.native="handlePause">PAUSE</el-button>
    </el-button-group>
    
    <template v-for="(item, index) in courseInfo.children">
      <div v-if="item.user === 1" :class="['talkItem', 'left', currentPlayIndex === index ? 'active':'']" :key="index">
        <div class="icon">A</div>
        <div class="sentence">
          <div class="btn" v-if="courseInfo.isVoice" @click="handlePlayItem(index)">
            <el-tooltip content="click play" placement="top">
              <i class="el-icon-video-play"></i>
            </el-tooltip>
          </div>
          {{ item.title }}
        </div>
      </div>
      <div v-if="item.user === 2" :class="['talkItem', 'right', currentPlayIndex === index ? 'active':'']" :key="index">
        <div class="sentence">
          <div class="btn" v-if="courseInfo.isVoice" @click="handlePlayItem(index)">
            <el-tooltip content="click play" placement="top">
              <i class="el-icon-video-play"></i>
            </el-tooltip>
          </div>
          {{ item.title }}
        </div>
        <div class="icon">B</div>
      </div>
    </template>
  </div>
</div>
</template>
<script>
import { courseList } from '@/data'
export default {
  name: 'Index',
  data() {
    return {
      groupList: courseList,
      courseInfo: {},
      currentPlayIndex: 0,
      isPlaying: false,
      audioList: []
    }
  },
  watch: {
    $route(to) {
      if(to.name === 'Course') {
        let { groupIndex, topicIndex } = to.query
        this.getCourse(groupIndex, topicIndex)
      }
    },
  },
  created() {
    let { groupIndex, topicIndex } = this.$route.query
    this.getCourse(groupIndex, topicIndex)
  },
  methods: {
    getCourse(groupIndex, topicIndex) {
      console.log(this.groupList, groupIndex)
      this.courseInfo = this.groupList[groupIndex].children[topicIndex]
      if(this.courseInfo.isVoice) {
        this.getVoice(groupIndex, topicIndex, this.courseInfo)
      }
    },
    getVoice(groupIndex, topicIndex, courseInfo) {
      let audioList = []
      courseInfo.children.forEach((item) => {
        let audio = require(`@/assets/voice/${groupIndex}/${topicIndex}/${item.audio}`)
        audioList.push({
          src: audio
        })
      })
      this.audioList = audioList
    },
    // 播放某一项录音
    handlePlayItem(index) {
      this.$refs.audioPlayer.pause()
      this.$refs.audioPlayer.currentPlayIndex = index
      this.$refs.audioPlayer.play()
    },
    // 播放前做的事
    handleBeforePlay(next) {
      this.$nextTick(() => {
        this.currentPlayIndex = this.$refs.audioPlayer.currentPlayIndex
        this.isPlaying = true
        next() // 开始播放
      })
    },
    handlePlay() {
      this.$refs.audioPlayer.play()
    },
    handlePause() {
      this.$refs.audioPlayer.pause()
    },
    afterPause() {
      this.isPlaying = false
    }
  }
}
</script>
<style scoped lang="scss">
.audioPlayer {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  overflow: hidden;
}
.talkContent {
  position: relative;
  width: 800px;
  background: #e7eeff;
  border: 1px solid darken(#EBEEF5, 6);
  padding: 50px 20px;
  font-family: 'GothamLight';
  .talkSetting {
    position: absolute;
    right: 0;
    top: 0;
  }
  .talkItem {
    margin-bottom: 20px;
    display: flex;
    align-items: flex-start;
    &.active,
    &:hover {
      .sentence,
      .icon {
        box-shadow: 0 0 10px #949494;
      }
      .sentence {
        .btn {
          display: block;
        }
      }
    }
  }
  .icon {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #FFFFFF;
    border-radius: 3px;
    transition: box-shadow 0.2s linear;
  }
  .sentence {
    position: relative;
    padding: 15px 40px 15px 15px;
    min-height: 40px;
    color: #FFFFFF;
    border-radius: 3px;
    margin: 0 10px;
    transition: box-shadow 0.2s linear;
    .btn {
      display: none;
      position: absolute;
      right: 5px;
      bottom: 5px;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
      i {
        vertical-align: top;
      }
    }
  }
  .left {
    padding-right: 100px;
    justify-content: flex-start;
    .icon {
      background: #409EFF;
      border: 1px solid darken(#409EFF, 6);
    }
    .sentence {
      background: lighten(#409EFF, 8);
      .btn {
        color: darken(#409EFF, 30);
      }
    }
  }
  .right {
    padding-left: 100px;
    justify-content: flex-end;
    .icon {
      background: #F56C6C;
      border: 1px solid darken(#F56C6C, 6);
    }
    .sentence {
      background: lighten(#F56C6C, 8);
      .btn {
        color: darken(#F56C6C, 30);
      }
    }
  }
}
</style>