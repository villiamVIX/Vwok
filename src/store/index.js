import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// modules子模块
import common from './modules/common'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		User: {}
	},
	
	actions: actions,
	mutations: mutations,
	getters: getters,
	modules: {
		common
	}
})
