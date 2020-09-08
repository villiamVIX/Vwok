import {
	REWRITE,
} from './mutations-type'

export default{
	rewriteUserInfo({commit},info){  //注册时用户信息插入
			commit(REWRITE,info)
	},
	async reqLastUserInfo({commit}){  //更新用户信息
	        let res= getLastUserInfo()
			commit(REWRITE,res)
	}
}
