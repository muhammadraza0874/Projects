import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router/routes";
import { BootstrapVue } from "bootstrap-vue";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/css/style.css";
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.config.productionTip = false;
new Vue({
  VueRouter,
  router,
  render: (h) => h(App),
}).$mount("#app");
