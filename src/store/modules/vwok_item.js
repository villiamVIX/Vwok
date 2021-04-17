const state = {
	isShow_Export: false,
	export_Text: [],
	checked: {
		isShow_DelConfirm: false,
		checked_items: []
	}
}

const mutations = {
	Rewrite_export_Text: (state, data) => {
		state.export_Text = data
	},
	VISIBLE_EXPORT: (state, data) => {
		state.isShow_Export = data
	},
	VISIBLE_DELETE_CONFIRM: (state, data) => {
		state.checked.isShow_DelConfirm = data
	},

}

const actions = {
	async Rewrite_export_Text({commit}, data) {
		commit('Rewrite_export_Text', data)
	},
	Visible_Export({commit}, data) {
		commit('VISIBLE_EXPORT', data)
	},
	Visible_Delete_Confirm({commit}, data) {
		commit('VISIBLE_DELETE_CONFIRM', data)
	},
}
const getters = {
	export_Text: (state) => state.export_Text,
	isShow_Export: (state) => state.isShow_Export,
	isShow_DelConfirm: (state) => state.checked.isShow_DelConfirm
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
