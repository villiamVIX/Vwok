import Vue from 'vue'
import Router from 'vue-router'


const Login = () => import('views/login/Login.vue')
const Frame = () => import('views/frame/Frame.vue')
const WokList = () => import('views/wok-list/Wok-List.vue')
const WokItem = () => import('views/wok-item/Wok-Item.vue')
const WokCreate = () => import('views/wok-create/Wok-Create.vue')
const WokMission = () => import('views/wok-mission/Wok-Mission.vue')



Vue.use(Router)

const routes = [{
		name: 'frame',
		path: '',
		redirect: '/frame'
	},
	{
		name: 'login',
		path: '/login',
		component: Login,
	},
	{
		name: 'Frame',
		path: '/frame',
		component: Frame,
		children: [{
				name: 'woklist',
				path: 'woklist',
				meta: {
					title: '快速报工'
				},
				component: WokList
			},
			{
				name: 'wokitem',
				path: 'wokitem',
				meta: {
					title: '任务信息'
				},
				component: WokItem
			},
			{
				name: 'wokcreate',
				path: 'wokcreate',
				meta: {
					title: '新建任务'
				},
				component: WokCreate
			},
			{
				name: 'wokmission',
				path: 'wokmission',
				meta: {
					title: '任务看板'
				},
				component: WokMission
			}	
		]
	},


]

const router = new Router({
	mode: 'history',
	// base: process.env.BASE_URL,
	routes
})

export default router
