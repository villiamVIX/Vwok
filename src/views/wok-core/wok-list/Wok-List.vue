<template>
	<CardVIX class="box-card">
		<WokListBoxs></WokListBoxs>
		<div style="width: 55rem; padding: 15px;">
			<WokItemCreate></WokItemCreate>
			<WokItemDetail></WokItemDetail>
		</div>
	</CardVIX>
</template>

<script>
	import WokListBoxs from './childCpn/Wok-List-Boxs'
	import WokListExport from './childCpn/Wok-List-Export'
	import WokListText from './childCpn/Wok-List-Text'
	import WokItemDetail from '../wok-item/childCpn/Wok-Item-Detail'
	import WokItemCreate from '../wok-item/childCpn/Wok-Item-Create'
	import CardVIX from 'common/Components/CardVIX/CardVIX.vue'
	export default {
		components: {
			WokItemCreate,
			WokListExport,
			WokListText,
			WokItemDetail,
			WokListBoxs,
			CardVIX
		},
	}
</script>


<style scoped="scoped">
	#Wok-List {}
	.box-card {
		display:-webkit-flex;
		display: flex;		
		flex-direction: row;
		
	}


</style>
