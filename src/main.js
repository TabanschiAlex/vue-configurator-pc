import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import ApiPlugin from "@/plugins/api";

Vue.config.productionTip = false;
Vue.use(ApiPlugin);

new Vue({
  router,
  store,
  vuetify,
  BootstrapVue,
  BootstrapVueIcons,
  render: h => h(App)
}).$mount("#app");
