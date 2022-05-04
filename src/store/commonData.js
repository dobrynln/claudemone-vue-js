export default {
  state: {
    loading: false,
    error: null,
    showCarts: false,
    showDialog: false,
    changePassword: false,
    changeEmail: true,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearErr(state) {
      state.error = null;
    },
    setShowCart(state) {
      state.showCarts = !state.showCarts;
    },
    setShowDialog(state) {
      state.showDialog = !state.showDialog;
      if (state.showDialog === true) {
        document.querySelector("body").classList.add("active-modal");
      } else {
        document.querySelector("body").classList.remove("active-modal");
      }
    },
    setChangePassword(state) {
      state.changePassword = !state.changePassword;
    },
    setChangeEmail(state) {
      state.changeEmail = !state.changeEmail;
    },
  },
  actions: {
    setLoading({ commit }, payload) {
      commit("setLoading", payload);
    },
    setError({ commit }, payload) {
      commit("setError", payload);
    },
    clearErr({ commit }) {
      commit("clearErr");
    },
    setShowCart({ commit }) {
      commit("setShowCart");
    },
    setShowDialog({ commit }) {
      commit("setShowDialog");
    },
    setChangePassword({ commit }) {
      commit("setChangePassword");
    },
    setChangeEmail({ commit }) {
      commit("setChangeEmail");
    },
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    showFlagCart(state) {
      return state.showCarts;
    },
    showFlagDialog(state) {
      return state.showDialog;
    },
    changeFlagPassword(state) {
      return state.changePassword;
    },
    changeFlagEmail(state) {
      return state.changeEmail;
    },
  },
};
