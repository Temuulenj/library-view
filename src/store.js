import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)
export default new Vuex.Store({
  state :{
    readerInfo: {
      readerId: '',
      name: '',
      email: '',
      reserveStatus: '',
      seatId: ''
    },
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
