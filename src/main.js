import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
Vue.config.productionTip = false;
firebase.initializeApp({
  apiKey: "AIzaSyB3GWLnbffksDUf9PFS0lAK0k7X6eJoGro",
  authDomain: "diplom-my.firebaseapp.com",
  projectId: "diplom-my",
  storageBucket: "diplom-my.appspot.com",
  messagingSenderId: "1007027497518",
  appId: "1:1007027497518:web:05ddda69390976171fcdbf",
  measurementId: "G-FC7JDDQDV8",
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
