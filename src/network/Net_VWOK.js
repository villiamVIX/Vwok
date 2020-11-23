import {VIX} from './axiosVIX'

export function create_New_VWOK(data){ //新建任务
	return VIX({
		url:'/vwok/create',
		method:'post',
		data
	})
}

export async function get_Teammmate(){ //获取个人任务
    return await VIX({
		url:'/vwok/teammate',
	})
	
}

export async function get_My_VWOK(data){ //获取个人任务
let {currentPage,uid,limit} = data
    let res = await VIX({
		url:'/vwok/woklist',
		params:{
			uid,
			currentPage,
			limit
		}
	})
	return res
}



