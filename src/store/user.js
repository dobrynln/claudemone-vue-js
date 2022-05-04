import firebase from "firebase/compat/app";
class User {
  constructor(id) {
    this.id = id;
  }
}
export default {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async regUser({ commit }, { email, userPassword }) {
      commit("clearErr");
      commit("setLoading", true);

      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, userPassword);
        commit("setUser", new User(user.user.uid));
        commit("setLoading", false);
      } catch (e) {
        commit("setLoading", false);
        commit("setError", e);
        throw e;
      }
    },
    async changeEmail({ commit }, { email }) {
      commit("clearErr");
      commit("setLoading", true);

      try {
        await firebase.auth().currentUser.updateEmail(email);
        commit("setLoading", false);
      } catch (e) {
        commit("setLoading", false);
        commit("setError", e);
        throw e;
      }
    },
    async changePassword({ commit }, { password }) {
      commit("clearErr");
      commit("setLoading", true);

      try {
        await firebase.auth().currentUser.updatePassword(password);
        commit("setLoading", false);
      } catch (e) {
        commit("setLoading", false);
        commit("setError", e);
        throw e;
      }
    },
    async loginUser({ commit }, { email, userPassword }) {
      commit("clearErr");
      commit("setLoading", true);

      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(email, userPassword);
        commit("setUser", new User(user.user.uid));
        commit("setLoading", false);
      } catch (e) {
        commit("setLoading", false);
        commit("setError", e);
        throw e;
      }
    },
    autoLoginUser({ commit }, payload) {
      commit("setUser", new User(payload.uid));
    },
    logoutUser({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    isUserLoggedIn(state) {
      return state.user !== null;
    },
  },
};
