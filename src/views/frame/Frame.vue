<template>
	<el-container>
		<div class="drawer-bg" @click="$store.dispatch('app/closeSideBar')" />
		<el-header style="height:2.25rem;"><TopBar></TopBar></el-header>
		<el-container>
					<!-- 2021-02-03待设置3档位 -->
			<transition name="fade-transform" mode="out-in"><SideBar></SideBar></transition>
			<transition name="fade-transform" mode="in-out">
				<el-main :xs="4" :sm="6" :md="8" :lg="9">
					<router-view></router-view>
				</el-main>
			</transition>
		</el-container>
	</el-container>
</template>

<script>
import SideBar from './childCpn/SideBar';
import TopBar from './childCpn/TopBar';

export default {
	components: {
		SideBar,
		TopBar
	}
};
</script>

<style scoped="scoped"></style>
