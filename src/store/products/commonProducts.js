import axios from "axios";

export default {
  state: {
    snacks: [],
    salads: [],
    cart: [],
    productsAll: [],
    productsSale: [],
  },
  mutations: {
    SET_PRODUCTS_SNACKS(state, snacks) {
      state.snacks = snacks;
    },
    SET_PRODUCTS_SALADS(state, salads) {
      state.salads = salads;
    },
    SET_CART(state, product) {
      if (state.cart.length) {
        let isProduct = false;
        state.cart.map((item) => {
          if (item.article === product.article) {
            isProduct = true;
            item.quantity++;
          }
        });
        if (!isProduct) {
          state.cart.push(product);
        }
      } else {
        state.cart.push(product);
      }
    },
    REMOVE_FROM_CART(state, index) {
      state.cart.splice(index, 1);
    },
    INCREMENT(state, index) {
      state.cart[index].quantity++;
    },
    DECREMENT(state, index) {
      if (state.cart[index].quantity > 1) {
        state.cart[index].quantity--;
      }
    },
    PRODUCTVIEW(state, payload) {
      state.productsAll = payload;
    },
    SALEPRODUCTS(state, payload) {
      state.productsSale = payload;
    },
  },
  actions: {
    async productMenu({ commit }, url) {
      commit("setLoading", true);
      console.log("Идет");
      try {
        commit("setLoading", false);
        let res = await axios.get(url).then((response) => {
          commit("setLoading", false);
          console.log(response);
          commit("PRODUCTVIEW", response.data.Products);
        });
        return res;
      } catch (e) {
        commit("setLoading", false);
        console.log(e);
        return e;
      }
    },
    async getAllProducts({ commit }) {
      commit("setLoading", true);
      console.log("Идет");
      try {
        commit("setLoading", false);
        let res = await axios
          .get("http://dobrynin-rest.ru/AllProducts.json")
          .then((response) => {
            commit("setLoading", false);
            commit("PRODUCTVIEW", response.data.Products);
          });
        return res;
      } catch (e) {
        commit("setLoading", false);
        console.log(e);
        return e;
      }
    },
    async getPromoProducts({ commit }) {
      commit("setLoading", true);
      console.log("Идет");
      try {
        commit("setLoading", false);
        let res = await axios
          .get("http://dobrynin-rest.ru/AllProducts.json")
          .then((response) => {
            commit("setLoading", false);
            commit("SALEPRODUCTS", response.data.Products);
          });
        return res;
      } catch (e) {
        commit("setLoading", false);
        console.log(e);
        return e;
      }
    },
    addToCart({ commit }, product) {
      commit("SET_CART", product);
    },
    deleteFromCart({ commit }, index) {
      commit("REMOVE_FROM_CART", index);
    },
    incrementItem({ commit }, index) {
      commit("INCREMENT", index);
    },
    decrementItem({ commit }, index) {
      commit("DECREMENT", index);
    },
    productView({ commit }) {
      commit("PRODUCTVIEW");
    },
  },
  getters: {
    snacksProducts(state) {
      return state.snacks;
    },
    saladsProducts(state) {
      return state.salads;
    },
    productById(state) {
      return (productId) => {
        return state.productsAll.find((product) => {
          if (product !== undefined) {
            return product.id === productId;
          } else {
            console.log("Ошибка с получением данных");
          }
        });
      };
    },
    cartProducts(state) {
      return state.cart;
    },
    lengthProducts(state) {
      return state.productsAll;
    },
    promoProduct(state) {
      return state.productsSale.filter((product) => {
        return product.sale === true;
      });
    },
  },
};
