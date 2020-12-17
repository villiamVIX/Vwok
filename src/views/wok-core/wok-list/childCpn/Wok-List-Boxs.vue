<template>
<!-- 	<el-scrollbar class='page-component__scroll'>
	</el-scrollbar> -->
		<div id="WokListBoxs" v-infinite-scroll="load">
			<div v-for="woks in tableData" :keys='woks.vwok_id' class="wok_boxs" :class="{active:current_Index==woks.vwok_id}"
			 @click="click_Box(woks.vwok_id)">
				<div class="wok_font_info">
					<div class="wok_name">
						{{woks.wok_name}}
					</div>
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
		get_My_Vwok_Item
	} from 'network/Net_Vwok_Item.js'
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
				tableData: [],
				page_info: {
					uid: '',
					currentPage: 1,
					limit: 4
				},
				total: 0,
				isLimit: false, //到顶？
				current_Index: undefined
			}
		},
		methods: {
			load() {
				if (this.isLimit) {
					return false
				}
				this.page_info.limit += 3
				this.net_Get_Vwok()
			},
			async click_Box(index) {
				// 若相同索引 ，不请求数据
				if (this.current_Index == index) return false

				this.current_Index = index

				let {
					code,
					result
				} = await get_My_Vwok_Item(index)

				this.$store.dispatch('vwok/Rewrite_Items', result)
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

	.wok_name {
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
