<template>
	<!-- 	<el-scrollbar class='page-component__scroll'>
	</el-scrollbar> -->
	<div id="WokListBoxs" v-infinite-scroll="load" v-loading="isLoading">
		<div class="wok_boxs" @click="click_Box(todayData.vwok_id)" :class="{active:current_Index==todayData.vwok_id}">
			<div class="wok_font_info">
				<div class="vwok_name" v-if="todayData.isShow_vwok_name">
					{{todayData.vwok_name}}
				</div>
				<el-input prefix-icon="el-icon-search" size='mini' v-else v-model="todayData.vwok_name">
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
				<!-- <div class="wok_times">
					{{todayData.start_time |formatDate}}-{{todayData.estimate_time|formatDate}}
				</div> -->
			</div>
			<!-- <el-progress :percentage="todayData.total_progress"></el-progress> -->
		</div>


		<div v-for="(woks,index) in tableData" :keys='woks.vwok_id' class="wok_boxs" :class="{active:current_Index==woks.vwok_id}"
		 @click="click_Box(woks.vwok_id)">
			<div class="wok_font_info" @dblclick="update_Vwok_Name(index)">
				<div class="vwok_name" v-if="woks.isShow_vwok_name">
					{{woks.vwok_name}}
				</div>
				<el-input size='mini' v-else v-model="woks.vwok_name">>
				</el-input>
				<div class="wok_times">
					{{woks.start_time |formatDate}}-{{woks.estimate_time|formatDate}}
				</div>
			</div>
			<el-progress :percentage="50"></el-progress>
		</div>
	</div>
</template>

<script>
	import {
		get_My_VWOK
	} from 'network/Net_Vwok.js'
	import {
		get_My_Vwok_Item,
		get_Today_Vwok
	} from 'network/Net_Vwok_Item.js'
	import {
		mapGetters
	} from 'vuex'

	export default {
		mounted() {
			this.init_data()
		},
		computed: {
			...mapGetters(["uid"]),
		},
		data() {
			return {
				isLoading: true,
				todayData: {
					createdAt: "2020-12-31 17:41:43",
					start_time: "2020-12-31",
					estimate_time: "2020-12-31",
					isShow_vwok_name: true,
					total_progress: 25,
					vwok_id: "today_Vwok",
					vwok_name: "今日事项",
				},
				tableData: [],
				page_info: {
					uid: '',
					currentPage: 1,
					limit: 3
				},
				total: 0,
				isLimit: false, //到顶？
				current_Index: undefined,
			}
		},
		methods: {
			update_Vwok_Name(index) { // 未完成
				this.tableData[index].isShow_vwok_name = !this.tableData[index].isShow_vwok_name
			},
			load() {
				this.page_info.limit += 3
				this.net_Get_Vwok()
				if (this.isLimit) {
					return false
				}
			},
			async click_Box(index) {
				var res
				// 若相同索引 ，不请求数据
				if (this.current_Index == index) return false
				this.current_Index = index

				if (index == 'today_Vwok') {
					res = await get_Today_Vwok(this.uid)
					res = res.result.wokList
				} else {
					res = await get_My_Vwok_Item(index)
					res = res.result
				}

				// console.log(result)
				this.$store.dispatch('vwok/Rewrite_Items', res)
				this.$store.dispatch('vwok/Rewrite_Current_Wok_Id', index)
			},
			async net_Get_Vwok() {
				let res = await get_My_VWOK(this.page_info)
				this.sync_Table_Data(res)
				if (res.result.data.length == res.result.total) {
					this.isLimit = true
				}
			},
			init_data() {
				this.page_info.uid = this.uid
			},
			sync_Table_Data(res) {
				const {
					total,
					data
				} = res.result
				data.forEach((value, index) => { // 新增是否变input字段
					value['isShow_vwok_name'] = true
				})
				console.log(data)
				this.tableData = data
				this.total = total
				this.loading = false
				this.isLoading = false //关闭加载圈圈
			},

		},
		filters: {
			formatDate: function(time) {
				if (time != null && time != "") {
					var date = time.replace(/\-/g, '.');
					return date
				} else {
					return "";
				}
			}
		},
	}
</script>

<style scoped="scoped">
	#WokListBoxs {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
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

	.wok_font_info {
		margin-left: 0.525rem;
	}

	.vwok_name {
		text-align: left;
		font-size: 0.8375rem;
		font-weight: bold;
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
