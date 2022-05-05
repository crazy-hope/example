<template>
  <div class="page">
    <div class="pageLeft">
      <h1 class="logo"><div>城市轨道交通客运服务</div><div>英语情景模拟实训平台</div></h1>
      <el-menu
        class="menu"
        :default-active="$route.name"
        :router="true"
        background-color="#7778f7"
        text-color="#FFFFFF"
        active-text-color="#FFFFFF"
        >
        <el-menu-item index="Identity" route="/Index/Identity">
          <i class="el-icon-reading"></i>
          <span slot="title">Roles</span>
        </el-menu-item>
        <el-menu-item index="Scene" route="/Index/Scene">
          <i class="el-icon-reading"></i>
          <span slot="title">Scenes</span>
        </el-menu-item>
        <el-menu-item index="SignIn" route="/SignIn">
          <i class="el-icon-switch-button"></i>
          <span slot="title">Sign Out</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="pageRight">
      <div class="statusBar">
        <el-alert
          :title="`Current Status：${curIdentity.sentence},${curScene.sentence}`"
          type="success">
        </el-alert>
      </div>
      <div class="content">
        <transition name="fade">
          <keep-alive>
            <router-view />
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Index',
  data() {
    return {
    }
  },
  
  created() {
    if(this.identityIndex < 0 || this.sceneIndex < 0) {
      this.$router.push('Identity')
    }
  }
}
</script>
<style scoped lang="scss">
.page {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  .pageLeft {
    flex: 0 0 240px;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    background: #7778f7;
    color: #FFFFFF;
    overflow: auto;
    > * {
      width: 100%;
    }
    .logo {
      flex: 0 0 100px;
      width: 100%;
      height: 100px;
      padding-top: 20px;
      font-size: 22px;
      text-align: center;
      margin-bottom: 30px;
      font-family: 'GothamBlack';
      border-bottom: 1px solid darken(#7778f7, 3);
    }
    .menu {
      flex: 1 1 auto;
      border-right: 0;
    }
  }
  .pageRight {
    position: relative;
    padding-top: 40px;
    flex: 1 1 auto;
    height: 100%;
    overflow: auto;
  }
  .statusBar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
  }
  .content {
    width: 100%;
    height: 100%;
  }
}

/deep/ .el-menu-item {
  &.is-active {
    background: #4f51e0 !important;
  }
   i {
    color: #FFFFFF;
  }
}
</style>