<template>
	<CardVIX class="box-card-Wok-List">
		<WokListBoxs></WokListBoxs>
		<div class="WokItems">
			<WokItemCreate></WokItemCreate>
			<WokItemDetail class='WokItemDetail' @dialogVisible='dialogVisible =true'></WokItemDetail>
			<WokListExport :dialogVisible='dialogVisible'></WokListExport>
		</div>
	</CardVIX>
</template>

<script>
	import WokListBoxs from './childCpn/Wok-List-Boxs'
	import WokListExport from './childCpn/Wok-List-Export'
	import WokListText from './childCpn/Wok-List-Text'
	import WokItemDetail from './childCpn/Wok-Item-Detail'
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
		data() {
			return {
				dialogVisible: false
			}
		},
		methods:{
			// dialogVisible(){
			// 	this.dialogVisible=true
			// }
		}
	}
</script>


<style scoped="scoped">
	.box-card-Wok-List {
		display: -webkit-flex;
		display: flex;
		flex-direction: row;
		height: 84.3vh;

	}

	.WokItems {
		width: 100%;
		padding-left: 0.9375rem;
	}
</style>
