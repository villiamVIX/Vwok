<template>
	<div>

		<el-table :data="tableData" stripe style="width: 100%">
			<el-table-column prop="is_today" label="今日WOK？" width="100">
			</el-table-column>
			<el-table-column prop="wok_name" label="WOK" width="180">
			</el-table-column>
			<el-table-column prop="start_time" sortable label="开始" width="180">
			</el-table-column>
			<el-table-column prop="estimate_time" sortable label="预计完成" width="180">
			</el-table-column>
			<el-table-column prop="total_progress" sortable label="进度">
				<el-progress :percentage="50"></el-progress>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button type="text" size="small">动工</el-button>
				</template>
			</el-table-column>
		</el-table>
		<span class="demonstration"></span>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2"
		 :page-sizes="[3, 40, 80, 100]" layout="sizes, prev, pager, next" :total="1000">
		</el-pagination>
	</div>
</template>

<script>
	import {
		get_My_VWOK
	} from 'network/Net_VWOK.js'
	export default {
		created() {
			this.init_data()
		},
		data() {
			return {
				currentPage: 1,
				currentPage1: 5,
				currentPage2: 5,
				currentPage3: 5,
				currentPage4: 4,
				tableData: [],
				page_info: {
					uid:'56e122a0-f901-11ea-850d-538177ec27f6',
					currentPage:1,
					limit: 4
				}
			}
		},
		methods: {
			
			handleSizeChange(val) {
				this.page_info.limit=val
				
				get_My_VWOK(this.page_info).then((res) => {
					this.sync_Table_Data(res)
				});
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			init_data() {
				
				get_My_VWOK(this.page_info).then((res) => {
					this.sync_Table_Data(res)
				});
			},
			sync_Table_Data(res){
				this.tableData = res.result.data
			},

		}

	}
</script>

<style>
</style>
