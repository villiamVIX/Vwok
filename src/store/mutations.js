import {
	REWRITE
	
} from './mutations-type'


export default {
	[REWRITE](state, info) {
		console.log(info)
		state.User = info;
	}
}
