<template>
  <div class="main">
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :timestamp="activity.timestamp">
        {{activity.content}}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
export default {
  name: "Index",
  data() {
    return {
      src: '/static/img/img1.jpg',
      activities: [
        {
          content: '优化样式、添加个人信息页面',
          timestamp: '2021-12-21 16：54',
        },{
        content: '重新设计数据库并调试成功',
        timestamp: '2021-12-21 05：29',
      }, {
        content: '优化前端页面 实现后端注册登录预约取消预约等功能',
        timestamp: '2021-12-19 04：54',
      }, {
        content: '最后一次正确运行',
        timestamp: '2021-12-18 20：41',
      }, {
        content: 'Inital commit 实现了从后端获取Json数据并在表格上显示',
        timestamp: '2021-12-17 03：22'
      }]
    }
  }
}
</script>

<style scoped>
.main{
  border:2px solid #DCDFE6;  text-align:left; border-radius: 8px;margin: 2vh auto;max-width: 500px;background-color: rgba(0,0,0,0.2);
}
.el-timeline-item{
  text-align: left;
}
</style>
