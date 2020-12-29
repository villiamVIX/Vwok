const state = {
	isShow_Export: false,
	export_Text: [],
}

const mutations = {
	Rewrite_export_Text: (state, data) => {
		state.export_Text = data
	},
	VISIBLE_EXPORT:(state,data)=>{
		state.isShow_Export=data
	}
}

const actions = {
	async Rewrite_export_Text({commit}, data) {
		commit('Rewrite_export_Text', data)
	},
	Visible_Export({commit},data){
		commit('VISIBLE_EXPORT',data)
	}
}
const getters = {
	export_Text: (state) => state.export_Text,
	isShow_Export: (state) => state.isShow_Export,
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
