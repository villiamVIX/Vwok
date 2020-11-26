const state = {
	vwok_items: [],
	current_wok:''
}

const mutations = {
	Rewrite_Items: (state, data) => {
		state.vwok_items = data
	},
	Rewrite_Current_Wok_Id: (state, data) => {
		state.current_wok = data
	},
}

const actions = {
	Rewrite_Items({commit}, data) {
		console.log(data)
		commit('Rewrite_Items', data)
	},
	Rewrite_Current_Wok_Id({commit},data){
		commit('Rewrite_Current_Wok_Id', data)
	}
}
const getters = {
	vwok_items: (state) => state.vwok_items,
	current_wok:(state) => state.current_wok
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
