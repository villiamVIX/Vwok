<template>
	<div>
		<el-table ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%"
		 border>
			<el-table-column type="index" width="30">
			</el-table-column>
			<el-table-column property="start_time" label="开始时间" width="100">
			</el-table-column>
			<el-table-column property="vwok_item_name" label="WOK描述" width="250">
				<template slot-scope="scope">
					<el-input type="textarea" autosize placeholder="请输入内容" v-model="scope.row.vwok_item_name">
					</el-input>
				</template>
			</el-table-column>
			<el-table-column property="jira" label="JIRA单号" width="150">
				<template slot-scope="scope">
					<el-input type="input" autosize placeholder="请输入内容" v-model="scope.row.jira">
					</el-input>
				</template>
			</el-table-column>
			<el-table-column property="estimate" label="预计进度" width="250">
				<template slot-scope="scope">
					<SliderVIX :target='scope.row.scroll_estimate' :actual="scope.row.scroll_actual"></SliderVIX>
				</template>
			</el-table-column>

			<!-- 	<el-table-column property="spend" label="耗时"  width="60">
				<template slot-scope="scope">
					<el-input type="input" autosize placeholder="耗时？" v-model="scope.row.spend">
					</el-input>
				</template>
			</el-table-column> -->
			<el-table-column property="remarks" label="备注">
				<template slot-scope="scope">
					<el-input type="input" autosize placeholder="备注..." v-model="scope.row.remark">
					</el-input>
				</template>
			</el-table-column>
		</el-table>
		<el-button type="primary" @click="onChange_Item">保存</el-button>
	</div>
</template>

<script>
	import SliderVIX from 'common/SliderVIX/SliderVIX.vue'
	import {
		mapGetters
	} from 'vuex'
	import {update_Vwok_Item} from 'network/Net_Vwok_Item.js'
	export default {
		data() {
			return {
				tableData: [{
						date: '2016-05-02',
						name: '王小虎',
						wok_desc: '上线测试端',
						jira: 'CYFCZJ-6666',
						estimate: 100,
						actual: 80,
						spend: 2,
						remarks: "太多做不完了"
					},

				],
				currentRow: null,
				textarea: ''
			}
		},
		components: {
			SliderVIX
		},
		computed: {
			...mapGetters(["vwok_items"]),
		},
		watch: {
			'$store.state.vwok.vwok_items': function(items) {
				this.refresh_Items(items)
			},
		},
		methods: {
			async onChange_Item() {
				let {code,msg,result} = await update_Vwok_Item()
			},
			setCurrent(row) {
				this.$refs.singleTable.setCurrentRow(row);
			},
			handleCurrentChange(val) {
				this.currentRow = val;
			},
			refresh_Items(items) {
				this.tableData = items
				console.log(this.tableData)
			}
		}
	}
</script>


<style scoped="scoped">

</style>
