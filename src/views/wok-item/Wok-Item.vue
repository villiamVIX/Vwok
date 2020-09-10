<template>
	<div id="Wok-Item">
		<el-card class="box-card">
			<WokItemInfo></WokItemInfo>
		</el-card>
		<el-card class="box-card" shadow="hover">
			<div slot="header" class="clearfix">
				<span>任务信息</span>
				<WokItemDetail></WokItemDetail>
				<test :target='per' :actual="per_actual"  @scale='set_Scale' @scale_actual='set_Scale_Actual'></test>
				<h1>{{per}}</h1>
				<h1>{{per_actual}}</h1>
				
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
				per: 55,
				per_actual:44
			}
		},
		components: {
			WokItemInfo,
			WokItemDetail,
			test
		},
		methods:{
			set_Scale(val){
				this.per = val 
				// console.log(this.per)
			},
			set_Scale_Actual(val){
				
				this.per_actual = val 
			}
		}
	}
</script>

<style>
</style>
