<template>
	<el-dialog title="计划导出" width='95%' :visible.sync="dialogVisible" :destroy-on-close='true' :before-close="modal_Close">

		<el-row :gutter="5">
			<el-col :span="12">
				<el-card shadow="always">
					<el-input type="textarea" autosize placeholder="请输入内容" v-model="estimate_Text">
					</el-input>
					<el-button type="primary" @click='copy_Estimate'>COPY当日计划</el-button>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card shadow="hover">
					<el-input type="textarea" autosize placeholder="请输入内容" v-model="actual_Text">
					</el-input>
					<el-button type="success" @click='copy_Actual'>COPY完成情况</el-button>
				</el-card>
			</el-col>
		</el-row>
	</el-dialog>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				dialogVisible: false,
				estimate_Text: '',
				actual_Text: '',
				today: '',
				export_Data: ''
			}
		},
		computed: {
			...mapGetters([
				'uid',
			]),
			...mapGetters('vwok_item', [
				'isShow_Export',
				'export_Text'
			]),
		},
		watch: {
			isShow_Export() {
				this.dialogVisible = this.isShow_Export
			},
			export_Text() {
				console.log(this.export_Text)
				let {
					today,
					wokList
				} = this.export_Text
				this.export_Data = wokList
				this.today = today
				this.format_Export_Text()
			}
		},
		methods: {
			copy_Actual() {
				this.copy_Mod(this.actual_Text)
			},
			copy_Estimate() {
				this.copy_Mod(this.estimate_Text)
			},
			copy_Mod(copy_text){
				var input = document.createElement("textarea"); // 直接构建textarea(textarea可换行)
				input.value = copy_text; // 设置内容 需要复制的内容
				document.body.appendChild(input); // 添加临时实例
				input.select(); // 选择实例内容
				document.execCommand("Copy"); // 执行复制
				document.body.removeChild(input); // 删除临时实例
				this.notify()
			},
			notify() {
				this.$notify({
				          title: '计划导出',
				          message: '复制成功',
				          type: 'success'
				        });
			},
			modal_Close() {
				this.$store.dispatch('vwok_item/Visible_Export', false)
			},
			format_Export_Text() {
				let text = this.export_Data
				let {
					today
				} = this
				let Text_Concat_Estimate = '',
					Text_Concat_Actual = '',
					title_Estimate = `${today}工作计划：\n`,
					title_Actual = `${today}工作计划完成情况：\n`

				for (let i = 0, j = text.length; i < j; i++) {
					let {
						vwok_item_name,
						scroll_estimate,
						scroll_actual,
						remark,
						jira
					} = text[i]
					if (remark) remark = `(${remark})` // 若有备注 就给括号
					if (jira) jira = `[${jira}]`
					Text_Concat_Estimate +=
						`${i+1}.${text[i].vw_works.vwok_name}:${vwok_item_name}，预计进度：${scroll_estimate}%。${remark || ''} ${jira || ''}\n`
					Text_Concat_Actual +=
						`${i+1}.${text[i].vw_works.vwok_name}:${vwok_item_name}，预计进度：${scroll_estimate}%，实际进度：${scroll_actual}%。${remark || ''} ${jira || ''}\n`
				}
				this.estimate_Text = title_Estimate + Text_Concat_Estimate
				this.actual_Text = title_Actual + Text_Concat_Actual
			},

		},
	}
</script>

<style scoped>
	.el-card {
		display: flex;
		flex-direction: column;
	}
</style>
