<template style="margin: 0;padding: 0">
  <el-container>
    <el-header style="height: 7.5vh;padding: 0;line-height: 10px">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="background-color: #a3d7e2">
        <el-submenu index="1" >
          <template slot="title">{{ active }}</template>
          <el-menu-item index="1" @click="go2index()"><i class="iconfont icon-shouye"/>&nbsp;首页</el-menu-item>
          <el-menu-item index="2" @click="go2showFloorInfo()"><i class="iconfont icon-yuyue"/>&nbsp;预约座位</el-menu-item>
          <el-menu-item index="3"><i class="iconfont icon-houtaiguanli-xitongguanliyuan"/>&nbsp;管理员登录</el-menu-item>
        </el-submenu>
        <el-dropdown v-if="$store.state.signInStatus===1" @command="handleCommand" style="margin: 1.2vh;padding: 0;float: right;">
          <el-row >
            <h1 style="margin: 0;padding: 0">
              <el-avatar v-if="$store.state.readerInfo&&this.$store.state.readerInfo.readerId" class="md_headpic" :size="40" :src="avatarUrl" />
              {{'  '+this.$store.state.readerInfo.name}}
            </h1>
          </el-row>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="readerInfo"><i class="iconfont icon-essential-information"/>个人信息</el-dropdown-item>
            <el-dropdown-item command="signOut"><i class="iconfont icon-tuichudenglu1"/> 退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-row v-else style="margin-top: 10px;padding: 0;float: right; margin-right: 10px">
          <el-button size="medium" type="primary" round @click="signUp()">注 册</el-button>
          <el-button size="medium" type="primary" round @click="signIn()">登 录</el-button>
        </el-row>
      </el-menu>
    </el-header>
      <el-main style="height: 85vh;margin: 0;padding: 0;text-align: center">
        <div v-if="$store.state.readerInfo.reserveStatus===0" style="margin: 5px;padding: 0;text-align: center;height: 5vh">
          <!--TODO-->
          <!-- 签到功能测试-->
          <!--未签到-->
          <div v-if="$store.state.readerInfo.signInStatus===1" style="margin: 0;padding: 0">
            <el-tag type="success" style="">您已预约{{$store.state.readerInfo.seatId}}座位</el-tag>
            <el-button size="small" @click="cancelReserve()" >取消预约</el-button>
            <el-button size="small"  @click="reserveSignIn()">
              签 到
            </el-button>
          </div>
          <div v-else style="margin: 0;padding: 0">
            <!--已签到-->
            <el-tag type="success" style="">您已签到{{$store.state.readerInfo.seatId}}座位</el-tag>
            <el-button size="small" @click="reserveSignOut()">
              签 退
            </el-button>
          </div>
        </div>
      <router-view v-loading="loading" style="text-align: center"/>
    </el-main>
    <el-footer style=" height: 7.5vh">
      <el-row>
        <a style="color:#666;" target="_blank" rel="noopener" href="http://beian.miit.gov.cn/">蒙ICP备20002846号</a>&nbsp;
        <a style="color:#666;" href="https://temuulen.cn">Copyright ©小小志</a>
      </el-row>
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
      loading: false,
      msg: '',
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
    reserveSignIn(){
      this.$axios({
        url: 'api/reserveSign',
        params: {
          readerId: this.readerInfo.readerId,
          seatId: this.$store.state.readerInfo.seatId,
          status: 1
        }
      }).then((response=>{
        if (response.data==='success'){
          alert("签到成功！")
          this.$store.commit('reserveSignIn')
        }
      })).catch((error=>{
        alert(error)
      }))
    },
    reserveSignOut(){
      this.$axios({
        url: 'api/reserveSign',
        params: {
          readerId: this.$store.state.readerInfo.readerId,
          seatId: this.$store.state.readerInfo.seatId,
          status: 0
        }
      }).then((response=>{
        if (response.data==='success'){
          alert('签退成功！')
          this.$store.commit('reserveSignOut')
        }
        else alert(response.data)
      }))
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
          sessionStorage.setItem("readerInfo",JSON.stringify(this.readerInfo))
        }
      })).catch((error => {
        this.loading = false;
      }))
    },
    handleCommand(command) {
      if (command==='readerInfo'){
        this.$router.push('readerInfo')
      }
      if (command==='signOut'){
        this.$store.commit('signOut')
      }
    }
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
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.el-header, .el-footer {
  background-color: #a3d7e2;
  color: #333;
  text-align: center;
  line-height: 60px;
  width: 100vw;
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
  background-image: url("/static/img/bg_flavor.jpg");
  background-repeat: repeat;
  background-size: 600px;
  background-position: center;
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
