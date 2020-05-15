import Vue from "vue";
import App from "./App.vue";

import chartXkcdVue from "chart.xkcd-vue";
Vue.use(chartXkcdVue);
import Vodal from "vodal";
Vue.component(Vodal.name, Vodal);
import "vodal/common.css";
import "vodal/door.css";

Vue.config.productionTip = false;

import "nes.css/css/nes.min.css";

import "typeface-press-start-2p/index.css";

new Vue({
  render: (h) => h(App),
}).$mount("#app");