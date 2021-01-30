<template>
	<!-- 保证切换时候不会拉大 -->
	<div style="width: 99%;">
		<el-table
			ref="singleTable"
			:data="tableData"
			class="WokItemDetail"
			stripe
			:height="table_Hight"
			fit
			style="width: 100%;"
			highlight-current-row
			@current-change="handleCurrentChange"
		>
			<el-table-column type="index" min-width="2%"></el-table-column>
			<el-table-column property="start_time" label="开始时间" min-width="13%"></el-table-column>
			<el-table-column property="vw_works.vwok_name" label="Vwok" min-width="15%"></el-table-column>
			<el-table-column property="vwok_item_name" label="Vwok工项" min-width="22%">
				<template slot-scope="scope">
					<el-input type="textarea" autosize placeholder="请输入内容" v-model="scope.row.vwok_item_name"></el-input>
				</template>
			</el-table-column>
			<el-table-column property="jira" label="JIRA单号" min-width="17%">
				<template slot-scope="scope">
					<el-input type="input" autosize placeholder="请输入内容" v-model="scope.row.jira"></el-input>
				</template>
			</el-table-column>
			<el-table-column property="estimate" label="进度" min-width="15%">
				<template slot-scope="scope">
					<SliderVIX :target="scope.row.scroll_estimate" :actual="scope.row.scroll_actual" @Estimate="set_Estimate" @Actual="set_Actual"></SliderVIX>
				</template>
			</el-table-column>
			<el-table-column property="remarks" label="备注" min-width="25%">
				<template slot-scope="scope">
					<el-input type="input" prefix-icon="el-icon-search" autosize placeholder="备注..." v-model="scope.row.remark"></el-input>
				</template>
			</el-table-column>
		</el-table>
		<el-button type="primary" @click="update_Item" :loading="is_Update">保存</el-button>
		<el-button type="primary" @click="visible_Item">导出</el-button>
	</div>
</template>

<script>
import SliderVIX from 'common/SliderVIX/SliderVIX.vue';
import { mapGetters } from 'vuex';
import { update_Vwok_Item, update_Vwok_Item_Today, get_Today_Vwok } from 'network/Net_Vwok_Item.js';
import { debounce } from 'lodash';

export default {
	data() {
		return {
			tableData: [], //总数据
			diffData: [], //变化的数据 比对池
			rawData: [], //原始数据
			currentRow: {}, //当前改变行的数据
			table_Hight: 0, //容器高,
			is_Update: false
		};
	},
	mounted() {
		this.calculate_Height(); // 自适应容器高度
		this.onResize();
	},
	components: {
		SliderVIX
	},
	watch: {
		// 动态改变工项
		'$store.state.vwok.vwok_items': function(items) {
			this.refresh_Items(items);
			// console.log(items)
		},
		
	},
	computed: {
		...mapGetters(['uid']),
		...mapGetters('vwok', ['current_wok_id'])
	},
	methods: {
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
				this.currentRow.scroll_estimate = data;
		}, 1500),
		set_Actual: debounce(function(data) {
			this.currentRow.scroll_actual = data;
		}, 500),
		async update_Item() {
			this.is_Update = true;
			for (let i = 0, j = this.rawData.length; i < j; i++) {
				//遍历现有数据
				for (let k in this.tableData[i]) {
					// 跳过比对关联查询的vwok_name
					delete this.tableData[i]['vw_works'];
					delete this.rawData[i]['vw_works'];
					if (this.tableData[i][k] !== this.rawData[i][k]) {
						this.diffData.push(this.tableData[i]);
					}
				}
			}

			if (!this.diffData.length) {
				// 没有改动
				this.$message('未改动 不保存');
				this.is_Update = false;
				return false;
			}

			var post; // 动态切换接口
			this.current_wok_id == 'today_Vwok' ? (post = update_Vwok_Item_Today) : (post = update_Vwok_Item);
			let { code, result } = await post(this.diffData);
			// 重赋值返回值：若不是一个数组   则  赋值为今日工项接口返回值
			this.current_wok_id == 'today_Vwok' ? (result = result.wokList) :null ;

			if (code == 200) {
				this.$message({
					message: '保存成功',
					type: 'success'
				});
				this.$store.dispatch('vwok/Rewrite_Items', result); //更新更新后的数据
				this.diffData = []; // 清空比对池
				this.is_Update = false;
			}else{
				this.$message.error('保存失败，请重试')
				this.is_Update = false;
			}
		},
		handleCurrentChange(val) {
			this.currentRow = val;
		},
		refresh_Items(items) {
			this.tableData = items;
			this.rawData = JSON.parse(JSON.stringify(items));
		}
	}
};
</script>

<style scoped="scoped"></style>
