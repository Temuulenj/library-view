<template>
  <div>
    <h1 v-loading="false">{{this.floor+'楼'}}</h1>
    <div style="margin-top: 20px">
      <el-radio-group v-model="selection" size="small" >
        <el-radio-button label="可预约" @click.native="select(1)"></el-radio-button>
        <!--todo-->
        <el-radio-button label="不可预约" @click.native="select(0)"></el-radio-button>
        <el-radio-button label="全部" @click.native="select(3)"></el-radio-button>
      </el-radio-group>
    </div>
    <el-row style="text-align: center" v-loading="loading">
      <el-col :span="8" v-for="item in seats" :key="item">
        <el-card :body-style="{ padding: '10px',margin: '0px'}" shadow="hover">
          {{'座位号：'+item.num}}<br>
          {{'状态：'}}{{item.status===1?'可预约':'不可预约'}}
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "sbf.vue",
  data() {
    return {
      seats: [],
      loading: 'true',
      floor: this.$route.params.floor,
      selection: '全部'
    }
  },
  methods: {
    select(item){
      this.$axios({
        url: 'api/getByFloor?floor='+this.floor+"&status="+item,
        method: 'get',
      }).then((response => {
        this.seats=response.data.seats
        this.loading = false;
        console.log(this.seats)
      })).catch((error => {
        this.loading = false;
        alert("获取信息失败！");
      }))
    }
  },
  created: function (){
    this.$axios({
      url: 'api/getByFloor?floor='+this.floor+'&status=3',
      method: 'get',
    }).then((response => {
      alert(this.seats)
      this.loading = false;
    })).catch((error => {
      this.loading = false;
      alert("获取信息失败！");
    }))
  }
}
</script>

<style scoped>
.handle{
  text-align: center;
}
</style>
