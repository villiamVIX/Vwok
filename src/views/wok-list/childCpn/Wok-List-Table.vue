<template>
	<div>

		<el-table :data="tableData" stripe style="width: 100%">
			<el-table-column prop="is_today" label="今日WOK？" width="100">
			</el-table-column>
			<el-table-column prop="wok" label="WOK" width="180">
			</el-table-column>
			<el-table-column prop="date" sortable label="开始" width="180">
			</el-table-column>
			<el-table-column prop="process" sortable label="进度">
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
		 :page-sizes="[20, 40, 80, 100]" :page-size="100" layout="sizes, prev, pager, next" :total="1000">
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
				tableData: [{
					is_today: 1,
					date: '2016-05-02',
					wok: '两税超基数奖励',
					process: 20
				}, {
					is_today: 0,
					date: '2020-05-04',
					wok: '经营贡献奖励',
					process: 20
				}, {
					is_today: 1,
					date: '2020-05-01',
					wok: '规模以上巴啦啦啦',
					process: 20
				}, {
					is_today: 0,
					date: '2020-05-03',
					wok: '测试资金',
					process: 20
				}]
			}
		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			init_data() {
				let uid = '56e122a0-f901-11ea-850d-538177ec27f6'
				let currentPage = this.currentPage
				let data = {
					currentPage,
					uid
				}
				get_My_VWOK(data).then((res) => {
					console.log(res)
				});
			}

		}

	}
</script>

<style>
</style>
