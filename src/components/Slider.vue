<template>
  <vueper-slides
    class="no-shadow slider-products"
    :visible-slides="6"
    :slide-ratio="1 / 12"
    :gap="4"
    :bullets="false"
    :infinity="true"
    :touchable="false"
    :breakpoints="breakpoints"
  >
    <vueper-slide v-for="item in promoProduct" :key="item.id">
      <template #content>
        <div class="vueperslide__content-wrapper">
          <div class="vueperslide-image">
            <img :src="item.image" alt="Фото продукта" />
          </div>
          <div class="vueperslide-bottom">
            <div class="vueperslide-bottom__content">
              <span class="vueperslide-bottom__price">{{ item.price }}₽</span>
              <v-btn class="btn btn-product" :to="'/product/' + item.id"
                >Посмотреть</v-btn
              >
            </div>
          </div>
        </div>
      </template>
    </vueper-slide>
  </vueper-slides>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "../../node_modules/vueperslides/dist/vueperslides.css";
import { mapGetters } from "vuex";
export default {
  components: { VueperSlides, VueperSlide },
  data: () => ({
    autoPlaying: true,
    internalAutoPlaying: true,
    breakpoints: {
      767: {
        visibleSlides: 2,
        slideRatio: 1 / 4,
        arrows: false,
        touchable: true,
        draggingDistance: 140,
      },
      560: {
        visibleSlides: 2,
        slideRatio: 1 / 3,
        arrows: false,
        touchable: true,
        draggingDistance: 140,
      },
      991: {
        visibleSlides: 3,
        slideRatio: 1 / 5,
        arrows: false,
        touchable: true,
        draggingDistance: 140,
      },
      1440: {
        visibleSlides: 5,
        slideRatio: 1 / 8,
        arrows: false,
        touchable: true,
        draggingDistance: 140,
      },
    },
  }),
  computed: {
    ...mapGetters(["promoProduct"]),
  },
  created() {
    console.log(this.promoProduct);
  },
};
</script>
