<template>
	<div id="WokItemTop">
		<el-input v-model="form.vwok_item_name" :disabled="isEdit" placeholder="输入一个任务,Enter快速创建"></el-input>
		<el-button type="primary" :disabled="isEdit" @click="create_Item">创建</el-button>
		<el-button type="success" @click="visible_Item">导出</el-button>
		<el-button type="danger" 
		@click='visible_delConfirm'
		>删除选中</el-button>
	</div>
</template>

<script>
import { create_New_Vwok_Item ,get_Today_Vwok} from 'network/Net_Vwok_Item.js';
import { mapGetters } from 'vuex';


export default {
	computed: {
		...mapGetters(['UserInfo']),
		...mapGetters('vwok', ['current_wok_id'])
	},
	mounted() {
		this.init();
	},
	watch: {
		'$store.state.vwok.current_wok_id': function(index) {
			this.form.vwok_id = index;
			index == 'today_Vwok' ? (this.isEdit = true) : (this.isEdit = false);
		}
	},
	data() {
		return {
			form: {
				vwok_item_name: '',
				uid: '',
				vwok_id: ''
			},
			isEdit: false
		};
	},
	methods: {
		init() {
			this.form.uid = this.UserInfo.uid;
		},
		async create_Item() {
			if (this.isEdit) {
				return false;
			}

			let { code, result } = await create_New_Vwok_Item(this.form);
			
			if (code == 200) {
				this.$message({
					message: '创建成功',
					type: 'success'
				});
				this.$store.dispatch('vwok/Rewrite_Items', result);
			} else {
				this.$message.error('创建失败，请重试');
			}
		},
		async visible_Item() {
			this.$store.dispatch('vwok_item/Visible_Export', true);
		},
		visible_delConfirm() {
			this.$store.dispatch('vwok_item/Visible_Delete_Confirm', true);
		},
	}
};
</script>

<style scoped="scoped">
#WokItemTop {
	display: flex;
	justify-content: space-between;
	width: 99.5%;
}
</style>
