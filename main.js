
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 引入myRequest
import myRequest from 'utils/api.js'
Vue.prototype.$myRequest = myRequest
import myUpload from 'utils/upload.js'
Vue.prototype.$myUpload = myUpload

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif