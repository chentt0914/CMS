import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/base.css"
import '@/assets/css/normalize.css'

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';


//引入echarts
import * as echarts from 'echarts'//在import的后面，echarts的前面加一个 * as
import china from "./assets/china.json"
console.log(china);
echarts.registerMap('china', china)
//vue全局注入echarts
Vue.prototype.$echarts = echarts;



Vue.config.productionTip = false;
Vue.use(ViewUI)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");


