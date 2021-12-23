import  Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    readerInfo: {
      readerId: '',
      name: '',
      email: '',
      reserveStatus: '',
      seatId: '',
      numberOfViolation: '',
      signInStatus: '',
    },
    reserveSeat: '',
    signInStatus: 0,
  },
  mutations: {
    signIn(state,readerInfo){
      state.readerInfo=readerInfo
      sessionStorage.setItem('readerInfo',JSON.stringify(readerInfo))
      state.signInStatus=1
    },
    signOut(state){
      sessionStorage.removeItem('readerInfo')
      state.readerInfo={}
      state.signInStatus=0
    },
    setReaderInfo(state){
    },
    reserveSignIn(state){
      state.readerInfo.signInStatus=0
      sessionStorage.setItem("readerInfo",JSON.stringify(state.readerInfo))
    },
    reserveSignOut(state){
      state.readerInfo.reserveStatus=1
      state.readerInfo.seatId=null
      state.readerInfo.signInStatus=1
      sessionStorage.setItem("readerInfo",JSON.stringify(state.readerInfo))
    },
    updateReaderInfo(state,readerInfo){
      state.readerInfo=readerInfo
      sessionStorage.setItem('readerInfo',JSON.stringify(state.readerInfo))
    },
    setReserveSeat(state,reserveSeat){
      state.reserveSeat=reserveSeat
    }
  },
  actions: {
    reserve(state){
      this.$axios({
        url: 'api/reserve',
        method: 'post',
        params: {
          status: '0',
          readerId: state.readerInfo.readerId,
        }
      }).then((response => {
        if (response.data==='success'){
          state.readerInfo.reserveStatus=1
          state.readerInfo.seatId=null
          sessionStorage.setItem("readerInfo",JSON.stringify(this.$store.state.readerInfo))
          location.reload()
        }
      })).catch((error => {
        this.loading = false;
      }))
    },
  }
})
