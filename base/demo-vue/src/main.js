import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import {
  message
} from 'ant-design-vue';

Vue.use(Antd);
Vue.config.productionTip = false

Vue.prototype.$message = message;
Vue.prototype.$http = axios;
new Vue({
  render: h => h(App),
}).$mount('#app')