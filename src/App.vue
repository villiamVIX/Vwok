<template>
	<div id="app">
		<keep-alive exclude="confirm">
			<router-view class="router-view"></router-view>
		</keep-alive>
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
</style>
