<template>
	<el-dialog title="计划导出" :visible.sync="dialogVisible">
		<el-card>
			<el-input type="textarea" autosize placeholder="请输入内容" v-model="estimate">
			</el-input>
			<el-button type="primary">COPY当日计划</el-button>
		</el-card>
		<el-card>
			<el-input type="textarea" autosize placeholder="请输入内容" v-model="actual">
			</el-input>
			<el-button type="success">COPY完成情况</el-button>
		</el-card>
	</el-dialog>
</template>

<script>
	export default {
		props: ['dialogVisible'],
		data() {
			return {
				estimate: 'vvv',
				actual:''
			}
		},
	}
</script>

<style scoped>
	el-card{
		
	}
</style>
