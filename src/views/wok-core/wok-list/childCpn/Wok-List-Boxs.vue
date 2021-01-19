<template>
	<div id="WokListBoxs" v-infinite-scroll="load" v-loading="isLoading">
		<div class="wok_boxs" @click="click_Box(todayData.vwok_id)" :class="{active:current_Index==todayData.vwok_id}">
			<div class="wok_font_info">
				<div class="vwok_title">
					{{todayData.vwok_name}}
				</div>
			</div>
			<!-- <el-progress :percentage="todayData.total_progress"></el-progress> -->
		</div>


		<div v-for="(woks,index) in tableData" :keys='woks.vwok_id' class="wok_boxs" :class="{active:current_Index==woks.vwok_id}"
		 @click="click_Box(woks.vwok_id)">
			<div class="wok_font_info ">
				<div class="vwok_title " v-if="woks.isShow_vwok_name">
					<span>
						{{woks.vwok_name}}
					</span>
					<el-dropdown class='' trigger="click" size="small" @command="handleCommand">
						<span class="el-dropdown-link">
							<i class="el-icon-more"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item :command="{type:'edit',index:index}">编辑</el-dropdown-item>
							<el-dropdown-item command="end">终结</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
				<el-input type='textarea' autosize v-else v-model="woks.vwok_name">
				</el-input>
				<div class="wok_times" v-if="woks.isShow_vwok_name">
					{{woks.start_time |formatDate}}-{{woks.estimate_time|formatDate}}
				</div>
				<el-button v-else @click='update_Vwok_Name(index)' size="mini"  icon="el-icon-edit">
				</el-button>
			</div>
			<el-progress :percentage="50"></el-progress>

		</div>
	</div>
</template>

<script>
	import {
		get_My_VWOK,
		Update_Vwok_Name
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
			handleCommand(data) { // event:方块编辑edit/终结end
				const {type,index} = data

				if (type == 'edit') {
					
					this.tableData[index].isShow_vwok_name = false
				} else {
					//项目终结
				}
			},
			async update_Vwok_Name(index) {
				
				var {vwok_name,vwok_id} = this.tableData[index]
				let data = {vwok_name,vwok_id}
				let {code,msg} = await Update_Vwok_Name(data)
				
				if(code==200){
					this.$message({
						message: '修改成功',
						type: 'success'
					});
					this.tableData[index].isShow_vwok_name=true
				}
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
	.mask {
		background-color: rgb(139, 139, 139);
		/* opacity: 0.3; */
		/* position: fixed; */
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1414141
	}

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
		margin: 0 6px;
	}

	.vwok_title {
		text-align: left;
		font-size: 0.8375rem;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
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
