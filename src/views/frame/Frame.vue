<template>
	<el-container>
		<div class="drawer-bg" @click="$store.dispatch('app/closeSideBar')" />
		<el-header style="padding: 0;height: 2.3rem;"><TopBar></TopBar></el-header>
		<el-container>
				<SideBar  class='side' v-if="sidebar"></SideBar>
		
			<transition name="fade-transform" mode="in-out">
				<el-main :xs="4" :sm="6" :md="8" :lg="9"><router-view></router-view></el-main>
			</transition>
		</el-container>
	</el-container>
</template>

<script>
import SideBar from './childCpn/SideBar';
import TopBar from './childCpn/TopBar';
import { mapGetters } from 'vuex';

export default {
	components: {
		SideBar,
		TopBar
	},
	computed: {
		...mapGetters(['sidebar'])
	}
};
</script>

<style scoped="scoped">
	.side{
		animation: fade-in; /*动画名称*/
		animation-duration: 0.2s; /*动画持续时间*/
		-webkit-animation: fade-in 0.3s; /*针对webkit内核*/
	}
	
	
</style>
