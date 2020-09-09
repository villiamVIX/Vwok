<template>
	<div id="Wok-Item">
		<el-card class="box-card">
			<WokItemInfo></WokItemInfo>
		</el-card>
		<el-card class="box-card" shadow="hover">
			<div slot="header" class="clearfix">
				<span>任务信息</span>
				<WokItemDetail></WokItemDetail>
				<test :min=0 :max=100 v-model="per"></test>
			</div>
		</el-card>
	</div>
</template>

<script>
	import WokItemInfo from './childCpn/Wok-Item-Info'
	import WokItemDetail from './childCpn/Wok-Item-Detail'
	import test from './childCpn/test'
	export default {
		data() {
			return {
				per: 55
			}
		},
		components: {
			WokItemInfo,
			WokItemDetail,
			test
		}
	}
</script>

<style>
</style>
