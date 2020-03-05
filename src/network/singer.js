
import Vue from 'vue'
import { Host } from './config'

export function _getList() {
  return Vue.axios.get(`${Host}/top/artists?limit=100`)
}
