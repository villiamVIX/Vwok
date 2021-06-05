<template>
	<el-dialog title="创建工项" :visible.sync="dialogVisible" :before-close="handleClose">
		<div id="Wok-Item-Create">
			<el-form ref="form" :model="form" :rules="rules" label-width="180px" label-position="left">
				<el-form-item label="任务名称" prop="vwok_name"><el-input v-model="form.vwok_name"></el-input></el-form-item>
				<el-form-item label="执行任务人员" prop="teammate">
					<el-checkbox-group v-model="checked_Teammate" @change="handleCheckedChange">
						<el-checkbox v-for="item in form.teammate" :label="item" :key="item.uid">{{ item.username }}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item><el-button type="primary" @click="check_Rule_n_Submit('form')">新增任务</el-button></el-form-item>
			</el-form>
		</div>
	</el-dialog>
</template>

<script>
import { create_New_VWOK, get_Teammmate } from 'network/Net_Vwok';
import { mapGetters } from 'vuex';
// 2021-05-21
export default {
	computed: {
		...mapGetters(['UserInfo']),
		...mapGetters('vwok_item', ['isShow_Create'])
	},
	watch: {
		isShow_Create(val) {
			this.dialogVisible = this.isShow_Create;
		}
	},
	data() {
		return {
			dialogVisible: false,
			form: {
				vwok_name: '',
				start_time: '',
				estimate_time: '',
				teammate: [],
				creater_name: '',
				uid: ''
			},
			checked_Teammate: [],
			rules: {
				vwok_name: [
					{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}
				],
				start_time: [
					{
						type: 'date',
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}
				],
				estimate_time: [
					{
						type: 'date',
						required: true,
						message: '请选择时间',
						trigger: 'change'
					}
				],
				teammate: [{ type: 'array', required: true, message: '至少一个队友', trigger: 'change' }]
			}
		};
	},
	created() {
		this.init_Data();
	},
	methods: {
		handleClose() {
			this.$store.dispatch('vwok_item/Visible_Create', false);
		},
		async init_Data() {
			let res = (await get_Teammmate()).result;
			// 初始化队友
			this.form.teammate = res;
			// console.log( res)
			// 默认选中本人
			const { uid } = this.UserInfo;
			for (let i = 0, j = res.length; i < j; i++) {
				if (res[i].uid == uid) {
					this.checked_Teammate.push(res[i]);
				}
			}
			// 设置当天
			this.form.start_time = new Date();
		},
		async check_Rule_n_Submit(formName) {
			// 校验数据
			// console.log(this.checked_Teammate);
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.submit_Data();
				} else {
					return false;
				}
			});
		},
		async submit_Data() {
			const data = JSON.parse(JSON.stringify(this.form));
			const { uid, username } = this.UserInfo;
			data.creater_name = username;
			data.uid = uid;
			data.teammate = this.checked_Teammate.map(item => {
				// 剔除name保留ID
				return item.uid;
			});
			
			let { msg, code } = await create_New_VWOK(data);
			if (code == 200) {
				this.$message({
					message: '创建成功',
					type: 'success'
				});
				this.handleClose()
				this.$store.dispatch('vwok/Req_Reload', true); //更新更新后的数据
				
			} else {
				this.$message.error('创建失败，请重试');
			}
		},
		handleCheckedChange(val) {
			console.log(this.checked_Teammate);
		}
	}
};
</script>

<style>
#Wok-Item-Create {
	display: flex;
}

.right_bar {
	flex: 1;
}
</style>
