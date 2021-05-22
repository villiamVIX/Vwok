<template>
	<el-dialog title="收货地址" :visible.sync="dialogVisible">
		<div id="Wok-Item-Create">
			<el-form ref="form" :model="form" :rules="rules" label-width="180px" label-position="left">
				<el-form-item label="任务名称" prop="vwok_name"><el-input v-model="form.vwok_name"></el-input></el-form-item>
				<el-form-item label="执行任务人员" prop="teammate">
					<el-checkbox-group v-model="checked_Teammate" @change="handleCheckedChange">
						<el-checkbox v-for="item in form.teammate" :label="item" :key="item.uid">{{ item.username }}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item><el-button type="primary" @click="check_Rule('form')">新增任务</el-button></el-form-item>
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
			console.log(val)
			this.dialogVisible = this.isShow_Create;
		},
		
	},
	data() {
		return {
			dialogVisible:false,
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
	mounted() {
		this.init_Data();
	},
	methods: {
		async init_Data() {
			let res = await get_Teammmate();
			// 初始化队友
			this.form.teammate = res.result;
			// 设置当天
			this.form.start_time = new Date();
			// 默认选中本人
			// this.checked_Teammate.push(this.UserInfo)
		},
		async check_Rule(formName) {
			// 校验数据
			console.log(this.checked_Teammate);
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
			console.log(data);
			let { msg, code } = await create_New_VWOK(data);
			console.log(msg, code);
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
