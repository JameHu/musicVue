<template>
  <div class="musicList" v-show="start">
    <div class="title">
      <div class="modecalass" @click="swich">
        <span v-if="getMode == 0">
          <i class="iconfont iconai221"></i>
          <p>顺序播放</p>
        </span>
        <span v-else-if="getMode == 1">
          <i class="iconfont iconsuiji"></i>
          <p>随机播放</p>
        </span>
        <span v-else-if="getMode == 2">
          <i class="iconfont icondanquxunhuan"></i>
          <p>单曲播放</p>
        </span>
      </div>

      <i class="iconfont iconlaji"></i>
    </div>
    <div class="musicli wrapper" ref="wrapper">
      <div class="content">
        <ul>
          <li
            v-for="(item, index) in getPlayList"
            :key="index"
            @click="getCDMUGa(item)"
            :class="{ active: item.id == getMusic.id }"
          >
            <p><i class="iconfont iconlaba"></i>{{ item.name }}</p>
            <i class="iconfont iconguanbi"></i>
          </li>
        </ul>
      </div>
    </div>
    <div class="close" @click="setStart">
      <i class="iconfont iconguanbi"></i>关闭
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";

import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "musicList",
  data() {
    return {};
  },
  props: {
    start: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(["getPlayList", "getMusic", "getMode"])
  },
  created() {},
  mounted() {
    let wrapper = this.$refs.wrapper;
    new BScroll(wrapper, {
      scrollY: true,
      click: true
    });
  },
  methods: {
    //  显示隐藏播放列表
    setStart() {
      this.$emit("musicPlay", false);
    },
    swich() {
      this.setMode();
    },
    ...mapActions(["getCDMUGa"]),
    ...mapMutations(["setMode"])
  }
};
</script>
<style lang="scss" scoped>
@import "commonCSS/mixin.scss";
.musicList {
  z-index: 100;
  @include pos_r_fixed();
  height: 300px;
  background-color: #fff;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
}
.title {
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid #eee;
  .modecalass {
    width: 80%;
    text-align: left;
    span {
      display: flex;
      justify-content: left;
    }
    p {
      margin-left: 10px;
    }
  }
}
.musicli {
  overflow: hidden;
  height: 220px;
  padding: 10px 16px;
  li {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    &.active {
      color: #f00;
    }
    p {
      i {
        margin-right: 10px;
        @include font(14px, #f00);
        font-weight: 600;
      }
    }
    & > i {
      @include font(14px, #f00);
    }
  }
}
.close {
  @include pos_r();
  text-align: center;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
  i {
    font-size: 16px;
    margin-right: 10px;
  }
}
</style>