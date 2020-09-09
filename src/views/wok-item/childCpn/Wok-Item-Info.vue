<template>
	<div id="Wok-Item-Info">
		<el-form ref="form"
		 :model="form" label-width="180px" label-position="left">
			<el-form-item label="任务名称">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="活动时间">
				<el-col :span="11">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
				</el-col>
				<el-col class="line" :span="2">-</el-col>
				<el-col :span="11">
					<el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
				</el-col>
			</el-form-item>
			<el-form-item label="执行任务人员">
				<el-checkbox-group v-model="form.type">
					<el-checkbox label="AAA" name="type"></el-checkbox>
					<el-checkbox label="BBB" name="type"></el-checkbox>
					<el-checkbox label="CCC" name="type"></el-checkbox>
					<el-checkbox label="张威" name="type"></el-checkbox>
					<el-checkbox v-for='i in 8' label="尤雨溪" name="type"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">保存任务</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					date1: '',
					date2: '',
					type: []
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			}
		}
	}
</script>

<style>
	#Wok-Item-Info{
		display: flex;
	}
	.right_bar{
		flex: 1;
	}
</style>
