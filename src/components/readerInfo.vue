<template>
  <fieldset>
    <legend >个人信息</legend>
    <el-form label-width="80px">
      <el-form-item label="学号" >
      <el-input v-model="readerInfo.readerId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="readerInfo.name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="readerInfo.email" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item v-if="readerInfo.reserveStatus==='0'" label="预约座位">
        <el-input v-model="readerInfo.seatId"></el-input>
      </el-form-item>
    </el-form>
  </fieldset>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "readerInfo",
    data() {
      return {
      }
    },
  computed: {
    ...mapState(['readerInfo'])
  }
}
</script>

<style scoped>
fieldset {
  /* 表单页面居中，宽度50% ,legend颜色设置，legend圆角*/
  border:2px solid #DCDFE6;  text-align:left; border-radius: 8px;margin: 2vh auto;max-width: 500px;
}
</style>
