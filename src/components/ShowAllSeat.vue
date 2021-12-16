<template>
  <el-table
    :data="seats"
    height="250"
    border
    style="width: 100%">
    <el-table-column
      prop="seatId"
      label="座位编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="floor"
      label="楼层"
      width="180">
    </el-table-column>
    <el-table-column
      prop="num"
      label="座位号">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="180">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template class="handle" slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "ShowAllSeat",
  data() {
    return {
      seats: []
    }
  },
  methods: {
    /*
      TODO
      scope相当于一行的数据， scope.row相当于当前行的数据对象。
      <slot :row="item" :$index="i"></slot>

      scope.row.seatId==scope.seats[$index].seatId
     */
    handleClick(row){
      alert(row.seatId)
    }
  },
  created: function (){
      this.$axios({
        url: 'api/getAllSeat',
        method: 'get',
      }).then((response=>{
        this.seats=response.data;
      })).catch((error=>{
        alert("error");
      }))
  }
}
</script>

<style scoped>
.handle{
  text-align: center;
}
</style>
