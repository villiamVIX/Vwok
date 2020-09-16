import axios from 'axios'
axios.defaults.withCredentials = true; //开启携带session
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 800;



const url1 = 'http://192.168.1.102:3066'
const url2 = 'http://120.79.171.194:3066'


export function VIX(config) {
	const VIX1 = axios.create({
		baseURL: url1,
		timeout: 5000
	})

	// 拦截器转换返回值的data
	VIX1.interceptors.request.use(config => {
		return config
	}, err => {
		// console.log(err)
	})

	/**
	 * 添加响应拦截器
	 *  成功回调: 成功的结果不再是response, 而是response.data
	 *  失败回调: 统一处理请求异常
	 */
	VIX1.interceptors.response.use(
		res =>res.data,
		error => {
			if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
				  // vant.Notify('请求超时')
			      return Promise.reject(error);          // reject这个错误信息
			    }
			console.log(error.response)
			switch (error.response.status) {
				case 404:
					// vant.Notify('提示')
					break;
				case 500:
					// vant.Notify('服务器裂开了')
					break;
				case 401:
					// vant.Notify('未登录')
					break;	
				case 403:
					// vant.Notify('权限不足')
					break;
				case 406:
					// vant.Toast('做不到哦')
					break;	
				case 408:
					// vant.Toast('识别失败，请重试')
					break;		
				case 409:
					// vant.Toast('会员过期，请充值！')
					break;
				case 413:
					// vant.Toast('文件过大，4M以下')
					break;	
			}
			 return new Promise(() => { }) // 返回一个pedding状态的promise
		})

		// 3.发送真正的网络请求
		return VIX1(config)
	}
