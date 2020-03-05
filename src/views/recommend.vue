<template>
  <div class="recommend">
    <div class="scrlor">
      <van-swipe
        class="scrlor_contion my-swipe"
        :autoplay="3000"
        indicator-color="white"
      >
        <van-swipe-item v-for="(item, index) in banners" :key="index"
          ><img :src="item.imageUrl" alt=""
        /></van-swipe-item>
      </van-swipe>
    </div>
    <!-- 推荐歌单 -->
    <div class="reconlists">
      <h5>推荐歌单</h5>
      <ul>
        <li
          v-for="(item, index) in music_list"
          :key="index"
          @click="jump(item.id)"
        >
          <div class="imgs">
            <span
              ><i class="iconfont iconicon-"></i
              >{{ item.playCount | isChides }}</span
            >
            <img :src="item.picUrl" alt="" />
          </div>
          <p class="imgname">{{ item.name }}</p>
        </li>
      </ul>
    </div>

    <!-- 推荐歌曲 -->
    <div class="reconlists onli">
      <h5>推荐歌曲</h5>
      <ul>
        <li
          v-for="(item, index) in music_ones"
          :key="index"
          @click="jump(item.id)"
        >
          <div class="imgs">
            <!-- <span><i class="iconfont iconicon-"></i>{{ item.playCount }}</span> -->
            <img :src="item.picUrl" alt="" />
          </div>
          <p class="imgname">{{ item.name }}</p>
          <p class="isname">{{ item.song.artists[0].name }}</p>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>
<script>
import { _getBaner, _getMusicList, _getMusicOnes } from "network/recommend";

export default {
  name: "recommend",
  data() {
    return {
      banners: [],
      music_list: [],
      music_ones: []
    };
  },
  created() {
    /**
     * 页面请求数据:
     *
     */
    this.getBaner();
    this.getMusicList();
    this.getMusicOnes();
  },
  methods: {
    async getBaner() {
      let res = await _getBaner();
      this.banners = res.data.banners;
    },
    async getMusicList() {
      let res = await _getMusicList();
      this.music_list = res.data.result;
    },
    async getMusicOnes() {
      let res = await _getMusicOnes();
      this.music_ones = res.data.result;
    },
    jump(id) {
      this.$router.push({
        path: "/recommend/" + id
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "commonCSS/mixin.scss";
.scrlor {
  padding: 0 2%;
  height: 148px;
  background-color: $bg-color;
  .scrlor_contion {
    height: 154px;
    margin: 0 auto;
    border-radius: 8px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.reconlists {
  overflow: hidden;
  h5 {
    height: 65px;
    padding-left: 1.5%;
    text-align: left;
    font-weight: 700;
    @include font(14px, $font-color, 65px);
  }
  ul {
    font-size: 0;
    text-align: center;
    li {
      display: inline-block;
      width: 33%;
      padding: 0 1%;
      .imgname {
        overflow: hidden;
        padding: 10px 0 0 0;
        text-align: left;
        height: 40px;
        line-height: 16px;
        overflow: hidden;
        margin-bottom: 10px;
        font-size: 11px;
      }
    }
  }
  .imgs {
    position: relative;
    width: 100%;
    height: 100%;
    & > span {
      @include pos_l();
      width: 100%;
      height: 35px;
      padding-right: 5px;
      text-align: right;
      background: linear-gradient(hsla(0, 0%, 43%, 0.4), hsla(0, 0%, 100%, 0));
      i {
        @include font();
        font-weight: 600;
        margin-right: 2px;
      }
      @include font(12px);
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  &.onli {
    .imgname {
      @include write();
      height: 30px;
      margin-bottom: 0;
      @include font(14px, $font-color);
    }
    .isname {
      @include write();
      line-height: 20px;
      text-align: left;
      @include font(12px, $font-color);
      margin-bottom: 8px;
    }
  }
}
</style>