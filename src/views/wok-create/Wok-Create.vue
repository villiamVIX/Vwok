<template>
	<div id="Wok-Item">
		<el-card class="box-card">
			<WokCreateInfo></WokCreateInfo>
		</el-card>
	</div>
</template>

<script>
	import WokCreateInfo from './childCpn/Wok-Create-Info'
	export default {
		data() {
			return {
				
			}
		},
		components: {
			WokCreateInfo,
		},
		methods:{
		
		}
	}
</script>

<style scoped='scoped'>
	#Wok-Item{
		height: 100vh;
	}
</style>
