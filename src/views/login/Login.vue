<template>
	<div class="login-register">
		<div class="contain">
			<div class="big-box" :class="{active:isLogin}">
				<div class="big-contain" v-if="isLogin">
					<div class="btitle">账户登录</div>
					<div class="bform">
						<input type="email" placeholder="邮箱" v-model="form.email">
						<span class="errTips" v-if="emailError">* 邮箱填写错误 *</span>
						<input type="password" placeholder="密码" v-model="form.password">
						<span class="errTips" v-if="emailError">* 密码填写错误 *</span>
					</div>
					<button class="bbutton" @click="login">登录</button>
				</div>
				<div class="big-contain" v-else>
					<div class="btitle">创建账户</div>
					<div class="bform">
						<input type="text" placeholder="用户名" v-model="form.username">
						<span class="errTips" v-if="existed">* 用户名已经存在！ *</span>
						<input type="email" placeholder="邮箱" v-model="form.email">
						<span class="errTips" v-if="email_type_Error">* 邮箱填写错误 *</span>
						<input type="password" placeholder="密码" v-model="form.password">
						<input type="number" maxlength="4" v-on:input="is_Verify_Full" placeholder="验证码" @change='' v-model="form.verify">
					</div>
					<div>
						<transition name="slide-fade">
						<el-button type="primary" class='vbutton' v-show='is_Show_Register' @click="register">注册</el-button>							
						</transition>
						<el-button type="success" class='vbutton vbutton_email' v-if='!countDown' @click="check_Email">发射验证码</el-button>
						<el-button type="info" v-else="countDown" disabled="disabled">已发射 {{countDown}}s</el-button>
					</div>
				</div>
			</div>
			<div class="small-box" :class="{active:isLogin}">
				<div class="small-contain" v-if="isLogin">
					<div class="stitle">你好，朋友!</div>
					<p class="scontent">开始注册，和我们一起旅行</p>
					<button class="sbutton" @click="changeType">注册</button>
				</div>
				<div class="small-contain" v-else>
					<div class="stitle">欢迎回来!</div>
					<p class="scontent">与我们保持联系，请登录你的账户</p>
					<button class="sbutton" @click="changeType">登录</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		net_Register,
		net_Send_Email
	} from 'network/Net_User.js'

	export default {
		name: 'login-register',
		data() {
			return {
				isLogin: false,
				emailError: false,
				passwordError: false,
				email_type_Error: false,
				existed: false,
				form: {
					username: '',
					email: '',
					password: '',
					verify: ''
				},
				countDown:0,
				is_Show_Register:false
			}
		},
		methods: {
			is_Verify_Full(){
				let {verify} = this.form
				// 限制长度
				if(verify > 4) this.form.verify =  verify.slice(0, 4)
				this.form.verify.length == 4 ? this.is_Show_Register = true : this.is_Show_Register = false
			},
			changeType() {
				this.isLogin = !this.isLogin
				
			},
			check_Email() {
				var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
				if (this.form.email != '' && !regEmail.test(this.form.email)) {
					this.$notify({
					          title: '警告',
					          message: '邮箱格式不正确',
					          type: 'warning'
					        });
					return false
				}
				this.send_Email()
				
				this.countDown = 5
				let timer = setInterval(() => {
					this.countDown--
					if (this.countDown === 0) {
						clearInterval(timer)
					}
				}, 1000)
			},
			send_Email() {
				let {email} = this.form
				net_Send_Email({
					email
				}).then(res => {
					console.log(email)
				})
			},
			login() {
				const self = this;
				if (self.form.email != "" && self.form.password != "") {
					self.$axios({
							method: 'post',
							url: 'http://127.0.0.1:10520/api/user/login',
							data: {
								email: self.form.email,
								password: self.form.password
							}
						})
						.then(res => {
							switch (res.data) {
								case 0:
									alert("登陆成功！");
									break;
								case -1:
									this.emailError = true;
									break;
								case 1:
									this.passwordError = true;
									break;
							}
						})
						.catch(err => {
							console.log(err);
						})
				} else {
					alert("填写不能为空！");
				}
			},
			register() {
				const {
					username,
					password,
					verify,
					email
				} = this.form


				if (this.form.username != "" && this.form.email != "" && this.form.password != "" && this.form.verify !== '') {

					net_Register({
							username,
							password,
							verify,
							email
						})
						.then(res => {
							console.log(res)
							switch (res.data) {
								case 0:
									alert("注册成功！");
									this.login();
									break;
								case -1:
									this.existed = true;
									break;
							}
						})
						.catch(err => {
							console.log(err);
						})
				} else {
					alert("填写不能为空！");
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.login-register {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
	}

	.contain {
		width: 60%;
		height: 60%;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		border-radius: 20px;
		box-shadow: 0 0 3px #f0f0f0,
			0 0 6px #f0f0f0;
	}

	.big-box {
		width: 70%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 30%;
		transform: translateX(0%);
		transition: all 1s;
	}

	.big-contain {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.btitle {
		font-size: 1.5em;
		font-weight: bold;
		color: rgb(57, 167, 176);
	}

	.bform {
		width: 100%;
		height: 10rem;
		padding: 0 0 .4rem 0 !important;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.bform .errTips {
		display: block;
		width: 50%;
		text-align: left;
		color: red;
		font-size: 0.7em;
		margin-left: 1em;
	}

	.bform input {
		width: 50%;
		height: 30px;
		border: none;
		outline: none;
		border-radius: 10px;
		padding-left: 2em;
		background-color: #f0f0f0;
	}

	.bform input:hover {
		box-shadow: 0px 0.5px 10px 1px #534c4c17;

	}

	.bbutton {
		width: 6rem;
		height: 2.3rem;
		border-radius: 24px;
		border: none;
		outline: none;
		background-color: rgb(57, 167, 176);
		color: #fff;
		font-size: 0.9em;
	}

	.vbutton {
		border-radius: 1.125rem;
		background-color: #39b39a;
		border-color: #38b19c;
	}
	
	.vbutton_email {
		border-radius: 1.125rem;
		background-color: #3a97b3;
		border-color: #38b19c;
	}
	
	.vbutton:hover {
		box-shadow: 0px 0.5px 10px 1px #534c4c17;
		opacity: .7;
	}

   
	
	.small-box {
		width: 30%;
		height: 100%;
		background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145));
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(0%);
		transition: all 1s;
		border-top-left-radius: inherit;
		border-bottom-left-radius: inherit;
	}

	.small-contain {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.stitle {
		font-size: 1.5em;
		font-weight: bold;
		color: #fff;
	}

	.scontent {
		font-size: 0.8em;
		color: #fff;
		text-align: center;
		padding: 2em 4em;
		line-height: 1.7em;
	}

	.sbutton {
		width: 60%;
		height: 40px;
		border-radius: 24px;
		border: 1px solid #fff;
		outline: none;
		background-color: transparent;
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
	}

	.big-box.active {
		left: 0;
		transition: all 0.5s;
	}

	.small-box.active {
		left: 100%;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border-top-right-radius: inherit;
		border-bottom-right-radius: inherit;
		transform: translateX(-100%);
		transition: all 1s;
	}
</style>
