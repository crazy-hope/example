import Vue from "vue"
import VueRouter from "vue-router"

// 引入组件
import Index from "@/views/index.vue"
import Identity from "@/views/identity.vue"
import Scene from "@/views/scene.vue"
import Learning from "@/views/learning.vue"
import Course from "@/views/course.vue"
import SignIn from "@/views/signIn.vue"

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const baseTitle = '城市轨道交通客运服务英语情景模拟实训平台-'

const routes = [
    {
        path:"/",
        name: 'Index',
        meta: {
            title: baseTitle + '首页'
        },
        redirect: '/Index'
    },
    {
        path:"/Index",
        component: Index,
        name: 'Index',
        meta: {
            title: baseTitle + '首页'
        },
        redirect: '/Index/Learning',
        children: [{
            path:"Learning",
            name: 'Learning',
            component: Learning,
            meta: {
                title: baseTitle + '学习'
            },
        },{
            path:"Course",
            name: 'Course',
            component: Course,
            meta: {
                title: baseTitle + '课程'
            },
        },{
            path:"Identity",
            name: 'Identity',
            component: Identity,
            meta: {
                title: baseTitle + '选择身份'
            },
        },{
            path:"Scene",
            name: 'Scene',
            component: Scene,
            meta: {
                title: baseTitle + '选择场景'
            },
        }]
    },
    {
        path:"/SignIn",
        component: SignIn,
        meta: {
            title: baseTitle + '登录'
        }
    }
]

var router =  new VueRouter({
    mode: 'hash',
    routes
})


router.beforeEach((to, from, next) => {
    if (to.meta.title) {
      document.title = to.meta.title
    }
    next()
  })


export default router;