<template>
	<div id="WokListBoxs" v-infinite-scroll="load" v-loading="isLoading">
		<div class="wok_boxs" @click="click_Box(todayData.vwok_id)" :class="{ active: current_Index == todayData.vwok_id }">
			<div class="vwok_font_info">
				<div class="vwok_title">{{ todayData.vwok_name }}</div>
			</div>
			<!-- <el-progress :percentage="todayData.total_progress"></el-progress> -->
		</div>

		<div v-for="(woks, index) in tableData" :keys="woks.vwok_id" class="wok_boxs" :class="{ active: current_Index == woks.vwok_id }" @click="click_Box(woks.vwok_id)">
			<div class="vwok_font_info ">
				<div class="vwok_title " v-if="woks.isShow_vwok_name">
					<span>{{ woks.vwok_name }}</span>
					<el-dropdown class="" trigger="click" size="small" @command="handleCommand">
						<span class="el-dropdown-link"><i class="el-icon-caret-bottom"></i></span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item :command="{ type: 'edit', index: index }">编辑</el-dropdown-item>
							<el-popconfirm @confirm="end_Vwok(index)" title="注意此操作不可逆!">
								<el-button slot="reference" type="danger" size="mini">删除</el-button>
							</el-popconfirm>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
				<el-input type="textarea" autosize v-else v-model="woks.vwok_name"></el-input>
				<div class="wok_times" v-if="woks.isShow_vwok_name">{{ woks.start_time | formatDate }}-{{ woks.estimate_time | formatDate }}</div>
				<el-button v-else @click="update_Vwok_Name(index)" size="mini" icon="el-icon-edit"></el-button>
			</div>
			<el-progress :percentage="50"></el-progress>
		</div>
	</div>
</template>

<script>
import { get_My_VWOK, Update_Vwok_Name, End_Vwok } from 'network/Net_Vwok.js';
import { get_My_Vwok_Item, get_Today_Vwok } from 'network/Net_Vwok_Item.js';
import { mapGetters } from 'vuex';

export default {
	mounted() {
		this.init_data();
	},
	computed: {
		...mapGetters(['uid'])
	},
	data() {
		return {
			isLoading: true,
			visible: false,
			todayData: {
				total_progress: 25,
				vwok_id: 'today_Vwok',
				vwok_name: '今日事项'
			},
			tableData: [],
			page_info: {
				uid: '',
				currentPage: 1,
				limit: 10
			},
			total: 0,
			isLoad: false, // 是否加载？
			isLimit: false, // 是否到顶
			current_Index: undefined
		};
	},
	methods: {
		async end_Vwok(index) {
			// 终结项目
			let { vwok_id } = this.tableData[index];
			const res = await End_Vwok(vwok_id);
			const { code } = res;
			this.sync_Table_Data(res);
			if (code == 200) {
				this.$message({
					message: '终结成功',
					type: 'success'
				});
			}else{
				this.$message.error('终结失败，请重试');
			}
		},
		handleCommand(data) {
			// event:方块编辑edit/终结end
			const { type, index } = data;

			if (type == 'edit') {
				this.tableData[index].isShow_vwok_name = false;
			}
		},
		async update_Vwok_Name(index) {
			let { vwok_name, vwok_id } = this.tableData[index];

			let data = { vwok_name, vwok_id };

			let { code, msg } = await Update_Vwok_Name(data);

			if (code == 200) {
				this.$message({
					message: '更新成功',
					type: 'success'
				});
				this.tableData[index].isShow_vwok_name = true;
			}else{
				this.$message.error('更新失败，请重试');
			}
		},

		async click_Box(index) {
			var res;
			// 若相同索引 ，不请求数据
			if (this.current_Index == index) return false;
			this.current_Index = index;

			if (index == 'today_Vwok') {
				// 分流接口
				res = await get_Today_Vwok(this.uid);
				res = res.result.wokList;
			} else {
				res = await get_My_Vwok_Item(index);
				res = res.result;
			}
			// console.log(res)
			this.$store.dispatch('vwok/Rewrite_Items', res);
			this.$store.dispatch('vwok/Rewrite_Current_Wok_Id', index);
		},
		load() {
			this.page_info.limit += 3;
			if (!this.isLimit) {
				// 没到顶
				this.net_Get_Vwok();
			}
		},
		async net_Get_Vwok() {
			let res = await get_My_VWOK(this.page_info);
			this.sync_Table_Data(res);
			if (res.result.data.length == res.result.total) {
				this.isLimit = true; // 是否全加载完
			}
		},
		init_data() {
			this.page_info.uid = this.uid;
		},
		sync_Table_Data(res) {
			const { total, data } = res.result;
			data.forEach((value, index) => {
				// 新增是否变input字段
				value['isShow_vwok_name'] = true;
			});
			console.log(data);
			this.tableData = data;
			this.total = total;
			this.isLoading = false; //关闭加载圈圈
		}
	},
	filters: {
		formatDate: function(time) {
			if (time != null && time != '') {
				var date = time.replace(/\-/g, '.');
				return date;
			} else {
				return '';
			}
		}
	}
};
</script>

<style scoped="scoped">
.mask {
	background-color: rgb(139, 139, 139);
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1414141;
}

#WokListBoxs {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	height: 100%;
	overflow: -Scroll;
	overflow-x: hidden;
	width: 12.2rem;
	padding-right: 0.9375rem;
	min-width: 11.2rem;
}

.wok_boxs {
	padding: 0.68rem 0.2rem;
	margin: 0.25rem 0;
	border-radius: 0.5375rem;
	border: 1px #e4e5e7 solid;
}

.wok_boxs:hover {
	box-shadow: 1px 2px 11px #8888884d;
}

.active {
	background-color: #eaf1ff;
}

.vwok_font_info {
	margin: 0 0.375rem;
}

.vwok_title {
	text-align: left;
	font-size: 0.825rem;
	font-weight: bold;
	display: flex;
	justify-content: space-between;
}

.vwok_title span {
	text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
}

.wok_times {
	color: #a1a5aa;
	text-align: left;
	font-size: 0.5125rem;
	white-space: nowrap;
	-webkit-transform-origin-x: 0;
	/*缩小后文字居左*/
	/* -webkit-transform: scale(0.90); */
	/*缩小90%*/
}

.page-component__scroll {
	height: 100%;
}

.page-component__scroll .el-scrollbar__wrap {
	overflow-x: auto;
}
</style>
