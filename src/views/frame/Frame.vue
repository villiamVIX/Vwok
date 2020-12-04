<template>
	<el-container>
		<div class="drawer-bg" @click="$store.dispatch('app/closeSideBar')" />
		<el-header style="height:2.25rem;">
			<TopBar></TopBar>
		</el-header>
		<el-container>
			<transition name="fade-transform" mode="out-in">
				<SideBar></SideBar>
			</transition>
			<el-main :xs="4" :sm="6" :md="8" :lg="9">
				<!-- out-in 先让老元素滚出去 -->
				<transition name="fade-transform" mode="out-in">
					<router-view></router-view>
				</transition>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import SideBar from './childCpn/SideBar'
	import TopBar from './childCpn/TopBar'

	export default {
		components: {
			SideBar,
			TopBar
		}
	}
</script>

<style scoped="scoped">
</style>
