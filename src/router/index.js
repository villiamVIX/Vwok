import Vue from "vue";
import Router from "vue-router";

const Login = () => import("views/login/Login.vue");
const Frame = () => import("views/frame/Frame.vue");
const WokList = () => import("views/wok-core/wok-list/Wok-List.vue");
const WokCreate = () => import("views/wok-create/Wok-Create.vue");
const WokMission = () => import("views/wok-mission/Wok-Mission.vue");

Vue.use(Router);
const VueRouterReplace = Router.prototype.replace //抛出App.vue的原地跳转报错
Router.prototype.replace = function replace(to) {
	return VueRouterReplace.call(this, to).catch(err => err)
}

const routes = [{
		name: "index_login",
		path: "",
		redirect: "/login",
	},
	{
		name: "login",
		path: "/login",
		component: Login,
	},
	{   //做自动抓取路由用 必须放第二个
		name: "Frame",
		path: "/frame",
		component: Frame,
		children: [{
				name: "woklist",
				path: "woklist",
				icon: 'el-icon-receiving',
				meta: {
					title: "快速报工",
					needLogin: true, //需要加校检判断的路由
				},
				component: WokList,
			},
			{
				name: "wokcreate",
				path: "wokcreate",
				icon: "el-icon-circle-plus-outline",
				meta: {
					title: "新建任务",
					needLogin: true,
				},
				component: WokCreate,
			},
			{
				name: "wokmission",
				path: "wokmission",
				icon: "el-icon-s-order",
				meta: {
					title: "任务看板",
					needLogin: true,
				},
				component: WokMission,
			},
		],
	},
];

const router = new Router({
	mode: "history",
	// base: process.env.BASE_URL,
	routes,
});

export {
	router,
	routes
}
