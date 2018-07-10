import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/CatEye/Main'
import Film from '@/components/CatEye/Film'
import Cinema from '@/components/CatEye/Cinema'
import HotFilm from '@/components/CatEye/HotFilm'
import ComingFilm from '@/components/CatEye/ComingFilm'
import Match from '@/components/CatEye/Match'
import Users from '@/components/CatEye/Users'
import Login from '@/components/CatEye/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: 'film',
          name: 'Film',
          component: Film
        }, {
          path: 'cinema',
          name: 'Cinema',
          component: Cinema
        }, {
          path: 'hotfilm',
          name: 'HotFilm',
          component: HotFilm
        }, {
          path: 'comingFilm',
          name: 'ComingFilm',
          component: ComingFilm
        }, {
          path: 'users',
          name: 'Users',
          component: Users
        }, {
          path: 'match',
          name: 'Match',
          component: Match
        }
      ]
    },
    {
      path: '/login',
      name: "Login",
      component: Login
    }
  ]
})
