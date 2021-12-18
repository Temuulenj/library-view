<template>
  <div>
    <el-row style="margin-top: 5px">
      <!--{{this.session.sessionId}}-->
        <el-radio-group v-model="selection"  >
          <el-radio-button label="可预约" @click.native="select(1)"></el-radio-button>
          <!--todo-->
          <el-radio-button label="不可预约" @click.native="select(0)"></el-radio-button>
          <el-radio-button label="全部" @click.native="select(3)"></el-radio-button>
          </el-radio-group>
    </el-row>
    <el-row v-loading="loading" style="min-height: 100px">
      <el-col :span="8" v-for="item in seats" :key="item.data" >
        <el-card :body-style="{ padding: '5px',margin: '5px' }" shadow="hover" @click.native="reserve(item.seatId)">
          {{'座位号:'+item.num}}<br>
          {{'状态：'+ ((item.status==1)?'可预约':'不可预约')}}
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ShowByFloor",
  data() {
    return {
      seats: [],
      loading: 'true',
      floor: this.$route.params.floor,
      selection: '可预约',//可预约/不可预约
      num: this.$route.params.floor,
      input: this.$route.params.floor,
    }
  },
  methods: {
    select(item){
      this.loading=true
      this.$axios({
        url: 'api/getByFloor?floor='+this.floor+"&status="+item,
        method: 'get',
      }).then((response => {
        this.seats=response.data
        this.loading=false
      })).catch((error => {
        alert("获取信息失败！");
      }))
    },
    reserve(seatId){
      this.$axios({
        url: 'api/reserve',
        method: 'post',
        params: {
          seatId: this.seatId,
          //readerId: this.session.
        }
      }).then((response => {
        this.seats=response.data
        this.loading = false;
      })).catch((error => {
        this.loading = false;
        alert(JSON.parse(sessionStorage.getItem("sessionID")))
      }))
    }
  },
  created: function (){
    this.$axios({
      url: 'api/getByFloor?floor='+this.floor+'&status=3',
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
.handle{
  text-align: center;
}
</style>
