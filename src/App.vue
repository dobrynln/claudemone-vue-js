<template>
  <v-app>
    <div class="main">
      <app-navbar></app-navbar>
      <router-view />
      <app-cart v-if="showFlagCart" :cart_data="cartProducts"></app-cart>
      <div class="alert-error" v-if="error">
        <v-alert type="error"
          >Что-то пошло не так... Проверьте данные.
          <v-btn @click="closeAlert">Ок</v-btn>
        </v-alert>
      </div>
      <modal-settings v-if="showFlagDialog"></modal-settings>
    </div>
  </v-app>
</template>

<script>
import firebase from "firebase/compat/app";
import NavBar from "@/components/NavBar";
import CartProducts from "./views/CartProducts.vue";
import SettingsUser from "./views/SettingsUser.vue";
import { mapGetters } from "vuex";
export default {
  name: "App",

  data: () => ({}),
  components: {
    "app-navbar": NavBar,
    "app-cart": CartProducts,
    "modal-settings": SettingsUser,
  },
  methods: {
    closeAlert() {
      this.$store.dispatch("clearErr");
    },
  },
  computed: {
    ...mapGetters(["cartProducts", "showFlagCart", "showFlagDialog"]),
    error() {
      return this.$store.getters.error;
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("autoLoginUser", user);
      }
    });
    if(this.error) {
      setTimeout(() => {
        this.closeAlert()
      }, 1500)
    }
  },
};
</script>
<style lang="less">
@import "./style/main.less";
</style>
