<template>
  <div class="playerHome" v-show="getHomeShow">
    <div class="bgimg">
      <div class="bgStyle"></div>
      <img :src="getMusic.image" alt="" />
    </div>
    <div class="titile">
      <i class="iconfont iconxia- downup" @click="pageHide"></i>
      <div class="text">
        <h2>{{ getMusic.name }}</h2>
        <h5>{{ getMusic.singer }}</h5>
      </div>
    </div>
    <div class="contanimg" @click="display = !display">
      <!-- <div class="contanimg"> -->
      <div class="contentAgo" v-if="display">
        <div class="rouquan">
          <img
            :src="getMusic.image"
            alt=""
            :class="{ rotateStop: !this.getMusicStatus }"
          />
        </div>
      </div>
      <div class="contentLater" v-else>
        <van-picker :columns="lyrics.t" :default-index="defaultIndex" />
        <!-- {{ this.getMusic.lyric }} -->
      </div>
    </div>
    <div class="jindu">
      <b>{{ slideValue | format }}</b>
      <van-slider
        v-model="slideValue"
        active-color="#d44439"
        bar-height="4px"
        :max="secound"
        @change="onChange"
      >
        <i
          slot="button"
          class="custom-button iconfont iconjiazaizhong"
          v-if="iswanting"
        ></i>
        <div slot="button" class="custom-button" v-else></div>
      </van-slider>
      <b>{{ secound | format }}</b>
    </div>
    <div class="bottom">
      <div class="plans"></div>
      <div class="btns">
        <span class="modecalass" @click="swich">
          <i class="iconfont iconai221" v-if="getMode == 0"></i>
          <i class="iconfont iconsuiji" v-if="getMode == 1"></i>
          <i class="iconfont icondanquxunhuan" v-if="getMode == 2"></i>
        </span>
        <i
          class="iconfont iconshangyishou_huaban"
          @click="playClick('one')"
        ></i>
        <span class="modecalass" @click="stopPlay">
          <i class="iconfont iconzanting" v-if="!getMusicStatus"></i>
          <i class="iconfont iconzanting1" v-else></i>
        </span>
        <i class="iconfont iconxiayishou_huaban" @click="playClick('next')"></i>
        <span class="modecalass" @click="anfood">
          <i class="iconfont iconaixin1" v-if="food"></i>
          <i class="iconfont iconaixin" v-else></i>
        </span>
      </div>
    </div>
    <audio
      :src="getMusic.cd"
      controls
      id="audios"
      v-bind:loop="getMode == 2"
      @canplaythrough="allloading"
      @playing="playing"
      @waiting="waiting"
      @ended="playClick('next')"
      @timeupdate="increment"
    />
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "home",
  data() {
    return {
      display: true, // 控制歌词和主页显示
      food: false, //  控制收藏状态
      lyrics: {
        n: [2, 5, 10],
        t: ["你", "好", "啊"]
      },
      defaultIndex: 1,
      audiosDom: null, //  audio的Dom
      secound: 0, //  audio的时长秒数
      iswanting: false,
      slideValue: 0 // 进度时间
    };
  },
  computed: {
    ...mapGetters([
      "getMusic",
      "getHomeShow",
      "getMusicStatus",
      "getMode",
      "isEndPlay",
      "isplayListIndex",
      "playChove"
    ])
  },
  watch: {
    $route(to) {
      return console.log(to);
    },
    slideValue(newValue) {
      let ofs = this.lyrics.n.indexOf(newValue);
      if (ofs != -1) {
        this.defaultIndex = ofs;
      }
    },
    secound() {
      // console.log("单曲时长变化咯");
      this.food = !!this.isEndPlay; // 是否存在收藏中 状态而已
    }
  },
  created() {},
  mounted() {
    this.audiosDom = document.getElementById("audios");
  },
  methods: {
    onChange() {
      // console.log(this.slideValue + ",onChange", this.secound);

      this.audiosDom.currentTime = this.slideValue;
    },
    increment() {
      // console.log(
      //   `当播放位置改变时（比如当用户快进到媒介中一个不同的位置时）运行的脚本。`
      // );
      // 递增进度条
      this.slideValue = Math.floor(this.audiosDom.currentTime);
    },
    allloading() {
      // 当媒介能够无需因缓冲而停止即可播放至结尾时运行的脚本。
      // console.log("当媒介能够无需因缓冲而停止即可播放至结尾时运行的脚本。");
      this.secound = Math.floor(this.audiosDom.duration);
      this.audiosDom.play();
      this.iswanting = false;
    },
    waiting() {
      // console.log("需要缓冲呀呀呀呀");
      this.iswanting = true;
    },
    playing() {
      // console.log("当媒介已开始播放时运行的脚本");
    },
    ended() {},
    stopPlay() {
      //播放暂停
      this.setMusicStatus(!this.getMusicStatus);
      !this.getMusicStatus ? this.audiosDom.pause() : this.audiosDom.play();
    },
    pageHide() {
      // 页面缩小至后台
      this.setHomeShow(false);
    },
    // 修改播放模式
    swich() {
      this.setMode();
    },
    anfood() {
      // 添加收藏
      this.food = !this.food;
      if (this.food) {
        // 添加收藏
        this.addFood();
      } else {
        // 删除收藏
        this.removeFood();
      }
    },
    playClick(type) {
      // console.log(
      //   `当媒介已到达结尾时运行的脚本（可发送类似“感谢观看”之类的消息）。`
      // );
      let data = this.playChove({
        type,
        index: this.isplayListIndex
      });
      this.getCDMUGa(data);
    },
    ...mapMutations([
      "setHomeShow",
      "setMusicStatus",
      "setMode",
      "addFood",
      "removeFood",
      "clearCDMUGm"
    ]),
    ...mapActions(["getCDMUGa"])
  }
};
</script>
<style lang="scss" scoped>
@import "commonCSS/mixin.scss";

