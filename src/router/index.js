import Vue from 'vue'
import Router from 'vue-router'
import showFloorInfo from "../components/ShowFloorInfo";
import ShowByFloor from "../components/ShowByFloor";
import Index from "../components/Index"
import signIn from "../components/signIn";
import signUp from "../components/signUp";
import readerInfo from "../components/readerInfo";
import reserveInfo from "../components/reserveInfo";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/showFloorInfo',
      name: 'showFloorInfo',
      component: showFloorInfo
    },
    {
      path: '/showByFloor:floor',
      name: 'showByFloor',
      component: ShowByFloor
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: signIn
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/readerInfo',
      name: 'readerInfo',
      component: readerInfo
    },
    {
      path: '/reserveInfo:seatId',
      name: 'reserveInfo',
      component: reserveInfo
    },
    {
      path: ''
    }
  ]
})
