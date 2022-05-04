import Vue from "vue";
import Vuex from "vuex";
//Product
import Products from "../store/products/commonProducts";
//
import user from "../store/user";
import commonData from "../store/commonData";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { Products, user, commonData },
});
