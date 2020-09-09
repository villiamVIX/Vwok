<template>
	<div>

		<el-table ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%"
		 border>
			<el-table-column type="index" width="50">
			</el-table-column>
			<el-table-column property="date" label="创建时间" width="120">
			</el-table-column>
			<el-table-column property="name" label="创建人" width="120">
			</el-table-column>
			<el-table-column property="wok_desc" label="WOK描述">
				<template scope="scope">
					<el-input type="textarea" autosize placeholder="请输入内容" v-model="scope.row.wok_desc">
					</el-input>
				</template>
			</el-table-column>
			<el-table-column property="jira" label="JIRA单号">
				<template scope="scope">
					<el-input type="input" autosize placeholder="请输入内容" v-model="scope.row.jira">
					</el-input>
				</template>
			</el-table-column>
			<el-table-column property="estimate" label="预计进度">
			</el-table-column>
			<el-table-column property="actual" label="实际进度">
			</el-table-column>
			<el-table-column property="spend" label="耗时">
			</el-table-column>
			<el-table-column property="remarks" label="备注">
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
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
					{
						date: '2016-05-02',
						name: '王小虎',
						wok_desc: '上线测试端',
						jira: 'CYFCZJ-6666',
						estimate: 100,
						actual: 80,
						spend: 2,
						remarks: "太多做不完了"
					},
					{
						date: '2016-05-02',
						name: '王小虎',
						wok_desc: '上线测试端',
						jira: 'CYFCZJ-6666',
						estimate: 100,
						actual: 80,
						spend: 2,
						remarks: "太多做不完了"
					},
					{
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

		methods: {
			setCurrent(row) {
				this.$refs.singleTable.setCurrentRow(row);
			},
			handleCurrentChange(val) {
				this.currentRow = val;
			}
		}
	}
</script>


<style scoped="scoped">
	 
</style>
