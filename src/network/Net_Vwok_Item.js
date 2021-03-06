import {
	VIX
} from './axiosVIX'

export function create_New_Vwok_Item(data) { //新建任务
	return VIX({
		url: '/vwok/item/create',
		method: 'post',
		data
	})
}

export async function get_Teammmate() { //获取个人任务
	return await VIX({
		url: '/vwok/teammate',
	})
}

export async function get_My_Vwok_Item(vwok_id) { //获取个人任务
	return await VIX({
		url: '/vwok/item/getitem',
		params: {
			vwok_id
		}
	})
}

export async function update_Vwok_Item(data) { //更新个人任务
	return await VIX({
		url: '/vwok/item/update',
		method: 'post',
		data:data
	})
}

// export async function update_Vwok_Item(vwok_item_id,data) { //更新个人任务
// 	return await VIX({
// 		url: '/vwok/item/update',
// 		method: 'post',
// 		data:{vwok_item_id,data}
// 	})
// }

export async function update_Vwok_Item_Today(data) { //更新个人任务-金日
	return await VIX({
		url: '/vwok/item/update/today',
		method: 'post',
		data:data
	})
}

export async function get_Today_Vwok(uid) { //获取今日预计
	return await VIX({
		url: '/vwok/item/todayvwok',
		params:{
			uid
		}
	})
}

