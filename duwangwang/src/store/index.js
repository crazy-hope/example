import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);

import { setStorage } from "@/utils";

const store = new Vuex.Store({
    state: {
        token: '',
        identityIndex: -1,
        sceneIndex: -1,
        unknow: {
            index: -1,
            title: 'unknow',
            sentence: 'unknow'
        },
        identityList: [
            {
              index: 0,
              title: 'student',
              sentence: 'I am a student'
            },
            {
              index: 1,
              title: 'worker',
              sentence: 'I am a worker'
            }
        ],
        sceneList: [
            {
              index: 0,
              title: 'platform',
              sentence: 'On the platform'
            },
            {
              index: 1,
              title: 'carriage',
              sentence: 'In the carriage'
            }
        ]
    },
    getters: {
        isSignFail(state) {
            if(!state.token) return false
            let oldDate = state.token
            let newDate = new Date().getTime()
            console.log('newDate - oldDate >= 24 * 60 * 60 * 1000', newDate - oldDate >= 24 * 60 * 60 * 1000)
            if(newDate - oldDate >= 24 * 60 * 60 * 1000) return false
            return true
        },
        curIdentity(state) {
            if(state.identityIndex >= 0) {
                return state.identityList[state.identityIndex]
            }
            return state.unknow
        },
        curScene(state) {
            if(state.sceneIndex >= 0) {
                return state.sceneList[state.sceneIndex]
            }
            return state.unknow
        },
    },
    mutations: {
        SET_TOKEN(state, data) {
            state.token = data
            setStorage('token', data)
        },
        SET_IDENTITY_INDEX(state, data) {
            state.identityIndex = data
            setStorage('identityIndex', data)
        },
        SET_SCENE_INDEX(state, data) {
            state.sceneIndex = data
            setStorage('sceneIndex', data)
        }
    }
})

export default store;