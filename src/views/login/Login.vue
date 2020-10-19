<template>
  <div class="login-register">
    <div class="contain">
      <div class="big-box" :class="{ active: isLogin }">
        <div class="big-contain" v-if="isLogin">
          <div class="btitle" v-if="isForgot">连接效率，重塑价值</div>
          <div class="btitle" v-else>重置密码</div>
          <div class="bform" v-if="isForgot">
            <input
              type="email"
              placeholder="邮箱"
              v-on:input="Login_Error_Tip = false"
              v-model="form.email"
            />
            <input
              type="password"
              placeholder="密码"
              v-on:input="Login_Error_Tip = false"
              v-model="form.password"
            />
            <transition name="fade-transform">
              <span class="errTips" v-if="Login_Error_Tip"
                >* 登录信息有误 *
              </span>
            </transition>
          </div>
          <!-- 忘记密码的表单 -->
          <div class="bform" v-else>
            <input
              type="email"
              placeholder="注册的邮箱"
              v-on:input="Login_Error_Tip = false"
              v-model="form.email"
            />
            <input
              type="number"
              placeholder="验证码"
              v-on:input="Login_Error_Tip = false"
              v-model="form.verify"
            />
            <input
              type="password"
              placeholder="新密码"
              v-on:input="Login_Error_Tip = false"
              v-model="form.password"
            />
            <transition name="fade-transform">
              <span class="errTips" v-if="Login_Error_Tip"
                >* 重置信息有误 *</span
              >
            </transition>
          </div>
          <div v-if="isForgot">
            <el-button type="success" class="vbutton" @click="login"
              >登录</el-button
            >
          </div>
          <!-- 忘记密码的按钮部分 -->
          <div v-else>
            <el-button type="success" class="vbutton" @click="reset_Password"
              >重置</el-button
            >
            <el-button type="success" class="vbutton" @click="send_Forgot_Email"
              >发射验证码</el-button
            >
          </div>
        </div>
        <div class="big-contain" v-else>
          <div class="btitle">创建账户</div>
          <div class="bform">
            <input
              type="email"
              placeholder="邮箱"
              v-on:input="clear_errTip"
              v-model="form.email"
            />
            <span class="errTips" v-if="email_existed">* 邮箱已被占用 *</span>
            <input type="password" placeholder="密码" v-model="form.password" />
            <input type="text" placeholder="用户名" v-model="form.username" />
            <input
              type="number"
              maxlength="4"
              v-on:input="is_Verify_Full"
              placeholder="验证码"
              v-model="form.verify"
            />
          </div>
          <div>
            <transition name="slide-fade">
              <el-button
                type="primary"
                class="vbutton"
                v-show="is_Show_Register_Btn"
                @click="register"
                >注册</el-button
              >
            </transition>
            <el-button
              type="success"
              class="vbutton"
              v-if="!countDown"
              @click="send_Email"
              >发射验证码</el-button
            >
            <el-button type="info" disabled="disabled" v-else="countDown"
              >已发射 {{ countDown }}s</el-button
            >
          </div>
        </div>
      </div>
      <div class="small-box" :class="{ active: isLogin }">
        <div class="small-contain" v-if="isLogin">
          <div class="stitle">
            <img src="../../../public/logo_white.png" style="width: 7rem" />
          </div>
          <p class="scontent">开始注册，和Vwok一起飞行</p>
          <button class="sbutton" @click="changeType">注册</button>
          <br />
          <button class="sbutton" @click="switch_isForgot">
            {{ btn_text }}
          </button>
        </div>
        <div class="small-contain" v-else>
          <div class="stitle">你好，朋友!</div>
          <p class="scontent">早点睡觉</p>
          <button class="sbutton" @click="changeType">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  net_Register,
  net_Send_Register_Email,
  net_Login,
  net_Send_Forgot_Email,
  net_Reset_Password,
} from "network/Net_User.js";
import { log } from "util";

