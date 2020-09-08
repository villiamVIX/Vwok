import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Global_ from './network/Global' //全局变量

//引入字体图标 ICON svg
import 'assets/icon/style.css'
import 'assets/css/transition.css'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
Vue.prototype.GLOBAL = Global_ //挂载到Vue实例上面




new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
