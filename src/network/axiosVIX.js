import axios from 'axios'
import qs from 'qs'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 改写post请求的参数
axios.defaults.transformRequest = data => qs.stringify(data);
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true; //开启携带session



const url1 = 'http://192.168.1.105:3066'
const url2 = 'http://120.79.171.194:3066'

// switch (process.env.NODE_ENV) {
// 	case "production":
// 		axios.defaults.baseURL = url2
// 		break;
// 	default:
// 		axios.defaults.baseURL = url1
// }


export function VIX(config) {
	const Axios_Vix = axios.create({
		baseURL: url1
	})

	// 请求拦截器 发请求 -> [请求拦截] -> 服务器
	Axios_Vix.interceptors.request.use(config => {
		// 携带token访问后台
		let token = localStorage.getItem('token')
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
			if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
				// vant.Notify('请求超时')
				return Promise.reject(error); // reject这个错误信息
			}
			let {
				response
			} = error
			if (response) {
				// 虽错误-至少返回结果了
				switch (response.status) {
					case 401: // 权限不足
						break;
					case 403: // 服务器拒绝执行，无token
						break;
					case 404: // 无页面
						break;
				}
			} else {
				if (!window.navigator.onLine) { // 返回值都没有 断网处理:去断网页面
					if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
						// vant.Notify('请求超时')
						return Promise.reject(error); // reject这个错误信息
					}

				}
			}
		})

	// 3.发送真正的网络请求
	return Axios_Vix(config)
}
