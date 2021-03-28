<template>
	<!-- 保证切换时候不会拉大 -->
	<div style="width: 99%;">
		<transition name="fade-transform">
			<el-table
				:data="tableData"
				class="WokItemDetail"
				stripe
				:height="table_Hight"
				fit
				style="width: 100%;"
				highlight-current-row
				v-loading="loading"
				v-infinite-scroll="loadmore"
			>
				<el-table-column type="index" min-width="1%"></el-table-column>
				<!-- <el-table-column property="start_time" label="开始时间" min-width="13%"></el-table-column> -->
				<el-table-column property="vw_works.vwok_name" label="Vwok" :show-overflow-tooltip="true" v-if="show" min-width="15"></el-table-column>
				<el-table-column property="vwok_item_name" label="Vwok工项" min-width="22%">
					<template slot-scope="scope">
						<el-input
							type="textarea"
							autosize
							placeholder="请输入内容"
							@input="Debounce_Request($event, 'vwok_item_name', scope.row)"
							v-model="scope.row.vwok_item_name"
						></el-input>
					</template>
				</el-table-column>
				<el-table-column property="jira" label="JIRA单号" min-width="17%">
					<template slot-scope="scope">
						<el-input type="input" autosize placeholder="请输入内容" @input="Debounce_Request($event, 'jira', scope.row)" v-model="scope.row.jira"></el-input>
					</template>
				</el-table-column>
				<el-table-column property="estimate" label="进度" min-width="15%">
					<template slot-scope="scope">
						<!-- <el-slider v-model="value1" :step="10"></el-slider> -->
						<SliderVIX
							:target="scope.row.scroll_estimate"
							:actual="scope.row.scroll_actual"
							@Estimate="Debounce_Request($event, 'scroll_estimate', scope.row)"
							@Actual="Debounce_Request($event, 'scroll_actual', scope.row)"
						></SliderVIX>
					</template>
				</el-table-column>
				<el-table-column property="remarks" label="备注" min-width="25%">
					<template slot-scope="scope">
						<el-input type="textarea" autosize placeholder="备注..." @input="Debounce_Request($event, 'remark', scope.row)" v-model="scope.row.remark"></el-input>
					</template>
				</el-table-column>
			</el-table>
		</transition>
		<el-button type="primary" @click="visible_Item">导出</el-button>
	</div>
</template>

<script>
import SliderVIX from 'common/SliderVIX/SliderVIX.vue';
import { mapGetters } from 'vuex';
import { update_Vwok_Item, update_Vwok_Item_Today, get_Today_Vwok } from 'network/Net_Vwok_Item.js';

import { debounce } from 'common/Utils/util.js';
// vue 方法放置顺序
// 1. components
// 2. props
// 3. data
// 4. created
// 5. mounted
// 6. activited
// 7. update
// 8. beforeRouteUpdate
// 9. methods
// 10. filter
// 11. computed
// 12. watch
export default {
	components: {
		SliderVIX
	},
	data() {
		return {
			tableData: [], //总数据
			currentRow: {}, //当前改变行的数据
			table_Hight: 0, //容器高,
			loading: false,
			show: false,
			value1: 0
		};
	},
	mounted() {
		this.calculate_Height(); // 自适应容器高度
		this.onResize();
	},
	methods: {
		loadmore() {
			// console.log('订到了');
		},
		Debounce_Request: debounce(function(data, item_name, currentRow_data) {
			// requset_LS:name/jira/ramark
			let diff_data = {};
			diff_data[item_name] = data; // 改变的数据
			console.log(data, item_name, currentRow_data);
			this.Net_Update_Vwok_Item(diff_data, currentRow_data);
		}, 1000),
		async Net_Update_Vwok_Item(diff_data, currentRow_data) {
			// @param:{1.工项ID，变更内容}
			let { vwok_item_id, vwok_id } = currentRow_data,
				data = { diff_data, vwok_item_id, vwok_id },
				{ result, msg, code } = await update_Vwok_Item(data);

			if (code == 200) {
				this.$notify({
					title: '更新成功',
					type: 'success',
					position: 'bottom-right'
				});
				this.$store.dispatch('vwok/Rewrite_Items', result); //更新更新后的数据
			} else {
				this.$message.error('保存失败，请重试');
			}
		},
		async visible_Item() {
			let { result, code } = await get_Today_Vwok(this.uid);
			this.$store.dispatch('vwok_item/Rewrite_export_Text', result);
			this.$store.dispatch('vwok_item/Visible_Export', true);
		},
		onResize() {
			window.onresize = () => {
				// 自适应高度
				this.calculate_Height();
			};
		},
		calculate_Height() {
			this.$nextTick(() => {
				let heigth = document.getElementsByClassName('box-card-Wok-List')[0].offsetHeight - 105;
				this.table_Hight = heigth;
			});
		},
		set_Estimate: debounce(function(data) {
			console.log(data);
			this.currentRow.scroll_estimate = data;
		}, 500),
		set_Actual: debounce(function(data) {
			this.currentRow.scroll_actual = data;
		}, 500),
		// handleCurrentChange(val) { 当前选中行
		// 	// @current-change="handleCurrentChange"
		// 	this.currentRow = val;
		// },
		refresh_Items(items) {
			this.tableData = items;
			this.loading = false; // 未生效
		}
	},
	computed: {
		...mapGetters(['uid']),
		...mapGetters('vwok', ['current_wok_id'])
	},
	watch: {
		// 监听子工项改变
		'$store.state.vwok.vwok_items': function(items) {
			this.refresh_Items(items);
		},
		current_wok_id: function(id) {
			id == 'today_Vwok' ? (this.show = true) : (this.show = false);
		}
	}
};
</script>

<style scoped="scoped">
.ellipsis {
	width: 10px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
</style>
