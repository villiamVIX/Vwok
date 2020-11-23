const state = {
	vwok_items: []
}

const mutations = {
	Rewrite_Items: (state, data) => {
		state.vwok_items = data
	},

}

const actions = {
	Rewrite_Items({commit}, data) {
		console.log(data)
		commit('Rewrite_Items', data)
	},

}
const getters = {
	vwok_items: (state) => state.vwok_items,
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
