<template>
	<div style="width: 99.5%;">
		<vxe-table
			border
			resizable
			show-overflow
			class="mytable-scrollbar"
			:data="tableData"
			highlight-hover-row
			:height="table_Hight"
			:edit-config="{ trigger: 'click', mode: 'cell' }"
			@edit-closed="Edit2Save"
			ref="xTable"
			keep-source
			@checkbox-change="toggleSelect"
			@checkbox-all="toggleAllPaperSelect"
		>
			<vxe-table-column type="checkbox" width="40"></vxe-table-column>
			<vxe-table-column type="seq" width="35"></vxe-table-column>
			<vxe-table-column field="vwok_item_name" title="工项" :edit-render="{ name: 'input', attrs: { type: 'text', placeholder: '请输入工作内容' } }"></vxe-table-column>
			<vxe-table-column field="jira" title="JIRA" :edit-render="{ name: 'input', attrs: { type: 'text', placeholder: '请输入JIRA单' } }"></vxe-table-column>
			<vxe-table-column title="进度" width="150">
				<template #default="{ row }">
					<slider class="vslider-estimate" @change="Debounce_Request('scroll_estimate', row)" :target="true" v-model="row.scroll_estimate"></slider>
					<slider class="vslider-actual" @change="Debounce_Request('scroll_actual', row)" :actual="true" v-model="row.scroll_actual"></slider>
				</template>
			</vxe-table-column>
			<vxe-table-column field="remark" title="备注" :edit-render="{ name: 'input', attrs: { type: 'input', placeholder: '备注...' } }"></vxe-table-column>
		</vxe-table>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { update_Vwok_Item, update_Vwok_Item_Today, get_Today_Vwok, delete_Vwok_Item } from 'network/Net_Vwok_Item.js';

