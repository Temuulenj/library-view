<template style="margin: 0;padding: 0">
  <el-container>
    <el-header style="height: 7.5vh;padding: 0;line-height: 10px">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="background-color: #B3C0D1;color: black">
        <el-submenu index="1">
          <template slot="title" style="color: black">{{ active }}</template>
          <el-menu-item index="1" @click="go2index()">首页</el-menu-item>
          <el-menu-item index="2" @click="go2showFloorInfo()">预约座位</el-menu-item>
          <el-menu-item index="3">选项3</el-menu-item>
        </el-submenu>
        <el-row v-if="$store.state.signInStatus===1" style="margin: 1.2vh;padding: 0;float: right;" >
          <h1 style="margin: 0;padding: 0">
            <el-avatar class="md_headpic" :size="40" :src="avatarUrl" />{{'  '+readerInfo.name}}
            <el-link @click="$store.commit('signOut')" type="primary">注销</el-link>
          </h1>
        </el-row>
        <el-row v-else style="margin-top: 10px;padding: 0;float: right; margin-right: 10px">
          <el-button size="medium" type="primary" round @click="signUp()">注 册</el-button>
          <el-button size="medium" type="primary" round @click="signIn()">登 录</el-button>
        </el-row>
      </el-menu>
    </el-header>
      <el-main style="height: 85vh;margin: 0;padding: 0;text-align: center">
        <div v-if="$store.state.readerInfo.reserveStatus===0" style="margin: 5px;padding: 0;text-align: center;height: 5vh">
          <el-tag type="success" style="">您已预约{{$store.state.readerInfo.seatId}}座位</el-tag>
          <!--TODO-->
          <el-button size="small" @click="cancelReserve()" >取消预约</el-button>
        </div>
      <router-view v-loading="loading" style="text-align: center"/>
    </el-main>
    <el-footer style=" height: 7.5vh">
      <a style="color:#666;" target="_blank" rel="noopener" href="http://beian.miit.gov.cn/">蒙ICP备20002846号</a>
    </el-footer>
  </el-container>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  data(){
    return {
      avatarUrl: '../static/img/avatar.jpg',
      activeIndex: '1',
      active: '首页',
      loading: false
    }
  },
  computed: {
    ...mapState(['readerInfo'])
  },
  methods: {
    handleSelect(key, keyPath) {
    },
    go2index(){
      this.$router.push('/')
      this.active='首页'
    },
    go2showFloorInfo(){
      this.$router.push('/showFloorInfo')
      this.active='预约座位'
    },
    signIn(){
      this.$router.push('/signIn')
    },
    signUp(){
      this.$router.push('/signUp')
    },
    cancelReserve(){
      this.loading=true
      this.$axios({
        url: 'api/reserve',
        method: 'post',
        params: {
          status: '0',
          readerId: this.$store.state.readerInfo.readerId,
        }
      }).then((response => {
        if (response.data==='success'){
          this.$store.state.readerInfo.reserveStatus=1
          this.$store.state.readerInfo.seatId=null
          sessionStorage.setItem("readerInfo",JSON.stringify(this.$store.state.readerInfo))
          location.reload()
        }
      })).catch((error => {
        this.loading = false;
      }))
//todo
    },
  },
  created() {
    if (sessionStorage.getItem('readerInfo')==null){
    }else {
      this.$store.commit('signIn',JSON.parse(sessionStorage.getItem('readerInfo')))
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html,body{
  margin: 0;
  padding: 0;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  width: 100%;
}
.el-header{
  top: 0;
  height: 80%;
}
.el-footer{
  position:fixed;
  bottom: 0;
}
.el-main {
  height: 60%;
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  /*line-height: 160px;*/
}
.userInfo {
  line-height: 80px;
}
.md_headpic {
  border: none;
  vertical-align: middle;
  margin-left: 10px;
}
</style>
