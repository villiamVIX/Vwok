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
	import {net_AutoLogin} from 'network/Net_User.js';
	export default {
		mounted() {
		this.AutoLogin()
		},
		methods:{
			AutoLogin(){
				let token = localStorage.getItem('Token')
				token && net_AutoLogin(token)
			}
		},
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

	

	.page-component__scroll {
		height: 100%;
	}

	.page-component__scroll .el-scrollbar__wrap {
		overflow-x: auto;
	}
</style>
