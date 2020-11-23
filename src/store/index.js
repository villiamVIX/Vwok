import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// modules子模块
import common from './modules/common'
import vwok from './modules/vwok'

Vue.use(Vuex)


const state = {
	UserInfo: JSON.parse(sessionStorage.getItem('UserInfo'))||{},
	Token: localStorage.getItem("Token") || ''
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters,
	modules: {
		common,
		vwok
	}
})
