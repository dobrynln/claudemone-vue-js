import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AuthGuard from "../router/authGuard";
import Login from "../views/LoginUser.vue";
import Register from "../views/RegisterUser.vue";
import Settings from "../views/SettingsUser.vue";
import Product from "../views/ProductView.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    beforeEnter: AuthGuard,
  },
  {
    path: "/product/:id",
    props: true,
    name: "Product",
    component: Product,
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes,
});

export default router;
