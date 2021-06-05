const state = {
	vwok_items: [],
	current_wok_id:'',
	isReload:false
}

const mutations = {
	Rewrite_Items: (state, data) => {
		state.vwok_items = data
	},
	Rewrite_Current_Wok_Id: (state, data) => {
		state.current_wok_id = data
	},
	REQ_RELOAD: (state, data) => {
		state.isReload = data
	},
}

const actions = {
	Rewrite_Items({commit}, data) {
		commit('Rewrite_Items', data)
	},
	Rewrite_Current_Wok_Id({commit},data){
		commit('Rewrite_Current_Wok_Id', data)
	},
	Req_Reload({commit},data){		
		commit('REQ_RELOAD', data)
	}
}
const getters = {
	vwok_items: (state) => state.vwok_items,
	current_wok_id:(state) => state.current_wok_id,
	isReload:(state) => state.isReload,
	
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
