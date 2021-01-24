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

export async function Update_Vwok_Name(data){ //更新工项名
    return await VIX({
		url:'/vwok/update/vwokname',
		method:'post',
		data
	})
}

export async function End_Vwok(vwok_id){ //终结工项
    return await VIX({
		url:'/vwok/end/vwok',
		method:'post',
		data:{vwok_id}
	})
}

