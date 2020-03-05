
import Vue from 'vue'
import { apiURI } from './config'

export function _getMusic(id) {
  return Vue.axios.get(`${apiURI}?type=song&id=${id}`)
}
export function _getLyric(id) {
  return Vue.axios.get(`${apiURI}?type=lyric&id=${id}`)
}
