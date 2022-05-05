import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import globalMixin from '@/mixins/global'
Vue.mixin(globalMixin)

import AudioPlayer from '@liripeng/vue-audio-player'
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'
Vue.use(AudioPlayer)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
