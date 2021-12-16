import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import App from './App.vue';
import 'element-ui/lib/theme-chalk/display.css';
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});