<template>
	<div id="app">
		<el-scrollbar class='page-component__scroll'>
			<keep-alive exclude="confirm">
				<router-view class="router-view"></router-view>
			</keep-alive>
		</el-scrollbar>
	</div>
</template>

<script>
	export default {
		name: 'App',
		components: {

		}
	}
</script>

<style>
	@import "assets/css/base.css";
    /* 去除type-number的调节器 */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}

	input[type="number"] {
		-moz-appearance: textfield;
	}


	.box-card:last-of-type {
		margin-top: 1.2rem;
	}

	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		height: 100vh;
	}

	html,
	body {
		height: 100%;
		overflow: hidden;
		/*有效防止在页面进行手动刷新时显示内置滚动条*/
	}

	.page-component__scroll {
		height: 100%;
	}

	.page-component__scroll .el-scrollbar__wrap {
		overflow-x: auto;
	}
</style>
