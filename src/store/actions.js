import { _getMusic, _getLyric } from 'network/api';
import { mukautuva } from 'commonJS/util'



let actions = {
  // 根据id请求获取音乐文件，并加入到当前音乐对象中
  async getCDMUGa({ commit }, param) {
    // console.log(param);

    let musicDate = Array.isArray(param) ? param[0] : param;
    // 得到音乐文件
    // 优化请求
    if (!musicDate.isCache) {
      let cd_res = await _getMusic(musicDate.id);
      let lyric_res = await _getLyric(musicDate.id);
      let mdata = cd_res.data.data[0];
      musicDate.cd = mdata.url;
      musicDate.lyric = mukautuva(lyric_res.data.lrc.lyric);
      musicDate.isCache = true;
    }

    // console.log(musicDate.name);

    commit('addCDMUGm', musicDate)
    commit('addAgglist', musicDate)
    commit('setMusicStatus', true)
  }


}


export default actions