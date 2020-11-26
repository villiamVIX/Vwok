<template>
	<div id="WokItemCreate">
		<el-input v-model="form.vwok_item_name" placeholder="输入一个任务,Enter快速创建">
		</el-input>
		<el-button type="primary" @click='create_Item'>创建</el-button>
	</div>
</template>

<script>
	import {
		create_New_Vwok_Item
	} from 'network/Net_Vwok_Item.js'
	import {
		mapGetters
	} from 'vuex'

	export default {
		computed: {
			...mapGetters(["UserInfo"])
		},
		mounted() {
			this.init()
		},
		watch:{
			'$store.state.vwok.current_wok':function(index){
				this.form.vwok_id=index
			}
		},
		data() {
			return {
				form:{
					vwok_item_name: '',
					uid:'',
					vwok_id:'d60a1190-2bd3-11eb-b4d2-a902bbce58cd'
				}
			}
		},
		methods: {
			init(){
				this.form.uid = this.UserInfo.uid
			},
			async create_Item() {
				let {
					res,
					code
				} = await create_New_Vwok_Item(this.form)
			}

		}
	}
</script>


<style scoped="scoped">
	#WokItemCreate {
		display: flex;
	}
</style>
