<template>
  <div id="app">
    <transition>
      <router-view />
    </transition>
  </div>
</template>

<script>
import { getStorage } from '@/utils'
  export default {
    name: "App",
    watch: {
      '$route'() {
        if(!this.isSignFail) this.$router.replace('/SignIn')
      }
    },
    created() {
      let token = getStorage('token')
      this.SET_TOKEN(token)
      if(!this.isSignFail) this.$router.replace('/SignIn')

      let identityIndex = getStorage('identityIndex')
      let sceneIndex = getStorage('sceneIndex')

      if(typeof identityIndex === 'number') {
        this.SET_IDENTITY_INDEX(identityIndex)
      } else {
        this.SET_IDENTITY_INDEX(-1)
      }
      if(typeof sceneIndex === 'number') {
        this.SET_SCENE_INDEX(sceneIndex)
      } else {
        this.SET_SCENE_INDEX(-1)
      }
    }
  };
</script>

<style lang="scss">
@import "~@/assets/fonts/fonts.scss";

* {
	box-sizing: border-box;
}
body {
	padding: 0;
	margin: 0;
}

html,
body {
	height: 100%;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
	margin: 0;
	font-weight: normal;
}
#app {
  width: 100%;
  height: 100%;
  font-family: 'GothamBook', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333;
  font-size: 16px;
}

.innerPage {
  padding: 30px;
  .innerPageTitle {
    position: relative;
    font-size: 30px;
    margin-bottom: 30px;
    padding-left: 20px;
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 5px;
      height: 30px;
      background: #c00;
      margin-top: -15px;
    }
    
  }
}
</style>
