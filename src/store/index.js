import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// modules子模块
import common from './modules/common'

Vue.use(Vuex)


const state = {
	User: {},
	Token: ''
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters,
	modules: {
		common
	}
})
