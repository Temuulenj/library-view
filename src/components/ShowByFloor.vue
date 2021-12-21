<template>
  <div>
    <el-row style="margin-top: 5px">
      <!--{{this.session.sessionId}}-->
        <el-radio-group v-model="selection"  >
          <el-radio-button label="可预约" @click.native="select(1)"></el-radio-button>
          <el-radio-button label="不可预约" @click.native="select(0)"></el-radio-button>
          <el-radio-button label="全部" @click.native="select(3)"></el-radio-button>
        </el-radio-group>
    </el-row>
    <el-row v-loading="loading" style="min-height: 100px" >
      <el-col :span="8" v-for="item in seats" :key="item.data" >
        <el-card v-if="item.status==1" :body-style="{ padding: '5px',margin: '5px',color: 'green' }" shadow="hover" @click.native="reserve(item.seatId)">
          {{'座位号:'+item.num}}<br>
          {{((item.status==1)?'可预约':'不可预约')}}
        </el-card>
        <el-card v-else :body-style="{ padding: '5px',margin: '5px',color: 'red' }" shadow="hover" @click.native="reserve(item.seatId)">
          {{'座位号:'+item.num}}<br>
          {{((item.status==1)?'可预约':'不可预约')}}
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
      itm: '1',
    }
  },
  methods: {
    select(item){
      this.itm=item
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
      if(this.$store.state.readerInfo.readerId===''||this.$store.state.readerInfo.readerId==null){
        alert('您还未登录！')
        return;
      }
      this.$store.commit('setReserveSeat',seatId)
      this.$router.push({
        name: 'reserveInfo',
        params: {
          seatId: seatId
        }
      })
    },
  },
  created (){
    this.$axios({
      url: 'api/getByFloor?floor='+this.floor+'&status='+this.itm,
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