import slider from '../../../../common/slider/index.js';
import { debounce } from 'common/Utils/util.js';
export default {
	components: {
		slider
	},
	data() {
		return {
			tableData: [], //总数据
			currentRow: {}, //当前改变行的数据
			table_Hight: 0, //容器高,
			loading: false,
			isTodayPage: false,
			value1: [1, 8],
			selectedPapers: new Set(),
			loading: false,
			loadingMore: false, //loading 加载更多
			isScroll: true, //是否可以滚动
			pageIndex: 1,
			pageSize: 10,
			list: []
		};
	},
	mounted() {
		this.calculate_Height(); // 自适应容器高度
		this.onResize();
		this.load();

		this.$nextTick(() => {
			window.addEventListener(
				'scroll',
				() => {
					console.log(123);
				},
				false
			);
		});
	},
	methods: {
		load() {
			let el = document.getElementsByClassName('mytable-scrollbar')[0];
			// let domRect = el.getBoundingClientRect();
		},
		scrollMoreData() {
			console.log(213);
		},
		toggleSelect({ rowid, checked }) {
			if (checked) {
				this.selectedPapers.add(rowid);
			} else {
				this.selectedPapers.delete(rowid);
			}
			// console.log(this.selectedPapers);
		},
		toggleAllPaperSelect({ records, checked }) {
			if (checked) {
				records.forEach(item => this.selectedPapers.add(item.id));
			} else {
				// 注意取消全选时需要遍历当前表格数据来删除，records不管用
				this.paperResult.forEach(item => this.selectedPapers.delete(item.id));
			}
		},
		Edit2Save({ row, column }) {
			let xTable = this.$refs.xTable;
			let field = column.property; // 字段名
			let cellValue = row[field]; // 字段对应数据
			// 判断单元格值是否被修改 dom中要加keep-source属性
			// console.log(this.$refs.xTable._removeCheckboxRow);
			if (xTable.isUpdateByRow(row, field)) {
				this.Debounce_Request(field, row);
			}
		},
		Debounce_Request_old: debounce(function(data, item_name, currentRow_data) {
			// requset_LS:name/jira/ramark
			console.log(data, item_name, currentRow_data);
			// let diff_data = {};
			// diff_data[item_name] = data; // 改变的数据
			// this.Net_Update_Vwok_Item(diff_data, currentRow_data);
		}, 1000),
		Debounce_Request: debounce(function(item_name, currentRow_data) {
			let diff_data = {};
			diff_data[item_name] = currentRow_data[item_name]; // 改变的数据
			console.log(item_name, currentRow_data);
			this.Net_Update_Vwok_Item(diff_data, currentRow_data);
		}, 1000),
		async Net_Update_Vwok_Item(diff_data, currentRow_data) {
			// 动态选择接口
			let netFun = '';
			this.isTodayPage ? (netFun = update_Vwok_Item_Today) : (netFun = update_Vwok_Item);

			// @param:{1.工项ID，变更内容}
			let { vwok_item_id, vwok_id } = currentRow_data,
				data = { diff_data, vwok_item_id, vwok_id },
				{ result, msg, code } = await netFun(data);

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

		onResize() {
			window.onresize = () => {
				// 自适应高度
				this.calculate_Height();
			};
		},
		calculate_Height() {
			this.$nextTick(() => {
				let heigth = document.getElementsByClassName('box-card-Wok-List')[0].offsetHeight - 73;
				this.table_Hight = heigth;
			});
		},
		set_Estimate: debounce(function(data) {
			this.currentRow.scroll_estimate = data;
		}, 500),
		set_Actual: debounce(function(data) {
			this.currentRow.scroll_actual = data;
		}, 500),
		refresh_Items(data) {
			if (this.isTodayPage) data = data.wokList;
			console.log(data);
			data.forEach(item => {
				item['scroll'] = [item.scroll_actual, item.scroll_estimate];
				// console.log(item['scroll'])
			});
			this.tableData = data;
			this.loading = false; // 未生效
		},
		async DelConfirm() {
			let selectRecords = this.$refs.xTable.getCheckboxRecords(),
				selectRecords_Len = selectRecords.length,
				data = [];

			selectRecords.forEach(item => {
				let { vwok_item_id, uid } = item;
				data.push({ vwok_item_id, uid });
			});

			if (selectRecords_Len == 0) {
				this.Close_DelConfirm();
				return this.$message({
					message: '未选中，无法删除',
					type: 'warning'
				});
			}

			this.$confirm('此操作将删除选中的工项, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(async () => {
					let { code } = await delete_Vwok_Item(data);
					if (code == 200) {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.$refs.xTable.removeCheckboxRow();
					}
				})
				.catch(() => {
					this.$message({
						type: 'warning',
						message: '删除失败，请重试!'
					});
				});
			this.Close_DelConfirm();
		},
		Close_DelConfirm() {
			this.$store.dispatch('vwok_item/Visible_Delete_Confirm', false);
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
			id == 'today_Vwok' ? (this.isTodayPage = true) : (this.isTodayPage = false);
		},
		'$store.state.vwok_item.checked.isShow_DelConfirm': function(items) {
			items ? this.DelConfirm() : null;
		}
	}
};
</script>

<style scoped="scoped">
/* 右侧滑动条样式 */
/*滚动条整体部分*/
.mytable-scrollbar ::-webkit-scrollbar {
	width: 5px;
	height: 10px;
}
/*滚动条的轨道*/
.mytable-scrollbar ::-webkit-scrollbar-track {
	background-color: #ffffff;
}
/*滚动条里面的小方块，能向上向下移动*/
.mytable-scrollbar ::-webkit-scrollbar-thumb {
	background-color: #bfbfbf;
	border-radius: 5px;
	border: 1px solid #f1f1f1;
	box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:hover {
	background-color: #a8a8a8;
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:active {
	background-color: #787878;
}
/*边角，即两个滚动条的交汇处*/
.mytable-scrollbar ::-webkit-scrollbar-corner {
	background-color: #ffffff;
}
</style>
