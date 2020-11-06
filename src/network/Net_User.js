import {
	VIX
} from './axiosVIX'


export async function net_Register({username,password,verify,email}) { //注册
	let res = await VIX({
		url: '/user/register',
		method: 'post',
		data: {
			username,password,verify,email
		}
	})
	
	return res
}

export async function net_Send_Register_Email({email}) { //注册邮件
	let res = await VIX({
		url: '/user/register/email',
		method: 'post',
		data: {
			email
		}
	})
	return res
}

export async function net_Send_Forgot_Email({email}) { //重置密码邮件
	let res = await VIX({
		url: '/user/forgot/email',
		method: 'post',
		data: {
			email
		}
	})
	return res
}

export async function net_Reset_Password({email,password,verify}) { //重置密码
	let res = await VIX({
		url: '/user/forgot/reset/password',
		method: 'post',
		data: {
			email,password,verify
		}
	})
	return res
}

export async function net_Login({email,password}) { //登录
	let res = await VIX({
		url: '/user/login',
		method: 'post',
		data: {
			email,password
		}
	})
	return res
}

export async function net_TokenLogin() { //Token登录
	let res = await VIX({
		url: '/user/tokenlogin',
		method: 'post',
	})
	return res
}
