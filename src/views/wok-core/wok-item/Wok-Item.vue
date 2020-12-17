<template>
	<div id="Wok-Item">
		<el-card class="box-card">
			<WokItemInfo></WokItemInfo>
		</el-card>
		<el-card class="box-card" shadow="hover">
			<div slot="header" class="clearfix">
				<span>任务信息</span>
			</div>
		</el-card>
	</div>
</template>

<script>
	import WokItemInfo from './childCpn/Wok-Item-Info'
	export default {
		data() {
			return {
				per: 55,
				per_actual:44
			}
		},
		components: {
			WokItemInfo,
			
		},
		methods:{
		
		}
	}
</script>

<style>
</style>
