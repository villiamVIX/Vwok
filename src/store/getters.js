export default {
  sidebar: (state) => state.common.sidebar,
  getToken(state) {
    if (!state.token) {
      state.token = localStorage.getItem("token");
    }
    return state.token;
  },
  username:(state) =>state.User.username
};
