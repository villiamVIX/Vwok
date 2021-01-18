<template>
	<div id="app">
		<el-scrollbar class='page-component__scroll'>
			<keep-alive exclude="">
				<router-view class="router-view "></router-view>
			</keep-alive>
		</el-scrollbar>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		net_TokenLogin
	} from 'network/Net_User.js'
	export default {
		created() {
			this.auto_Login()
		},
		computed: {
			...mapGetters(["Token", "UserInfo"]),
		},
		methods: {
			async auto_Login() {
				const Token = this.Token
				const UserInfo = this.UserInfo
				console.log(Token && !UserInfo.uid)
				if (Token && !UserInfo.uid) {
					let {
						code,
						User_Info,
						msg
					} = await net_TokenLogin()
					if (code == 200) {
						this.$store.dispatch("rewriteUserInfo", User_Info);
						this.$notify({
							title: "登录/注册提示",
							message: msg,
							type: "success",
							position: "top-left",
						});
						this.$router.replace('/frame/woklist')
					}
				}
			}
		},
		name: 'App',
	}
</script>

<style>
	@import "assets/css/base.css";

	.box-card:last-of-type {
		margin-top: 1.2rem;
	}

	

	#app {
		/* font-family: Avenir, Helvetica, Arial, sans-serif; */
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		height: 99vh;
		font-family: "PingFang-SC-Regular,Microsoft YaHei,SimSun"
	}

	.page-component__scroll {
		height: 100%;
	}

	.page-component__scroll .el-scrollbar__wrap {
		overflow-x: auto;
	}
</style>
