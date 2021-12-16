<template>
  <el-container>
    <el-header>
      Welcome to Library System
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
    <Footer/>
  </el-container>
</template>

<script>
import Footer from "./components/Footer";
export default {
  name: 'App',
  components: {Footer}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
el-main{
  text-align: center;
}
Footer{
  text-align: center;
}
</style>
