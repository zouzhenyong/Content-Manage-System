import Vue from 'vue'

Vue.use(VueX)
import VueX from 'vuex'

import users from './modules/users.js'
import match from './modules/match.js'
import Film from './modules/Film.js'
import HotFilm from './modules/HotFilm.js'
import ComingFilm from './modules/ComingFilm.js'
import cinema from './modules/Cinema.js'

// 创建store
export default new VueX.Store({
    modules: {
        users,
        match,
        ComingFilm,
        HotFilm,
        Film,
        cinema
    }
})