<template>
<div class="identity stepWrapper">
  <div class="stepTitle">Select Roles</div>
  <div class="stepContent">
    <div :class="['stepItem', activeIndex === index ? 'active' : '']" v-for="(item, index) in identityList" :key="index" @click="handleSelect(item, index)">
      I am a <span>{{ item.title }}</span>
    </div>
  </div>
  <div class="stepBottomButtons">
    <el-button type="primary" size="large" @click.native="handleNext">Next</el-button>
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
    this.activeIndex = this.identityIndex
  },
  methods: {
    handleSelect(item, index) {
      this.activeIndex = index
    },
    handleNext() {
      if(this.activeIndex < 0 || this.activeIndex >= this.identityList.length) {
        this.$message.warning('请选择角色')
      } else {
        this.SET_IDENTITY_INDEX(this.activeIndex)
        this.$router.push('Scene')
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import '~@/assets/step.scss';
</style>