export default {
  name: "login-register",
  data() {
    return {
      isForgot: true,
      isLogin: true,
      Login_Error_Tip: false,
      email_existed: false,
      form: {
        username: "",
        email: "",
        password: "",
        verify: "",
      },
      countDown: 0,
      is_Show_Register_Btn: false,
      btn_text: "忘记密码",
    };
  },
  methods: {
    async reset_Password() {
      let { email, password, verify } = this.form;
      if ((email == "", password == "", verify == "")) {
        return this.alert_No_Null();
      }
      let { msg, code } = await net_Reset_Password({
        email,
        password,
        verify,
      });
      if (code == 200) {
        this.alert_Success(msg);
        this.isForgot = !this.isForgot;
      } else {
        this.alert_Warn(msg);
      }
    },
    async send_Forgot_Email() {
      if (!this.check_Email()) return false;
      let { email } = this.form;

      if (email == "") return this.alert_No_Null();

      let { msg, code } = await net_Send_Forgot_Email({
        email,
      });
      this.set_Count_Down();
      code == 200 ? this.alert_Success(msg) : this.alert_Warn(msg);
    },
    switch_isForgot() {
      let text1 = "忘记密码",
        text2 = "登录";
      this.isForgot = !this.isForgot;
      this.isForgot ? (this.btn_text = text1) : (this.btn_text = text2);
    },
    clear_errTip() {
      // 清除错误提示
      this.email_existed = false;
    },
    is_Verify_Full() {
      // 到达4位就不让输了
      let { verify } = this.form;
      // 限制长度
      if (verify > 4) this.form.verify = verify.slice(0, 4);
      this.form.verify.length == 4
        ? (this.is_Show_Register_Btn = true)
        : (this.is_Show_Register_Btn = false);
    },
    changeType() {
      // 切换登录/注册状态
      this.isLogin = !this.isLogin;
    },
    check_Email() {
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (this.form.email != "" && !regEmail.test(this.form.email)) {
        this.alert_Warn("邮箱格式不正确");
        return false;
      }
      // bug 待调整
      return true;
    },
    set_Count_Down() {
      this.countDown = 5;
      let timer = setInterval(() => {
        this.countDown--;
        if (this.countDown === 0) {
          clearInterval(timer);
        }
      }, 1000);
    },
    async send_Email() {
      if (!this.check_Email()) return false;

      let { email } = this.form;

      if (email == "") return this.alert_No_Null();

      let { msg, code } = await net_Send_Register_Email({
        email,
      });
      this.set_Count_Down();
      code == 200 ? this.alert_Success(msg) : this.alert_Warn(msg);
    },
    async login() {
      if (!this.check_Email()) return false;

      let { email, password } = this.form;
      if (email == "" && password == "") return this.alert_No_Null();
      let { msg, code, User_Info ,Token } = await net_Login({
        email,
        password,
      });

      if (code == 200) {
        this.$store.dispatch("set_Token", Token);
        this.$store.dispatch("rewriteUserInfo", User_Info);
		
		
		this.$store.dispatch("")
        this.alert_Success(msg);
        this.$router.replace('/frame/woklist')
      } else {
        this.Login_Error_Tip = true;
        this.alert_Warn(msg);
      }
    },
    async register() {
      const { username, password, verify, email } = this.form;

      if (username == "" && email == "" && password == "" && verify == "")
        return this.alert_No_Null();

      let { msg, code } = await net_Register({
        username,
        password,
        verify,
        email,
      });
      console.log(msg, code);
      if (code == 200) {
        this.alert_Success(msg);
        this.changeType();
      } else {
        this.alert_Warn(msg);
      }
    },
    alert_Success(msg) {
      this.$notify({
        title: "登录/注册提示",
        message: msg,
        type: "success",
        position: "top-left",
      });
    },
    alert_Warn(msg) {
      this.$notify({
        title: "警告",
        message: msg,
        type: "warning",
        position: "top-left",
      });
    },
    alert_No_Null() {
      this.$notify({
        title: "提示",
        message: `填写不能为空！`,
      });
    },
  },
};
</script>

<style scoped="scoped">
.login-register {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}

* {
  font-family: "PingFangSC-Regular", "PingFang SC", core_sans_n45_regular,
    "Avenir Next", "Helvetica Neue", Helvetica, Arial, "Source Han Sans SC",
    "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi MicroHei", sans-serif;
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
  box-shadow: 0 0 3px #f0f0f0, 1px 4px 20px 17px #d6d6d640;
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
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(109 182 202);
}

.bform {
  width: 100%;
  height: 10rem;
  padding: 0 0 0.4rem 0 !important;
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
  width: 8rem;
  border-radius: 1.125rem;
  background-color: #6db6ca;
  border-color: #6db6ca;
}

.vbutton:hover {
  box-shadow: 0px 0.5px 10px 1px #534c4c17;
  opacity: 0.7;
}

.small-box {
  width: 30%;
  height: 100%;
  background: linear-gradient(144deg, #5293c7, #8ceac5);
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
  line-height: 2.2rem;
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
