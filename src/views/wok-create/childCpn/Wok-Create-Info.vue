<template>
	<div id="Wok-Item-Info">
		<el-form ref="form" :model="form" label-width="180px" label-position="left">
			<el-form-item label="任务名称">
				<el-input v-model="form.wok_name"></el-input>
			</el-form-item>
			<el-form-item label="活动时间">
				<el-col :span="11">
					<el-date-picker type="date" placeholder="选择开始时间" v-model="form.start_time" style="width: 100%;"></el-date-picker>
				</el-col>
				<el-col class="line" :span="2">-</el-col>
				<el-col :span="11">
					<el-date-picker type="date" placeholder="选择结束时间" v-model="form.estimate_time" style="width: 100%;"></el-date-picker>
				</el-col>
			</el-form-item>
			<el-form-item label="执行任务人员">
				<el-checkbox-group v-model="form.teammate">
					<el-checkbox label="AAA" name="type"></el-checkbox>
					<el-checkbox label="BBB" name="type"></el-checkbox>
					<el-checkbox label="CCC" name="type"></el-checkbox>
					<el-checkbox label="张威" name="type"></el-checkbox>
					<el-checkbox v-for='i in 8' :key="i" label="尤雨溪" name="type"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">新增任务</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {
		create_New_WOK
	} from 'network/Net_VWOK.js'
	export default {
		data() {
			return {
				form: {
					wok_name: '',
					start_time: '',
					estimate_time: '',
					teammate: [],
					creater_name: '张威'
				}
			}
		},
		methods: {
			onSubmit() {
				console.log(this.form);
				let data = this.form
			 create_New_WOK(data)
				let submit_Create_Date = async (data) => {
					await create_New_WOK(data)
				}
				submit_Create_Date()
			}
		}
	}
</script>

<style>
	#Wok-Item-Info {
		display: flex;
	}

	.right_bar {
		flex: 1;
	}
</style>
