
import Vue from 'vue'
import { Host } from './config'

export function _getTopDate(n) {
  return Vue.axios.get(`${Host}/top/list?idx=${n}`)
}
