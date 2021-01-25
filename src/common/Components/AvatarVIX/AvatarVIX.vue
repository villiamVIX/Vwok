<template>
	<el-table :data='List'>
		<el-table-column>
			<template slot-scope='scope'>
				<span v-if='scope.row.avatar'>
					<img :src="'http://' + scope.row.avatar" alt='' width='40' height='40' style='border-radius: 50%'>
				</span>
				<span v-else>
					<img :id="'Img' + scope.row.user_id" src='' alt='' width='40' height='40' style='border-radius: 50%'>
					<canvas :id="'headImage' + scope.row.user_id" style='display: none'></canvas>
				</span>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
import {draw} from './avatar'
export default{
	data(){
		return{
			List:[]
		}
	},
	created(){
		this.getUser()
	},
	methods:{
		getUser(){
			this.$axios.get('xxx').then(res => {
				this.List = res.data.data
				//注意这里必须写在this.$nextTick(function(){})中，意在在页面渲染完成后在调用该方法，否则document.getElementByID（）拿不到元素
				this.$nextTick(function(){
					this.List.forEach(item => {
						if(!item.avatar) {
							draw(40,40,20,'headImage' + item.user_id,'Img' + item.user_id,item.realname,item.user_id)
						}
					})
				})
			})
		}
	}
}
</script>

<style></style>
