import axios from 'axios'
// 初始化后端接口
require('../../public/static/js/config.js')
// 改写post请求的参数, { indices: false }
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 8000;
axios.defaults.withCredentials = true; //开启携带session

import Vue from 'vue';
import ElementUI from 'element-ui';
// import {baseURL} from '../../public/static/js/config.js'

// const url2 = 'http://v.coderv.cn:3009'
// const url3 = 'http://localhost:3009'

const {baseURL} = window.apiUrl

export function VIX(config) {
	const Axios_Vix = axios.create({
		baseURL
	})

	// 请求拦截器 发请求 -> [请求拦截] -> 服务器
	Axios_Vix.interceptors.request.use(config => {
		// 携带token访问后台
		let token = localStorage.getItem('Token')
		token && (config.headers.Authorization = token)
		return config
	}, error => {
		return Promise.reject(error)
	})

	/**
	 * 添加响应拦截器
	 *  成功回调: 成功的结果不再是response, 而是response.data
	 *  失败回调: 统一处理请求异常
	 */
	Axios_Vix.interceptors.response.use(
		res => res.data,
		error => {
			console.log(error)
			if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
				ElementUI.Message.error('请求超时')
				return Promise.reject(error); // reject这个错误信息
			}
			let {
				response
			} = error
			if (response) {
				// 虽错误-至少返回结果了
				switch (response.status) {
					case 401:
						ElementUI.Message({
							message: '登录超时，访问权限不足',
							type: 'warning'
						})
						window.localStorage.clear()
						window.sessionStorage.clear()
						window.location.href='/login'
						break;
					case 403: // 服务器拒绝执行，无token
						break;
					case 404:
						ElementUI.Message({
							message: '调用错误接口',
							type: 'warning'
						});
						break;
				}
				return new Promise(() => { }) // 返回一个pedding状态的promise
			} else {
				if (!window.navigator.onLine) { // 返回值都没有 断网处理:去断网页面
					ElementUI.Message.error('请求超时，请检查您的网络')
					return Promise.reject(error); // reject这个错误信息
				}
			}
		})

	// 3.发送真正的网络请求
	return Axios_Vix(config)
}
