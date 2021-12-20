<template>
  <fieldset>
    <legend >个人信息</legend>
    <!-- 姓名 -->
    <el-form style="padding: 10px">
      <el-input  style="margin:5px auto;"  placeholder="学号" v-model="readerInfo.readerId" requied></el-input>
      <el-input  style="margin: 5px auto;" placeholder="用户名" v-model="readerInfo.name" requied></el-input>
      <el-input  style="margin: 5px auto;" placeholder="密码" type="password" v-model="readerInfo.password" requied></el-input>
      <el-input  style="margin: 5px auto;" placeholder="重新输入密码" type="password" v-model="repass" requied></el-input>
      <el-input  style="margin: 5px auto;" placeholder="Email" v-model="readerInfo.email" requied></el-input>
      <el-button style="margin: 5px auto;max-width: 500px" @click="signUp()">注      册</el-button>
    </el-form>
  </fieldset>
</template>

<script>
export default {
  name: "signUp.vue",
  data(){
    return{
      repass: '',
      readerInfo: {
        readerId: '',
        name: '',
        password: '',
        email: '',
        reserveStatus: 1,
        seatId: null
      }
    }
  },
  methods: {
    signUp(){
      if (this.readerInfo.readerId==='') {
        alert('请输入学号')
        return;
      }
      if(this.readerInfo.name==='') {
        alert('请输入姓名')
        return;
      }
      if(this.readerInfo.password==='') {
        alert('请输入密码')
        return;
      }
      return
      if(this.readerInfo.email==='') {
        alert('请输入邮箱')
        return;
      }
      if(this.repass==='') {
        alert('请重新输入密码')
        return;
      }
      if(!this.repass.equal!=this.readerInfo.password) {
        alert('两次密码不相同')
        return;
      }
      this.$axios({
        url: 'api/Sign',
        method: 'get',
        params: {
          reader: this.readerInfo,
          status: 0
        }
      }).then((response=>{
        if (response.data==='success'){
          alert('注册成功！')
          this.$router.push('/')
        }else {
          alert(response.data)
        }
      })).catch((error)=>{
        alert(error)
      })
    }
  }
}
</script>

<style scoped>
fieldset {
  /* 表单页面居中，宽度50% ,legend颜色设置，legend圆角*/
  border:2px solid #DCDFE6;  text-align:left; border-radius: 8px;margin: 2vh auto;max-width: 500px;
}
</style>