#audios {
  z-index: 4;
  position: fixed;
  opacity: 1;
}
.playerHome {
  z-index: 101;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #fff;
  .jindu {
    z-index: 3;
    @include pos_r_fixed(0, 140px);
    padding: 0 10%;
    display: flex;
    align-items: center;
    & > b {
      @include font(12px);
    }
    & > .van-slider {
      margin: 0 10px;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      .custom-button {
        width: 16px;
        height: 16px;
        border: 5px solid #f1f1f1;
        background-color: #d44439;
        border-radius: 100%;
        &.iconfont {
          display: block;
          height: 22px;
          width: 22px;
          text-align: center;
          line-height: 19px;
          background: #f3f3f3;
          border: 1px solid #080808;
          @include rotate(1);
        }
      }
    }
  }
}
.bgimg {
  @include pos_l_fixed(-50%, -50%);
  height: 300%;
  width: 300%;
  opacity: 0.6;
  -webkit-filter: blur(30px);
  filter: blur(30px);

  .bgStyle {
    z-index: 2;
    @include pos_l();
    width: 100%;
    height: 100%;
    opacity: 0.6;
    background-color: #000;
  }
}
.titile {
  position: relative;
  height: 50px;
  .downup {
    @include pos_l(0, 6px);
    font-size: 35px;
    color: $font-color2;
    padding: 5px 9px;
  }
  .text {
    text-align: center;
    padding-top: 10px;
    h2,
    h5 {
      @include font(20px, $font-color2, 30px);
      font-weight: 600;
    }
    h5 {
      font-size: 14px;
    }
  }
}
.contanimg {
  z-index: 3;
  @include pos_l_fixed(0, 60px);
  width: 100%;
  height: 60%;
  padding-top: 25%;
}
.contentAgo {
  height: 100%;
  text-align: center;
  .rouquan {
    border: 14px solid rgba(0, 0, 0, 0.1);
    width: 80%;
    height: 100%;
    border-radius: 100%;
    overflow: hidden;
    margin: 0 auto;
    img {
      display: block;
      width: 100%;
      height: 100%;
      @include rotate();
      &.rotateStop {
        animation-play-state: paused;
        -webkit-animation-play-state: paused; /* Safari 和 Chrome */
      }
    }
  }
}
.contentLater {
  height: 100%;
  text-align: center;
}

.bottom {
  z-index: 3;
  @include pos_r_fixed(0, 70px);
  width: 100%;
  text-align: center;
  padding: 0 20px;
  .btns {
    display: flex;
    i,
    .modecalass {
      flex: 1;
      @include font(30px);
      .iconaixin1 {
        color: #f00;
      }
    }
  }
}
</style>