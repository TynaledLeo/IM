import Vue from 'vue'
import axios from 'axios'
import Element from 'element-ui'
import App from './App'
import router from './router'
import store from './store'
import qs from 'qs';
Vue.prototype.$axios = axios
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Element)
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

axios.interceptors.request.use((config) => {
  if(config.method === 'post') {
      config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});