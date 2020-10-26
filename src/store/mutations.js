import {
	REWRITE_USERINFO,
	SET_TOKEN,
	CLEAR_TOKEN
} from './mutations-type'


export default {
	[REWRITE_USERINFO](state, info) {
		state.UserInfo = info;
		let UserInfo=JSON.stringify(info)
		window.sessionStorage.setItem("UserInfo",UserInfo)
	},
	[SET_TOKEN](state,token){
		state.Token = token 
		localStorage.Token = token
	},
	
	[CLEAR_TOKEN](state){
		state.Token=''
		localStorage.Token=''
	}
}
