<template>
<div class="scene stepWrapper">
  <div class="stepTitle">Select Scene</div>
  <div class="stepContent">
    <div :class="['stepItem', activeIndex === index ? 'active' : '']" v-for="(item, index) in sceneList" :key="index" @click="handleSelect(item, index)">
      <template v-if="item.title === 'platform'">
        On the <span>{{ item.title }}</span>
      </template>
      <template v-if="item.title === 'carriage'">
        In the <span>{{ item.title }}</span>
      </template>
    </div>
  </div>
  <div class="stepBottomButtons">
    <el-button type="warning" size="large" @click.native="$router.back()">PREV</el-button>
    <el-button type="danger" size="large" @click.native="handleNext">Start</el-button>
  </div>
</div>
</template>
<script>
export default {
  name: 'Index',
  data() {
    return {
      activeIndex: -1
    }
  },
  created() {
    this.activeIndex = this.sceneIndex
  },
  methods: {
    handleSelect(item, index) {
      this.activeIndex = index
    },
    handleNext() {
      if(this.activeIndex < 0 || this.activeIndex >= this.sceneList.length) {
        this.$message.warning('请选择场景')
      } else if(this.identityIndex < 0 || this.identityIndex >= this.identityList.length) {
        this.$message.warning('您还未选择角色')
      } else  {
        this.SET_SCENE_INDEX(this.activeIndex)
        this.$router.push('Learning')
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import '~@/assets/step.scss';
</style>