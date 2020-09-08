

const state = {
  sidebar: true
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar = !state.sidebar
  },
  CLOSE_SIDEBAR: (state) => {
    state.sidebar= false
  },
  
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }) {
    commit('CLOSE_SIDEBAR')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
