<template>
  <div class="all-products">
    <div class="all-products__top">
      <div class="all-products__top-block">
        <div class="all-products__top-left">
          <div class="all-products__top-left__left">
            <router-link to="/" class="top-link__mobile">
              <img src="../assets/logotype.svg" alt="Logotype" />
            </router-link>
          </div>
          <div class="all-products__top-left__right">
            <h2 class="title-resto">Ресторан "Claude Mone"</h2>
            <span class="block-date">
              <div class="block-date__information">
                <span class="block-date__information-item"
                  >{{ dateToday }},
                </span>
                <span class="block-date__information-item"
                  >{{ countDay }}
                </span>
                <span class="block-date__information-item"
                  >{{ monthToday }}
                </span>
                <span class="block-date__information-item"
                  >{{ yearToday }},
                </span>
              </div>
              <div class="block-date__time">
                <span class="block-date__time-item"> {{ hours }} : </span>
                <span class="block-date__time-item">{{ minutes }} : </span>
                <span class="block-date__time-item">{{ seconds }} </span>
              </div>
            </span>
          </div>
        </div>
        <div class="all-products__top-right">
          <v-autocomplete
            v-model="model"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            hide-details
            hide-selected
            item-text="title"
            label="Поиск супов, салатов, закусок..."
            solo
            class="box-search"
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-title>
                  Начните ввод для поиска...
                </v-list-item-title>
              </v-list-item>
            </template>
            <template v-slot:item="{ item }">
              <v-list-item link :to="'product/' + item.id">
                <div class="autocomplete-box">
                  <img
                    :src="item.image"
                    alt="Фото"
                    class="autocomplete-box__image"
                  />
                </div>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                  <span class="price-autocomplete">{{ item.price }}₽</span>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-autocomplete>
        </div>
      </div>
      <app-slider v-if="flagShows"></app-slider>
    </div>
    <div class="products-tabs">
      <ul class="products-tabs__list">
        <li class="products-tabs__list-item">
          <a
            href="#"
            class="products-tabs__list-item__link"
            @click.prevent="setActive('Snacks')"
            @click="getsSnacks"
            :class="{ 'active-link': isActive('Snacks') }"
            >Закуски / Холодные закуски</a
          >
        </li>
        <li class="products-tabs__list-item">
          <a
            href="#"
            class="products-tabs__list-item__link"
            @click.prevent="setActive('Salads')"
            @click="getsSalades"
            :class="{ 'active-link': isActive('Salads') }"
            >Салаты</a
          >
        </li>
        <li class="products-tabs__list-item">
          <a
            href="#"
            class="products-tabs__list-item__link"
            @click.prevent="setActive('Soup')"
            @click="getsSoups"
            :class="{ 'active-link': isActive('Soup') }"
            >Супы</a
          >
        </li>
        <li class="products-tabs__list-item">
          <a
            href="#"
            class="products-tabs__list-item__link"
            @click.prevent="setActive('Grill')"
            @click="getsGrills"
            :class="{ 'active-link': isActive('Grill') }"
            >Гриль</a
          >
        </li>
        <li class="products-tabs__list-item">
          <a
            href="#"
            class="products-tabs__list-item__link"
            @click.prevent="setActive('HotDishes')"
            @click="getsDishes"
            :class="{ 'active-link': isActive('HotDishes') }"
            >Горячие блюда</a
          >
        </li>
        <li class="products-tabs__list-item">
          <a
            href="#"
            class="products-tabs__list-item__link"
            @click.prevent="setActive('Dessert')"
            @click="getsDessert"
            :class="{ 'active-link': isActive('Dessert') }"
            >Десерты</a
          >
        </li>
        <li class="products-tabs__list-item">
          <a
            href="#"
            class="products-tabs__list-item__link"
            @click.prevent="setActive('Drinks')"
            @click="getsDrinks"
            :class="{ 'active-link': isActive('Drinks') }"
            >Напитки</a
          >
        </li>
      </ul>
      <div class="mobile-navigation">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <button class="btn-orange btn-mobile" dark v-bind="attrs" v-on="on">
              Открыть меню
            </button>
          </template>
          <div>
            <ul class="products-tabs__list products-tabs__list-mobile">
              <li class="products-tabs__list-item">
                <a
                  href="#"
                  class="products-tabs__list-item__link"
                  @click.prevent="setActive('Snacks')"
                  @click="getsSnacks"
                  :class="{ 'active-link': isActive('Snacks') }"
                  >Закуски / Холодные закуски</a
                >
              </li>
              <li class="products-tabs__list-item">
                <a
                  href="#"
                  class="products-tabs__list-item__link"
                  @click.prevent="setActive('Salads')"
                  @click="getsSalades"
                  :class="{ 'active-link': isActive('Salads') }"
                  >Салаты</a
                >
              </li>
              <li class="products-tabs__list-item">
                <a
                  href="#"
                  class="products-tabs__list-item__link"
                  @click.prevent="setActive('Soup')"
                  @click="getsSoups"
                  :class="{ 'active-link': isActive('Soup') }"
                  >Супы</a
                >
              </li>
              <li class="products-tabs__list-item">
                <a
                  href="#"
                  class="products-tabs__list-item__link"
                  @click.prevent="setActive('Grill')"
                  @click="getsGrills"
                  :class="{ 'active-link': isActive('Grill') }"
                  >Гриль</a
                >
              </li>
              <li class="products-tabs__list-item">
                <a
                  href="#"
                  class="products-tabs__list-item__link"
                  @click.prevent="setActive('HotDishes')"
                  @click="getsDishes"
                  :class="{ 'active-link': isActive('HotDishes') }"
                  >Горячие блюда</a
                >
              </li>
              <li class="products-tabs__list-item">
                <a
                  href="#"
                  class="products-tabs__list-item__link"
                  @click.prevent="setActive('Dessert')"
                  @click="getsDessert"
                  :class="{ 'active-link': isActive('Dessert') }"
                  >Десерты</a
                >
              </li>
              <li class="products-tabs__list-item">
                <a
                  href="#"
                  class="products-tabs__list-item__link"
                  @click.prevent="setActive('Drinks')"
                  @click="getsDrinks"
                  :class="{ 'active-link': isActive('Drinks') }"
                  >Напитки</a
                >
              </li>
              <li class="products-tabs__list-item">
                <a href="https://vk.com/" class="products-tabs__list-item__link"
                  >Мы Вконтакте</a
                >
              </li>
              <li class="products-tabs__list-item">
                <a
                  href="https://www.youtube.com/"
                  class="products-tabs__list-item__link"
                  >Мы в Ютубе</a
                >
              </li>
            </ul>
          </div>
        </v-menu>
      </div>
      <div class="products-tabs__content">
        <div class="loader" v-if="!flagShows"></div>
        <div
          class="products-tabs__content-tab"
          :class="{ 'active-tab': isActive('Snacks') }"
          v-if="flagShows"
        >
          <div class="products-tabs__content-tab__list">
            <app-product
              v-for="(Snack, i) in productList"
              :key="i"
              :product_data="Snack"
              @addCartProduct="addCartProduct"
            />
          </div>
          <v-pagination
            class="pagination mb-2"
            v-model="page"
            :length="pages"
            @input="updatePage"
          ></v-pagination>
        </div>
        <div
          class="products-tabs__content-tab"
          :class="{ 'active-tab': isActive('Salads') }"
          v-if="flagShows"
        >
          <div class="products-tabs__content-tab__list">
            <app-product
              v-for="(Salad, i) in productList"
              :key="i"
              :product_data="Salad"
              @addCartProduct="addCartProduct"
            />
          </div>
          <v-pagination
            class="pagination mb-2"
            v-model="page"
            :length="pages"
            @input="updatePage"
          ></v-pagination>
        </div>
        <div
          class="products-tabs__content-tab"
          :class="{ 'active-tab': isActive('Soup') }"
          v-if="flagShows"
        >
          <div class="products-tabs__content-tab__list">
            <app-product
              v-for="(Soup, i) in productList"
              :key="i"
              :product_data="Soup"
              @addCartProduct="addCartProduct"
            />
          </div>
          <v-pagination
            class="pagination mb-2"
            v-model="page"
            :length="pages"
            @input="updatePage"
          ></v-pagination>
        </div>
        <div
          class="products-tabs__content-tab"
          :class="{ 'active-tab': isActive('Grill') }"
          v-if="flagShows"
        >
          <div class="products-tabs__content-tab__list">
            <app-product
              v-for="(Grill, i) in productList"
              :key="i"
              :product_data="Grill"
              @addCartProduct="addCartProduct"
            />
          </div>
          <v-pagination
            class="pagination mb-2"
            v-model="page"
            :length="pages"
            @input="updatePage"
          ></v-pagination>
        </div>
        <div
          class="products-tabs__content-tab"
          :class="{ 'active-tab': isActive('HotDishes') }"
          v-if="flagShows"
        >
          <div class="products-tabs__content-tab__list">
            <app-product
              v-for="(Dishes, i) in productList"
              :key="i"
              :product_data="Dishes"
              @addCartProduct="addCartProduct"
            />
          </div>
          <v-pagination
            class="pagination mb-2"
            v-model="page"
            :length="pages"
            @input="updatePage"
          ></v-pagination>
        </div>
        <div
          class="products-tabs__content-tab"
          :class="{ 'active-tab': isActive('Dessert') }"
          v-if="flagShows"
        >
          <div class="products-tabs__content-tab__list">
            <app-product
              v-for="(Dessert, i) in productList"
              :key="i"
              :product_data="Dessert"
              @addCartProduct="addCartProduct"
            />
          </div>
          <v-pagination
            class="pagination mb-2"
            v-model="page"
            :length="pages"
            @input="updatePage"
          ></v-pagination>
        </div>
        <div
          class="products-tabs__content-tab"
          :class="{ 'active-tab': isActive('Drinks') }"
          v-if="flagShows"
        >
          <div class="products-tabs__content-tab__list">
            <app-product
              v-for="(Drinks, i) in productList"
              :key="i"
              :product_data="Drinks"
              @addCartProduct="addCartProduct"
            />
          </div>
          <v-pagination
            class="pagination mb-2"
            v-model="page"
            :length="pages"
            @input="updatePage"
          ></v-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ProductItem from "../components/ProductItem";
