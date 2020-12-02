<template>
	<div id="Wok-Item">
		<el-card class="box-card">
			<WokItemInfo></WokItemInfo>
		</el-card>
		<el-card class="box-card" shadow="hover">
			<div slot="header" class="clearfix">
				<span>任务信息</span>
				<WokItemDetail></WokItemDetail>				
			</div>
		</el-card>
	</div>
</template>

<script>
	import WokItemInfo from './childCpn/Wok-Item-Info'
	import WokItemDetail from './childCpn/Wok-Item-Detail'
	export default {
		data() {
			return {
				per: 55,
				per_actual:44
			}
		},
		components: {
			WokItemInfo,
			WokItemDetail,
		},
		methods:{
		
		}
	}
</script>

<style>
</style>
