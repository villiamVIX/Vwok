<template>
	<div id="Wok-List">
		<el-card class="box-card">
			<WokListExport></WokListExport>
			<WokListTable></WokListTable>
		</el-card>
		<el-card class="box-card">
			<WokListText></WokListText>
		</el-card>
	</div>


</template>



<script>
	import WokListTable from './childCpn/Wok-List-Table'
	import WokListExport from './childCpn/Wok-List-Export'
	import WokListText from './childCpn/Wok-List-Text'
	export default {
		components: {
			WokListTable,
			WokListExport,
			WokListText
		},
		methods: {

		},

	}
</script>


<style scoped="scoped">

</style>