import Slider from "../components/Slider";
export default {
  name: "all-products",
  data: () => ({
    activeTab: "Snacks",
    hours: 0,
    minutes: 0,
    seconds: 0,
    dateToday: "",
    monthToday: "",
    countDay: 0,
    yearToday: 0,
    isLoading: false,
    items: [],
    model: null,
    search: null,
    limit: 10,
    BaseUrl: "/",
    page: 1,
    pageSize: 12,
    listCount: 0,
    productList: [],
    flagShows: false,
    minPrice: 0,
    maxPrice: 2000,
    drawer: false,
  }),
  components: {
    "app-product": ProductItem,
    "app-slider": Slider,
  },
  watch: {
    search() {
      if (this.items.length > 0) return;

      this.isLoading = true;
      fetch("http://dobrynin-rest.ru/AllProducts.json")
        //  fetch("http://localhost:3002/Products")
        .then((res) => res.clone().json())
        .then((res) => {
          this.items = res.Products;
          //this.items = res;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
  methods: {
    ...mapActions([
      "productMenu",
      "addToCart",
      "getPromoProducts",
      "productView",
    ]),
    ...mapMutations(["PRODUCTVIEW"]),
    getsSalades() {
      this.productMenu("http://dobrynin-rest.ru/api/Salads.json");
      setTimeout(() => {
        this.updatePage(this.page);
        this.initPage();
      }, 1000);
    },
    getsSnacks() {
      this.productMenu("http://dobrynin-rest.ru/api/Snacks.json");
      setTimeout(() => {
        this.updatePage(this.page);
        this.initPage();
      }, 1000);
    },
    getsSoups() {
      this.productMenu("http://dobrynin-rest.ru/api/Soup.json");
      setTimeout(() => {
        this.updatePage(this.page);
        this.initPage();
      }, 1000);
    },
    getsGrills() {
      this.productMenu("http://dobrynin-rest.ru/api/Grile.json");
      setTimeout(() => {
        this.updatePage(this.page);
        this.initPage();
      }, 1000);
    },
    getsDishes() {
      this.productMenu("http://dobrynin-rest.ru/api/Hot.json");
      setTimeout(() => {
        this.updatePage(this.page);
        this.initPage();
      }, 1000);
    },
    getsDessert() {
      this.productMenu("http://dobrynin-rest.ru/api/Desesrt.json");
      setTimeout(() => {
        this.updatePage(this.page);
        this.initPage();
      }, 1000);
    },
    getsDrinks() {
      this.productMenu("http://dobrynin-rest.ru/api/Drinks.json");
      setTimeout(() => {
        this.updatePage(this.page);
        this.initPage();
      }, 1000);
    },
    addCartProduct(data) {
      this.addToCart(data);
    },
    isActive(menuItem) {
      return this.activeTab === menuItem;
    },
    setActive(menuItem) {
      this.activeTab = menuItem;
    },
    DateToday() {
      const now = new Date();
      const days = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
      ];
      const month = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
      ];
      const resDay = days[now.getDay()];
      const resMonth = month[now.getMonth()];
      const resDayCount = now.getDate();
      const resYearDay = now.getFullYear();
      this.dateToday = resDay;
      this.monthToday = resMonth;
      this.countDay = resDayCount;
      this.yearToday = resYearDay;
    },
    TimeToday() {
      const date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      hours = hours <= 9 ? "0" + `${hours}` : hours;
      minutes = minutes <= 9 ? "0" + `${minutes}` : minutes;
      seconds = seconds <= 9 ? "0" + `${seconds}` : seconds;
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;
    },
    initPage() {
      this.listCount = this.lengthProducts.length;
      if (this.listCount < this.pageSize) {
        this.productList = this.lengthProducts;
      } else {
        this.productList = this.lengthProducts.slice(0, this.pageSize);
      }
      setTimeout(() => {
        this.flagShows = true;
      }, 1000);
    },
    updatePage(pageIndex) {
      let start = (pageIndex - 1) * this.pageSize;
      let end = pageIndex * this.pageSize;
      this.productList = this.lengthProducts.slice(start, end);
      this.page = pageIndex;
      this.flagShows = false;
      setTimeout(() => {
        this.flagShows = true;
      }, 1000);
    },
  },
  computed: {
    ...mapGetters([
      "snacksProducts",
      "saladsProducts",
      "lengthProducts",
      "loading",
    ]),
    pages() {
      let _this = this;
      if (_this.pageSize == null || _this.listCount == null) return 0;
      return Math.ceil(_this.listCount / _this.pageSize);
    },
  },
  mounted() {
    setInterval(() => {
      this.TimeToday();
    }, 1000);
    setTimeout(() => {
      const timerBlock = document.querySelector(".block-date__time");
      timerBlock.classList.add("add-clock");
      this.getPromoProducts();
      this.updatePage(this.page);
      this.initPage();
      this.productMenu("http://dobrynin-rest.ru/api/Snacks.json");
    }, 1000);
  },
  created() {
    setTimeout(() => {
      const timerBlock = document.querySelector(".block-date");
      timerBlock.classList.add("add-clock");
      this.updatePage(this.page);
      this.initPage();
      this.DateToday();
    }, 2000);
  },
};
</script>
