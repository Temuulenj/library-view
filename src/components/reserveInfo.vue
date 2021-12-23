<template>
  <fieldset>
    <el-time-select
      placeholder="起始时间"
      v-model="startTime"
      :picker-options="{
        start: '08:30',
        step: '00:15',
        end: '21:00',
        minTime: new Date().getHours()+':'+new Date().getMinutes()
      }"
    style="width: 90%">
    </el-time-select>
    <el-time-select
      placeholder="结束时间"
      v-model="endTime"
      :picker-options="{
        start: '08:30',
        step: '00:15',
        end: '21:30',
        minTime: startTime===null?'23:59':startTime
      }"
    style="margin: 5px auto; width: 90%">
    </el-time-select>
        <el-input v-model="this.$route.params.seatId" :disabled="true" style="width: 90%"/><br>
      <el-button @click="reserve()" style="margin: 5px auto">预   约</el-button>
  </fieldset>
</template>

<script>
export default {
  name: "reserveInfo",
  data() {
    return {
      startTime: '',
      endTime: '',
    }
  },
  methods: {
    reserve(){
      if(this.$store.state.readerInfo.readerId===''||this.$store.state.readerInfo.readerId==null){
        alert('您还未登录！')
        return;
      }
      this.loading=true
      this.$axios({
        url: 'api/reserve',
        method: 'post',
        params: {
          seatId: this.$route.params.seatId,
          status: '1',
          readerId: this.$store.state.readerInfo.readerId,
          startTime: this.startTime,
          endTime: this.endTime
        }
      }).then((response => {
        if (response.data==='success') {
          this.$store.state.readerInfo.reserveStatus = 0
          this.$store.state.readerInfo.seatId = this.$store.state.reserveSeat
          this.$router.go(-1)
          sessionStorage.setItem("readerInfo", JSON.stringify(this.$store.state.readerInfo))
          this.loading = false;
        }
        else {
          this.loading=false
          alert(response.data)
        }
      })).catch((error => {
        this.loading = false;
      }))
    }
  }
}
</script>

<style scoped>
fieldset {
  /* 表单页面居中，宽度50% ,legend颜色设置，legend圆角*/
  border:2px solid #DCDFE6;  text-align:left; border-radius: 8px;margin: 2vh auto;max-width: 500px;
  background-color: rgba(0,0,0,0.2);
  padding: 5px;
}
</style>
