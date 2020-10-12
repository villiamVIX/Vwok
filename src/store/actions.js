import {
	REWRITE_USERINFO,
	SET_TOKEN,
	CLEAR_TOKEN
} from './mutations-type'

export default{
	rewriteUserInfo({commit},info){  //注册时用户信息插入
		commit(REWRITE_USERINFO,info)
	},
	async reqLastUserInfo({commit}){  //更新用户信息
	    let res= getLastUserInfo()
		commit(REWRITE_USERINFO,res)
	},
	set_Token({commit},token){
		commit(SET_TOKEN,token)
	},
	log_Out({commit}){
		commit(CLEAR_TOKEN)
	}
}
