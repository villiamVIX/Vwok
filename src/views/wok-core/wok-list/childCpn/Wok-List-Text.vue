<template>
	<div>
		<h2>工作情况</h2>
		<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
		</el-input>

		<el-button type="success">
			<i class="el-icon-document-copy"></i>
		</el-button>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				textarea: ''
			}
		}
	}
</script>

<style>
</style>
