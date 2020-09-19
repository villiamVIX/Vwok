import {
	VIX
} from './axiosVIX'

export function create_New_VWOK(data) { //新建任务
	return VIX({
		url: '/vwok/create',
		method: 'post',
		timeout: 3000,
		data: data
	})
}

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

export async function net_Send_Email({email}) { //新建任务
	let res = await VIX({
		url: '/user/email',
		method: 'post',
		data: {
			email
		}
	})
	
	return res
}
