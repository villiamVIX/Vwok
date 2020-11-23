<template>
	<div>

		<el-table v-loading="loading" :data="tableData" stripe style="width: 100%">
			<el-table-column prop="is_today" label="今日WOK?" width="100">
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
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page_info.currentPage"
		 :page-sizes="page_sizes" layout="sizes, prev, pager, next" :total="total">
		</el-pagination>
	</div>
</template>

<script>
	import {
		get_My_VWOK
	} from 'network/Net_Vwok.js'
	import {
		mapGetters
	} from 'vuex'

	export default {
		mounted() {
			this.init_data()
		},
		computed: {
			...mapGetters(["UserInfo"]),
		},
		data() {
			return {
				currentPage2: 5,
				page_sizes:[4,8,12,16],
				tableData: [],
				page_info: {
					uid: '',
					currentPage: 1,
					limit: 4
				},
				loading: true,
				total: 0
			}
		},
		methods: {

			handleSizeChange(val) {
				this.page_info.limit = val
				this.net_Get_Vwok()
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.page_info.currentPage = val
				this.net_Get_Vwok()
			},
			async net_Get_Vwok() {
				let res = await get_My_VWOK(this.page_info)
				this.sync_Table_Data(res)
			},
			init_data() {
				this.page_info.uid = this.UserInfo.uid
				this.net_Get_Vwok()
			},
			sync_Table_Data(res) {
				const {
					total,
					data
				} = res.result
				this.tableData = data
				this.total = total
				this.loading = false
			},

		}

	}
</script>

<style scoped="scoped">
</style>
