<template>
  <fieldset>
    <legend >个人信息</legend>
    <!-- 姓名 -->
    <el-form>
      <el-form-item prop="pass">
        <el-input style="margin:5px auto;" placeholder="学号" v-model="readerId" required></el-input>
      </el-form-item>
      <el-input style="margin:5px auto;" placeholder="密码" type="password" v-model="password" required></el-input>
      <el-button style="max-width: 500px; margin:5px auto;" @click="signIn()">登      录</el-button>
    </el-form>
  </fieldset>
</template>

<script>
export default {
  name: "signIn.vue",
  data(){
    return {
      readerId: '',
      password: '',
    }
  },
  methods: {
    signIn(){
      if (this.readerId===null) alert("请输入用户名")
      if(this.password===null) alert("请输入密码")
      this.$axios({
        url: 'api/Sign',
        method: 'get',
        params: {
          readerId: this.readerId,
          password: this.password,
          status: 1
        }
      }).then((response=>{
        if (response.data==null){
          alert("密码错误")
        }else {
          this.$store.commit('signIn',response.data)
          this.$router.go(-1)
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


