import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.component('chart', ECharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
