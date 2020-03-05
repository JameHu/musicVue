let getters = {
  getMusic: state => state.isMusic, //  获取音乐
  getHomeShow: state => state.homeShow, //  获取Home状态
  getMusicStatus: state => state.musicStatus, //  获取播放状态
  getPlayList: state => state.playList, //  获取播放列表
  isplayListIndex: state => (state.playList.findIndex(item => { return state.isMusic.id == item.id })), //  获取当前音乐是否存在收藏列表中的索引位置
  getPlayListLeng: state => state.playList.length, //  获取播放列表长度
  getEndPlaylist: state => state.endPlaylist, //  获取收藏列表
  isEndPlay: state => (state.endPlaylist.find(item => { return state.isMusic.id == item.id })), //  获取当前音乐是否存在收藏列表中
  getAggPlaylist: state => state.aggPlaylist, //  获取曾听过的音乐
  getMode: state => state.mode, //  获取播放模式
  // 切换播放
  playChove: (state, getters) => {
    return function (param) {
      var len = getters.getPlayListLeng,
        index = getters.isplayListIndex,
        _i = index;
      // console.log(len, index, _i);
      if (state.mode != 1) {  // 顺序/单曲
        if (param.type == "next") {
          _i = (index == len - 1) ? 0 : _i + 1;
        }
        if (param.type == "one") {
          _i = (index == 0) ? len - 1 : _i - 1;
        }
      } else {  // 随机
        _i = Math.floor(Math.random() * len)
      }
      return state.playList[_i];
    }
  },
}


export default getters