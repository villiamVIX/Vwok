<template>
	<div id="Wok-List">
		<!-- <el-card class="box-card"> -->
			<WokListBoxs></WokListBoxs>
		<!-- </el-card> -->
		<el-card class="box-card">
			<WokItemCreate></WokItemCreate>
			<WokItemDetail></WokItemDetail>
		</el-card>
		<!-- <el-card class="box-card">
		</el-card> -->
		<!-- 	<WokListExport></WokListExport> -->
	</div>


</template>



<script>
	import WokListBoxs from './childCpn/Wok-List-Boxs'
	import WokListExport from './childCpn/Wok-List-Export'
	import WokListText from './childCpn/Wok-List-Text'
	import WokItemDetail from '../wok-item/childCpn/Wok-Item-Detail'
	import WokItemCreate from '../wok-item/childCpn/Wok-Item-Create'
	export default {
		components: {
			WokItemCreate,
			WokListExport,
			WokListText,
			WokItemDetail,
			WokListBoxs
		},
	}
</script>


<style scoped="scoped">
	#Wok-List {
		display: flex;
		justify-content:baseline;
	}
/* 	.box-card:first{
flex: 1;
	} */
	/* .box-card:last-child{
		flex: 1;
	} */
</style>
