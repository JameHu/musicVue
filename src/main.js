import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vueAxios from 'vue-axios'
import Vant from 'vant';
import 'vant/lib/index.css';

import 'commonJS/filter.js'

Vue.use(Vant);
Vue.use(vueAxios, axios);

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
