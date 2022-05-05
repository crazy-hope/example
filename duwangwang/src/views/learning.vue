<template>
<div class="learning innerPage">
  <h2 class="innerPageTitle" v-if="isShow">Learning</h2>
  <el-collapse accordion v-if="isShow">
    <el-collapse-item v-for="(item, index) in groupList" :key="index" :title="(index + 1) +': '+ item.title">
      <template v-if="item.children && item.children.length > 0">
        <div class="courseItem" v-for="(item2, index2) in item.children" :key="index+'_'+index2">
          <div class="courseItemTitle">{{ 'Topic'+(index2+1) +': '+ item2.title }}</div>
          <el-button class="courseItemButton" :icon="item2.isVoice ? 'el-icon-video-play' : ''" size="mini" type="primary" @click.native="handleLearn(index, index2)">Learn</el-button>
        </div>
      </template>
      <template v-else>
        <div class="courseItem">暂无数据</div></template>
    </el-collapse-item>
  </el-collapse>
</div>
</template>
<script>
import { courseList } from '@/data'
export default {
  name: 'Index',
  data() {
    return {
      isShow: false,
      groupList: courseList
    }
  },
  
  activated() {
    if(this.identityIndex < 0 || this.sceneIndex < 0) {
      this.$router.push('Identity')
    } else {
      this.isShow = true
    }
  },

  methods: {
    handleLearn(index, index2) {
      this.$router.push({
        name: 'Course',
        query: {
          groupIndex: index,
          topicIndex: index2
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
/deep/ .el-collapse-item__header {
  font-size: 18px;
}
/deep/ .el-collapse-item__header.is-active {
  color: #c00;
}

.courseItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #EBEEF5;
  &:hover {
    background: #EBEEF5;
  }
  &:last-child {
    border-bottom: none;
  }
  .courseItemTitle {
    flex: 1 1 auto;
  }
  .courseItemButton {
    flex: 0 0 100px;
  }
}
</style>