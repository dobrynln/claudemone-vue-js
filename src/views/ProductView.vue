<template>
  <div class="block-view">
    <div class="loader" v-if="!loading"></div>
    <div class="view-content" v-if="loading">
      <h3 class="title-view">Вам также может понравиться:</h3>
      <app-slider></app-slider>
      <div class="view">
        <div class="view-left">
          <img
            class="view-left__image"
            :src="productThis.image"
            alt="Фото товара"
          />
        </div>
        <div class="view-right">
          <h3 class="view-right__title-h3">{{ productThis.title }}</h3>
          <p class="view-right__descr">{{ productThis.description }}</p>
          <ul class="view-right__list">
            <li
              class="view-right__list-item"
              v-for="item in productThis.structure"
              :key="item"
            >
              {{ item }}
            </li>
          </ul>
          <div class="view-right__buttons">
            <button class="btn-orange" @click="addCartProductView(productThis)">
              В корзину
            </button>
            <router-link class="btn-cancel" to="/">На главную</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Slider from "../components/Slider";
export default {
  name: "app-settings",
  props: ["id"],
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapGetters["lengthProducts"],
    productThis() {
      const id = this.id;
      return this.$store.getters.productById(id);
    },
  },
  methods: {
    ...mapActions(["getAllProducts", "addToCart", "getPromoProducts"]),
    addCartProductView(data) {
      this.addToCart(data);
    },
  },
  mounted() {
    this.getAllProducts();
    this.getPromoProducts();
  },
  components: {
    "app-slider": Slider,
  },
  created() {
    setTimeout(() => {
      this.loading = true;
    }, 1000);
  },
};
</script>
