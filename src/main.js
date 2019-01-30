// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import sever from './assets/http/ajax' 
import http from './assets/http/axios' 
import t from './assets/http/token'
import './assets/iconfont/iconfont.css'
import './assets/style/main.css'
Vue.use(ElementUI)
Vue.prototype.token =  new t()
Vue.prototype.ajax = sever
Vue.prototype.axios = new http()
// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
