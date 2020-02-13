import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.G={       //常数全局变量集合Global
  middleX:600,          //地图原点X坐标（左上角定位）
  middleY:500,          //地图原点Y坐标（左上角定位）
  hexagonside:100,      //六边形边长
  hexagonhigh:172,
  roadside:18,          //路的宽度（两个六边形的间隔）
  homeside:40,
  nodelist:new Array()
}
new Vue({
  render: h => h(App),
}).$mount('#app')
