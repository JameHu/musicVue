
import Vue from 'vue'
import { Host } from './config'

export function _getBaner() {
  const url = Host + '/banner';
  return Vue.axios.get(url)
}

export function _getMusicList() {
  const url = Host + '/personalized?limit=' + 6;
  return Vue.axios.get(url)
}

export function _getMusicOnes() {
  const url = Host + '/personalized/newsong';
  return Vue.axios.get(url)
}

export function _getMusicLists(id) {
  const url = Host + '/playlist/detail?id=' + id;
  return Vue.axios.get(url)
}