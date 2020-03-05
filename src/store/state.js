import { getLocastre } from 'commonJS/util';

let state = {
  playList: [], // 播放列表，可单个可多个。当存储时需后进先出
  isMusic: {},  // 当前播放的音乐信息包括音频和歌词

  musicStatus: true,  // 播放停止和继续
  homeShow: false, // 是否音乐主页显示
  mode: 2, // 播放模式 0：顺序  1：随机  2:单曲
  aggPlaylist: getLocastre('aggPlay'), // 曾听过的音乐,需要在历史locaStorage中获取
  endPlaylist: [] // 收藏歌曲列表
}

/**
 * 单个音乐文件包含 
 * 
 * 标识 id
 * 音乐文件 cd
 * 歌名 name
 * 歌手名字 singer
 * 时长 times
 * 歌词 lyric
 * 版面图片 image
 *  
 */

export default state;