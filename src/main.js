import Vue from 'vue'
import App from './App.vue'
import {
	router
} from 'router'
import store from './store'
import Global_ from './network/Global' //全局变量


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// vxe依赖
import 'xe-utils'
import VXETable from 'vxe-table'

// vxe表格css
import 'vxe-table/lib/style.css'
import 'assets/css/transition.css'

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.use(VXETable)


router.beforeEach(function(to, from, next) { // 登录/权限校验
	// console.log(localStorage)
	if (to.meta.needLogin) {
		//页面是否登录
		if (localStorage.getItem("Token")) {
			next(); //表示已经登录
		} else {
			//next可以传递一个路由对象作为参数 表示需要跳转到的页面
			next({
				name: "login"
			});
		}
	} else {
		//表示不需要登录
		next(); //继续往后走
	}
});



new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
