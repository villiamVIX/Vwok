<template>
	<el-dialog title="计划导出" :visible.sync="dialogVisible" :destroy-on-close='true' :before-close="modal_Close">
		<el-card>
			<el-input type="textarea" autosize placeholder="请输入内容" v-model="estimate_Text">
			</el-input>
			<el-button type="primary" @click='copy_Estimate'>COPY当日计划</el-button>
		</el-card>
		<el-card>
			<el-input type="textarea" autosize placeholder="请输入内容" v-model="actual_Text">
			</el-input>
			<el-button type="success" @click='copy_Actual'>COPY完成情况</el-button>
		</el-card>
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
				actual_Text: ''
			}
		},
		computed: {
			...mapGetters([
				'uid',
			]),
			...mapGetters('vwok_item', [
				'isShow_Export',
				'export_Estimate_Text',
				'export_Actual_Text'
			]),
		},
		watch: {
			isShow_Export() {
				this.dialogVisible = this.isShow_Export
			},
			export_Estimate_Text() {

				console.log(this.export_Estimate_Text)
				let {today,wokList} = this.export_Estimate_Text
				
				this.format_Export_Text(wokList,today)

			}
		},
		methods: {
			modal_Close() {
				this.$store.dispatch('vwok_item/Visible_Export', false)
			},
			format_Export_Text(text,today) {
				console.log(text,today)
				let len = text.length
				let text_concat = ''
				let title =`${today}工作计划：\n`
				for (let i = 0; i < len; i++) {
					let {
						vwok_item_name,
						scroll_estimate,
						remark
					} = text[i]
					
					text_concat +=
						`${i+1}.${text[i].vw_works.vwok_name}:${vwok_item_name}，预计进度：${scroll_estimate}%。${(remark || '')}\n`
					console.log(this.estimate_Text)
				}
				this.estimate_Text = title+text_concat
			},
			copy_Estimate() {

			}
		},
	}
</script>

<style scoped>
	el-card {}
</style>
