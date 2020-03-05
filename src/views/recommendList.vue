<template>
  <div class="reconlist music-list">
    <div class="header">
      <div class="back" @click="back()">
        <i class="iconfont iconzuo"></i>
      </div>
      <div class="text">
        <h1 class="title">歌单</h1>
      </div>
    </div>
    <div class="list">
      <div class="music-list-wrapper wrapper" ref="wrapper">
        <div class="content">
          <div class="bg-image" :style="bgurls">
            <div class="filter"></div>
            <div class="text">
              <h2 class="list-title">{{ pageDate.name }}</h2>
              <p class="play-count">
                <i class="fa fa-headphones"></i>
                {{ pageDate.album }}
              </p>
            </div>
          </div>
          <div class="song-list-wrapper">
            <div class="sequence-play" ref="allplaybtn">
              <i class="iconfont iconbofang1"></i>
              <span class="text">播放全部</span>
              <span class="count">(共{{ leng }}首)</span>
            </div>
            <div class="song-list">
              <ul>
                <li
                  class="item"
                  v-for="(item, index) in list"
                  :key="index"
                  @click="addPlay(item)"
                >
                  <p class="count">{{ index + 1 }}</p>
                  <div class="content">
                    <h2 class="name">
                      {{ item.name }}
                    </h2>
                    <p class="desc">{{ item.singer }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { _getMusicLists } from "network/recommend";

import { singerName } from "commonJS/util";

import { mapActions, mapMutations } from "vuex";
import BScroll from "better-scroll";
export default {
  name: "recommendList",
  data() {
    return {
      id: "",
      leng: 0,
      pageDate: {},
      list: null
    };
  },
  computed: {
    bgurls() {
      return `background-image:url(${this.pageDate.bgurl})`;
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getMusicList();
  },
  updated() {
    let _this = this;
    this.$refs.allplaybtn.onclick = function() {
      _this.addPlay(_this.list);
    };
  },
  mounted() {
    let wrapper = this.$refs.wrapper;
    new BScroll(wrapper, {
      scrollY: true,
      click: true
    });
  },
  methods: {
    async getMusicList() {
      let res = await _getMusicLists(this.id);

      let data = res.data.playlist;

      // console.log(data);

      this.pageDate = {
        name: data.name,
        bgurl: data.coverImgUrl
      };

      this.list = this._integrate(data.tracks);
      this.leng = this.list.length;
    },
    _integrate(list) {
      return list.map(item => {
        return {
          id: item.id,
          singer: singerName(item.ar),
          name: item.name,
          // aliaName: music.song.alias.join('-'),
          album: item.name,
          image: item.al.picUrl
        };
      });
    },
    addPlay(data) {
      // 增加至播放列表中
      this.addPlayList(data);
      // 增加到播放
      this.getCDMUGa(data);
      // 显示主页
      this.setHomeShow(true);
    },
    back() {
      this.$router.back();
    },
    ...mapActions(["getCDMUGa"]),
    ...mapMutations(["setHomeShow", "addPlayList"])
  }
};
</script>
<style lang="scss" scoped>
@import "commonCSS/mixin.scss";
.reconlist {
  @include pos_l_fixed();
  height: 100%;
  background-color: #fff;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(30%, 0, 0);
  opacity: 0;
}

.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 44px;
    color: #fff;
    z-index: 100;
    .back {
      position: absolute;
      top: 10px;
      left: 4px;
      .iconfont {
        font-size: 26px;
      }
    }
    .text {
      position: absolute;
      left: 38px;
      line-height: 44px;
      font-size: $font-size-medium-x;
      @include no-wrap();
    }
  }
  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;
    .music-list-wrapper {
      height: 100%;
      .bg-image {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 75%;
        transform-origin: top;
        background-size: cover;
        background-position: 0 30%;
        .filter {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: black;
          opacity: 0.2;
        }
        .text {
          position: absolute;
          width: 80%;
          height: 40px;
          bottom: 50px;
          left: 20px;
          color: #fff;
          .list-title {
            position: absolute;
            bottom: 0;
            font-style: italic;
            font-size: $font-size-large;
            line-height: 18px;
            font-weight: bold;
            letter-spacing: 1px;
            .music {
              position: absolute;
              top: -20px;
              left: 5px;
              font-style: italic;
              font-weight: bold;
              font-size: $font-size-medium;
            }
          }
          .update {
            position: absolute;
            top: 45px;
            left: 7px;
            line-height: 14px;
            font-size: $font-size-small;
          }
        }
      }
      .song-list-wrapper {
        padding-top: 41px;
        border-radius: 10px;
        position: relative;
        top: 0;
        background: $color-background;
        .sequence-play {
          position: absolute;
          // left: 8;
          top: 0px;
          display: flex;
          align-items: center;
          width: 100%;
          height: 40px;
          padding-left: 16px;
          border-bottom: 1px solid rgb(228, 228, 228);
          .iconfont {
            font-size: 18px;
            color: $color-text;
            padding-right: 14px;
          }
          .text {
            font-size: $font-size-medium-x;
          }
          .count {
            font-size: $font-size-medium;
            color: $color-text-g;
          }
        }
      }
    }
  }
  .loading-content {
    position: fixed;
    width: 100%;
    top: 70%;
    transform: translateY(-50%);
  }
}

.song-list {
  .item {
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 60px;
    border-bottom: 1px solid rgb(228, 228, 228);
    .count {
      flex: 0 0 50px;
      width: 50px;
      text-align: center;
      color: $color-text-g;
    }
    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        margin-top: 4px;
        width: 80%;
        @include no-wrap();
        color: $color-text;
      }
      .desc {
        @include no-wrap();
        // margin-top: 3px;
        width: 80%;
        font-size: 12px;
        color: $color-text-g;
      }
    }
  }
}
</style>
