import Vue from 'vue'
import Router from 'vue-router'


// const Login = () => import('views/login/Login.vue')
const Frame = () => import('views/frame/Frame.vue')
const WokList = () => import('views/wok-list/Wok-List.vue')



Vue.use(Router)

const routes = [{
		name: 'frame',
		path: '',
		redirect: '/frame'
	},
	{
		name: 'Frame',
		path: '/frame',
		component: Frame,
		children: [
			{
				name: 'woklist',
				path: 'woklist',
				meta:{title:'快速报工'},
				component: WokList
			},
		]
	},


]

const router = new Router({
	mode: 'history',
	// base: process.env.BASE_URL,
	routes
})

export default router
