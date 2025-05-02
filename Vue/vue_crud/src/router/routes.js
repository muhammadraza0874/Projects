import Vue from "vue";
import VueRouter from "vue-router";
import Listing from "../views/users/Listing.vue";
import Detail from "../views/users/Detail.vue";
Vue.use(VueRouter);
const routes = [
  {
    path: "",
    name: "Listing",
    component: Listing,
  },
  {
    path: "/user-detail/:id",
    name: "Detail",
    component: Detail,
  },
];

// Create Vue Router Object
const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
