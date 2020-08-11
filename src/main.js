// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins'
import 'echarts-liquidfill'
import App from './App'
import store from './stores/enterprise'

import './style/style.scss'
// 如果需要运行 v1.0.0 版本就注释下面的路由
import router from './routers/enterprise'

/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
