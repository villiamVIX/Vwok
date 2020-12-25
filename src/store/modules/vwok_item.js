const state = {
	isShow_Export: false,
	export_Estimate_Text: [],
	export_Actual_Text: []
}

const mutations = {
	REWRITE_EXPORT_ESTIMATE_TEXT: (state, data) => {
		state.export_Estimate_Text = data
	},
	REWRITE_EXPORT_ACTUAL_TEXT: (state, data) => {
		state.export_Actual_Text = data
	},
	VISIBLE_EXPORT:(state,data)=>{
		state.isShow_Export=data
	}
}

const actions = {
	async Rewrite_export_Estimate_Text({commit}, data) {
		commit('REWRITE_EXPORT_ESTIMATE_TEXT', data)
	},
	Rewrite_export_Actual_Text({commit}, data) {
		commit('REWRITE_EXPORT_ACTUAL_TEXT', data)
	},
	Visible_Export({commit},data){
		commit('VISIBLE_EXPORT',data)
	}
}
const getters = {
	export_Estimate_Text: (state) => state.export_Estimate_Text,
	export_Actual_Text: (state) => state.export_Actual_Text,
	isShow_Export: (state) => state.isShow_Export,
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
