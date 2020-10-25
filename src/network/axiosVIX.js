import axios from 'axios'
import qs from 'qs'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 改写post请求的参数
axios.defaults.transformRequest = data => qs.stringify(data);
axios.defaults.timeout = 15000;
axios.defaults.withCredentials = true; //开启携带session

import Vue from 'vue';
import ElementUI from 'element-ui';

const url1 = 'http://192.168.1.105:4009'
const url2 = 'http://120.79.171.194:4009'
const url3 = 'http://localhost:4009'

// switch (process.env.NODE_ENV) {
// 	case "production":
// 		axios.defaults.baseURL = url2
// 		break;
// 	default:
// 		axios.defaults.baseURL = url1
// }


export function VIX(config) {
	const Axios_Vix = axios.create({
		baseURL: url3
	})

	// 请求拦截器 发请求 -> [请求拦截] -> 服务器
	Axios_Vix.interceptors.request.use(config => {
		// 携带token访问后台
		let token = localStorage.getItem('Token')
		token && (config.headers.Authorization = token)
		return config
	}, error => {
		// console.log(err)
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
				console.log('timeoutututututututu')
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
						console.log(Vue)
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
