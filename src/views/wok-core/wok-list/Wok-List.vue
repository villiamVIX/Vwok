<template>
	<CardVIX class="box-card">
		<WokListBoxs></WokListBoxs>
		<div class="WokItems">
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
			height: 90vh;
	}
	.WokItems{
		max-width: 80vw;
		
		padding-left: 0.9375rem;
	}


</style>
