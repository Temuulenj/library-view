<template>
  <div>
  <el-row v-loading="loading" style="min-height: 100px">
    <el-col :span="8" v-for="item in seats" :key="item.data" >
      <el-card :body-style="{ padding: '5px',margin: '5px' }" @click.native="clickCard(item.floor)" shadow="hover">
        {{item.floor+1+'楼'}}<br>
        {{'已预约：'+item.reserved}}<br>
        {{'可预约：'+item.canReserve}}
      </el-card>
    </el-col>
  </el-row>
  </div>
</template>
<script>
export default {
  name: "showFloorInfo",
  data() {
    return {
      seats: [],
      loading: 'true',
    }
  },
  methods: {
    clickCard(floor1){
      this.$router.push({
        name: 'showByFloor',
        params: {
          floor: floor1+1
        }
      })
    },
  },
  created: function (){
    this.$axios({
      url: 'api/getSeatInfo',
      method: 'get',
    }).then((response => {
      this.seats=response.data
      this.loading = false;
    })).catch((error => {
      this.loading = false;
      alert("获取信息失败！");
    }))
  }
}
</script>

<style scoped>
.el-card{
  margin: 5px;
}
</style>
