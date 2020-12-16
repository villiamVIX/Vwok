<template>
	<div>
		<el-table ref="singleTable" :data="tableData" class='WokItemDetail' stripe :height='table_Hight' fit style='width: 100%;'
		 highlight-current-row @current-change="handleCurrentChange">
			<el-table-column type="index" min-width="0%">
			</el-table-column>
			<el-table-column property="start_time" label="开始时间" min-width="10%">
			</el-table-column>
			<el-table-column property="vwok_item_name" label="WOK描述" min-width="22%">
				<template slot-scope="scope">
					<el-input type="textarea" autosize placeholder="请输入内容" v-model="scope.row.vwok_item_name">
					</el-input>
				</template>
			</el-table-column>
			<el-table-column property="jira" label="JIRA单号" min-width="17%">
				<template slot-scope="scope">
					<el-input type="input" autosize placeholder="请输入内容" v-model="scope.row.jira">
					</el-input>
				</template>
			</el-table-column>
			<el-table-column property="estimate" label="进度" min-width="20%">
				<template slot-scope="scope">
					<SliderVIX :target='scope.row.scroll_estimate' :actual="scope.row.scroll_actual" @Progress='get_Progress'></SliderVIX>
				</template>
			</el-table-column>
			<el-table-column property="remarks" label="备注" min-width="25%">
				<template slot-scope="scope">
					<el-input type="input" autosize placeholder="备注..." v-model="scope.row.remark">
					</el-input>
				</template>
			</el-table-column>
		</el-table>
		<el-button type="primary" @click="onChange_Item">保存</el-button>
	</div>
</template>

<script>
	import SliderVIX from 'common/SliderVIX/SliderVIX.vue'
	import {
		mapGetters
	} from 'vuex'
	import {
		update_Vwok_Item
	} from 'network/Net_Vwok_Item.js'
	export default {
		data() {
			return {
				tableData: [],
				currentRow: {},
				textarea: '',
				diffData: [], //变化的数据 比对池
				rawData: [], //原始数据
				table_Hight: 0
			}
		},
		created() {

		},
		mounted() {
			// this.table_Hight = document.getElementsByClassName('box-card-Wok-List')[0].offsetHeight-205

			this.$nextTick(() => {
				let heigth = document.getElementsByClassName('box-card-Wok-List')[0].offsetHeight - 105
				this.table_Hight = heigth
				// console.log(this.table_Hight)
			})
		},
		components: {
			SliderVIX
		},
		computed: {
			...mapGetters(["vwok_items"]),
		},
		watch: {
			'$store.state.vwok.vwok_items': function(items) {
				this.refresh_Items(items)
			},
		},
		methods: {
		
			get_Progress(da) { // 更新进度条未完成
				
				debounce(function(da){
					console.log(123)
				}, 500)
				
				function debounce(fn, wait) {
				 let timeout = null
				 return function() {
				 console.log(fn)
				  if(timeout !== null) clearTimeout(timeout)   
				  timeout = setTimeout(fn, wait);
				 }
				}
				// console.log(this.currentRow.vwok_item_id )
				// let id = this.currentRow.vwok_item_id

				// console.log(this.tableData[id])
			},
			async onChange_Item() {
				let data_Length = this.rawData.length

				for (let i = 0; i < data_Length; i++) { //遍历现有数据
					for (let k in this.tableData[i]) {
						if (this.tableData[i][k] !== this.rawData[i][k]) {
							this.diffData.push(this.tableData[i])
						}
					}
				}
				console.log(this.diffData)

				if (!this.diffData.length) { // 没有改动 
					this.$message('未改动 不保存');
					return false
				}

				let {
					code,
					result
				} = await update_Vwok_Item(this.diffData)

				if (code == 200) {
					this.$message({
						message: '保存成功',
						type: 'success'
					});
					this.$store.dispatch('vwok/Rewrite_Items', result) //更新更新后的数据
					this.diffData = [] // 清空比对池
				}
			},
			setCurrent(row) {
				this.$refs.singleTable.setCurrentRow(row);
			},
			handleCurrentChange(val) {
				this.currentRow = val;
				console.log(val)
			},
			refresh_Items(items) {
				this.tableData = items
				this.rawData = JSON.parse(JSON.stringify(items))
			}
		}
	}
</script>


<style scoped="scoped">
	.WokItemDetail {
		/* height: 96%; */
	}
</style>
