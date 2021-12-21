import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import ShowAllSeat from "../components/ShowAllSeat";
import showFloorInfo from "../components/showFloorInfo";
import ShowByFloor from "../components/ShowByFloor";
import Index from "../components/Index"
import sbf from "../components/sbf";
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
      meta: {
        title: '小小志的数据库课设'
      }
    },
    {
      path: '/showSeats',
      name: 'ShowAllSeats',
      component: ShowAllSeat
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
    }
  ]
})
