<template>
  <div class="item-product product-hot">
    <div class="item-product__box">
      <img
        :src="product_data.image"
        alt="Фото товара"
        class="item-product__image"
      />
    </div>
    <div class="item-product__information">
      <div class="item-product__information-middle">
        <span class="item-product__information-middle__title">{{
          product_data.title
        }}</span>
        <span class="item-product__information-middle__price"
          >{{ product_data.price }}₽</span
        >
      </div>

      <div class="item-product__buttons">
        <v-btn class="btn btn-product" @click="addCartProduct">В корзину</v-btn>
        <v-btn class="btn btn-product" :to="'/product/' + product_data.id"
          >Посмотреть</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-item",
  props: {
    product_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data: () => ({}),
  methods: {
    addCartProduct() {
      this.$emit("addCartProduct", this.product_data);
    },
  },
};
</script>
