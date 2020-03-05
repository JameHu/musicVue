import recommend from '@/views/recommend'   // 推荐
import recommendList from '@/views/recommendList'   // 歌单详情列表
import user from '@/views/user'   // 最近播放||我的收藏
import rank from '@/views/rank'   // 排行
import search from '@/views/search'   // 搜索
import singer from '@/views/singer'   // 歌手


import audio from '@/views/audio'   // audio

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: recommend,
    children: [
      {
        path: ':id',
        component: recommendList
      }
    ]
  },
  {
    path: '/user',
    component: user
  },
  {
    path: '/rank',
    component: rank
  },
  {
    path: '/search',
    component: search
  },
  {
    path: '/singer',
    component: singer
  },
  {
    path: '/audio',
    component: audio
  },

]

export default routes;