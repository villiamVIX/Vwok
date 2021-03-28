<template>
	<el-menu 
	:default-active="this.$route.path" 
	:collapse-transition='true'
	router class="sidebar el-menu-vertical-demo" 
	:collapse='true'
	>
		<el-menu-item :index="item.path" v-for="(item, index) in navList" :key="index">
			<i :class="item.icon"></i>
			<span slot="title">{{ item.title }}</span>
		</el-menu-item>
	</el-menu>
</template>

<script>
import { mapGetters } from 'vuex';
import { routes } from 'router/index.js';
export default {
	mounted() {
		this.Catch_Router();
	},
	data() {
		return {
			navList: []
		};
	},
	methods: {
		Catch_Router() { // auto catch router 
			routes[2].children.forEach(item => {
				let { meta, path, icon } = item;
				let { title } = meta;
				path = `/frame/${path}`
				this.navList.push({ path, icon, title });
			});
		}
	},
	computed: {
		...mapGetters(['sidebar'])
	},
};
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
