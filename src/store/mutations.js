import {
	REWRITE_USERINFO,
	SET_TOKEN,
	CLEAR_TOKEN
} from './mutations-type'


export default {
	[REWRITE_USERINFO](state, info) {
		console.log(info)
		state.User = info;
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
