
import Vue from 'vue';
import { isChides, format } from './util.js'


Vue.filter(['isChides'], isChides) // 数字转为中文万
Vue.filter(['format'], format) // 数字转为时分秒


/* Vue.filter('',
  function () {  // 数字转为中文万
  }
) */

