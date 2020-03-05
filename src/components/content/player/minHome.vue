<template>
  <div class="minHome" @click="pageShow" v-show="!getHomeShow">
    <div class="minImg">
      <img
        :src="getMusic.image"
        alt=""
        :class="{ rotateStop: !this.getMusicStatus }"
      />
    </div>
    <div class="musicTitle">
      <h3>{{ getMusic.name }}</h3>
      <h5>{{ getMusic.singer }}</h5>
    </div>
    <div class="playbtn">
      <div class="btn" @click.stop="stopPlay">
        <i class="iconfont iconarrow-" v-if="!getMusicStatus"></i>
        <i class="iconfont iconyk_fangkuai_fill" v-else></i>
      </div>
      <i class="iconfont iconai221" @click.stop="listshow"></i>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "minHome",
  data() {
    return {
      audiosDom: null
    };
  },
  computed: {
    ...mapGetters(["getMusic", "getHomeShow", "getMusicStatus"])
  },
  mounted() {
    let audios = document.getElementById("audios");
    if (this.getMode == 2) {
      audios.loop = true;
    }
    this.audiosDom = audios;
  },
  methods: {
    listshow() {
      this.$emit("musicPlay", true);
    },
    pageShow() {
      this.setHomeShow(true);
    },
    stopPlay() {
      //播放暂停
      this.setMusicStatus(!this.getMusicStatus);
      !this.getMusicStatus ? this.audiosDom.pause() : this.audiosDom.play();
    },
    ...mapMutations(["setHomeShow", "setMusicStatus"])
  }
};
</script>
<style lang="scss" scoped>
@import "commonCSS/mixin.scss";
.minHome {
  z-index: 100;
  display: flex;
  @include pos_r_fixed();
  width: 100%;
  height: 62px;
  background: #fff;
  box-shadow: 0 0 10px #00000073;
  padding: 8px 10px;
  justify-content: space-between;
  .minImg {
    width: 60px;
    height: 60px;
    border: 5px solid rgba(0, 0, 0, 0.1);
    border-radius: 100%;
    overflow: hidden;
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
  .musicTitle {
    width: 60%;
    text-align: left;
    margin-left: 10px;
    h3 {
      @include font(16px, $font-color);
      @include write();
    }
    h5 {
      @include font(14px, $font-color);
    }
  }
  .playbtn {
    display: flex;
    justify-content: flex-end;
    .btn {
      width: 40px;
      height: 40px;
      border: 3px solid #ccc;
      border-radius: 100%;
      margin-right: 10px;
      @include font(22px, $font-color, 30px);
      text-align: center;
      .iconyk_fangkuai_fill {
        color: #f00;
      }
    }
    & > .iconfont {
      @include font(30px, $font-color, 36px);
    }
  }
}
</style>