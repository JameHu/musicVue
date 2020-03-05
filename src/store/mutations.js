import { saveLocastre } from 'commonJS/util';

let mutations = {
  // 添加歌曲文件
  addCDMUGm: (state, data) => (state.isMusic = data),
  // 添加最近播放的歌曲列表
  addAgglist: (state, data) => {
    let iscun = state.aggPlaylist.findIndex(item => {
      return item.id == data.id
    })
    if (iscun != -1) {
      state.aggPlaylist.splice(iscun, 1)
    }
    state.aggPlaylist.unshift(data);
    saveLocastre("aggPlay", state.aggPlaylist)
  },
  // 清空歌曲文件
  clearCDMUGm: (state) => (state.isMusic = {}),
  // 改变是否显示音乐主页
  setHomeShow: (state, Boolear) => (state.homeShow = Boolear),
  // 改变是否暂停
  setMusicStatus: (state, param) => state.musicStatus = param,
  // 添加到播放列表中
  addPlayList: (state, param) => {
    state.playList.length = 0;
    if (Array.isArray(param)) {
      state.playList.unshift(...param)
    } else {
      state.playList.unshift(param)
    }
  },
  // 改变播放模式
  setMode: state => {
    if (state.mode == 2) {
      state.mode = 0
      return;
    }
    state.mode += 1
  },
  //  添加到收藏
  addFood: state => {
    state.endPlaylist.unshift(state.isMusic)
    console.log('添加到收藏成功');
  },
  //  删除收藏
  removeFood: state => {
    let index = state.endPlaylist.findIndex(item => {
      return item.id == state.isMusic.id;
    })
    state.endPlaylist.splice(index, 1);
    console.log('删除收藏成功');
  }
}


export default mutations