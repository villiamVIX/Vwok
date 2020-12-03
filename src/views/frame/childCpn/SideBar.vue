<template>
	<el-menu 
	 :default-active="this.$route.path" :show-timeout='10' :hide-timeout='10' :collapse-transition='false'
	 router class="sidebar el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="sidebar">
	
		<el-menu-item :index="item.name" v-for='(item,index) in navList' :key='index'>
			<i :class="item.class">
			</i>
			<span slot="title">{{item.navItem}}</span>
		</el-menu-item>
	</el-menu>

</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		computed: {
			...mapGetters(["sidebar"]),
		},
		data() {
			return {
				navList: [{
						name: '/frame/woklist',
						navItem: '快速报工',
						class: 'el-icon-receiving'
					},
					{
						name: '/frame/wokitem',
						navItem: '任务信息',
						class: 'el-icon-s-custom'
					},
					{
						name: '/frame/wokcreate',
						navItem: '新建任务',
						class: 'el-icon-s-custom'
					},
					{
						name: '/frame/wokmission',
						navItem: '任务看板',
						class: 'el-icon-s-custom'
					}
				]
			};
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style scoped>
	.sidebar {
		height: 68vh;
		border-top-right-radius: 35px;
		border-bottom-right-radius: 35px;
		box-shadow: 3px 1px 7px 2px #ebeef5;
		top: 2rem;
		min-width: 3.5rem;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 8rem;
		min-height: 400px;
	}

</style>
