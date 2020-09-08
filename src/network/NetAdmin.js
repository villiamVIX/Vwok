import {VIX} from './axiosVIX'

export function getAdminNewsChart(data){ //贴吧流量监控
	return VIX({
		url:'/admin/analysis/pubilsh',
		params:{
			data
		}
	})
}


export function getNewsTop(data){ //贴吧流量监控
	return VIX({
		url:'/admin/news/top',
		params:{
			data
		}
	})
}

export function deleteSwiper(data){ //删除轮播图
	return VIX({
		url:'/admin/swiper/delete',
		params:{
			data
		}
	})
}


export function getAdminEntranceChart(data){ //进场流量监控
	return VIX({
		url:'/admin/analysis/entrance',
		params:{
			data
		}
	})
}


export function getAdminUserTable(){ //人员管理
	return VIX({
		url:'/admin/user'
	})
}

export function deleteUser(data){ //删除会员
	return VIX({
		url:'/admin/delete/user',
		method:'delete',
		data:{data:data},
		timeout:3000,
	})
}


export function getAdminCoachTable(){ //教练管理
	return VIX({
		url:'/admin/coach',
		timeout:3000,
	})
}


export function getAdminCoachPie(data){ //教练业绩
	return VIX({
		url:'/admin/analysis/coach',
		timeout:3000,
		params:{
			data
		}
	})
}

export function upDateCoach(data){ //教练资料修改
	return VIX({
		url:'/admin/update/coach',
		method:'post',
		timeout:3000,
		data:data
	})
}

export function deleteCoach(data){ //删除教练
	return VIX({
		url:'/admin/delete/coach',
		method:'delete',
		data:{data:data},
		timeout:3000,
	})
}

export function createCoach(data){//新增教练
	return VIX({
		url:'/admin/create/coach',
		method:'post',
		timeout:3000,
		contentType:false,
		processData:false,
		data:data,
	})
}

export function addSwiper(data){//新增教练
	return VIX({
		url:'/admin/swiper/add',
		method:'post',
		timeout:3000,
		contentType:false,
		processData:false,
		data:data,
	})
}


export function getAdminLessonTable(){ //课程管理
	return VIX({
		url:'/admin/lesson'
	})
}


export function postAdminLessonUpdate(data){ //课程管理
	return VIX({
		url:'/admin/lesson/update',
		method:'post',
		data:data
	})
}


export function bindCoachPhone(data){ //绑定教练电话
	return VIX({
		url:'/admin/coach/bind',
		params:data
	})
}

