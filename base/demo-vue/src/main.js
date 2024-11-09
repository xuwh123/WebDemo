import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import Router from 'vue-router';
import Antd from 'ant-design-vue';

import Home from './HomePage.vue';
import AboutUs from './AboutUs.vue';

import {
  message
} from 'ant-design-vue';

import 'ant-design-vue/dist/antd.css';

Vue.use(Antd);


Vue.use(Router);


Vue.config.productionTip = false
Vue.prototype.$message = message;
Vue.prototype.$http = axios;

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'AboutUs',
    component: AboutUs
  }
];
const router = new Router({
  mode: 'history', // 使用 HTML5 History 模式
  base: process.env.BASE_URL,
  routes
});


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')