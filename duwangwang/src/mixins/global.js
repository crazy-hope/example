import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
    computed: {
        ...mapState({
            token: 'token',
            identityIndex: 'identityIndex',
            sceneIndex: 'sceneIndex',
            identityList: 'identityList',
            sceneList: 'sceneList'
        }),
        ...mapGetters({
            isSignFail: 'isSignFail',
            curIdentity: 'curIdentity',
            curScene: 'curScene'
        })
    },
    methods: {
        ...mapMutations({
            SET_TOKEN: 'SET_TOKEN',
            SET_IDENTITY_INDEX: 'SET_IDENTITY_INDEX',
            SET_SCENE_INDEX: 'SET_SCENE_INDEX'
        })
    }
}