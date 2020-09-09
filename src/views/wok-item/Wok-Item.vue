<template>
	<div id="Wok-Item">
		<el-card class="box-card">
			<WokItemWokInfo></WokItemWokInfo>
		</el-card>
		<el-card class="box-card">
		</el-card>
	</div>
</template>

<script>
	import WokItemWokInfo from './childCpn/Wok-Item-WokInfo'
	export default{
		components:{
			WokItemWokInfo
		}
	}
</script>

<style>
</style>
