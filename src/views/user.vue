<template>
  <div class="user">
    <div class="header">
      <i class="iconfont iconzuo" @click="back"></i>
      <div class="tabnav">
        <p
          v-for="(item, index) in title"
          :key="index"
          :class="{ active: index == contion }"
          @click="isContion(index)"
        >
          {{ item }}
        </p>
      </div>
    </div>
    <div class="musiclist" v-if="!contion">
      <dl>
        <dt>
          <i class="iconfont iconbofang1"></i>播放全部<b
            >(共{{ getEndPlaylist.length }}首)</b
          >
        </dt>
        <dd v-for="(item, index) in getEndPlaylist" :key="index">
          <span>{{ index + 1 }}</span>
          <div class="contion">
            <p class="name">{{ item.name }}</p>
            <p class="desc">{{ item.singer }}</p>
          </div>
        </dd>
      </dl>
    </div>
    <div class="musiclist" v-else>
      <dl>
        <dt @click="addPlay(getAggPlaylist)">
          <i class="iconfont iconbofang1"></i>播放全部<b
            >(共{{ getAggPlaylist.length }}首)</b
          >
        </dt>
        <dd
          v-for="(item, index) in getAggPlaylist"
          :key="index"
          @click="addPlay(item)"
        >
          <span>{{ index + 1 }}</span>
          <div class="contion">
            <p class="name">{{ item.name }}</p>
            <p class="desc">{{ item.singer }}</p>
          </div>
        </dd>
      </dl>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "user",
  data() {
    return {
      contion: 0,
      title: ["我的收藏", "最近播放"]
    };
  },
  computed: {
    ...mapGetters(["getEndPlaylist", "getAggPlaylist"])
  },
  methods: {
    isContion(n) {
      this.contion = n;
    },
    back() {
      this.$router.back();
    },
    addPlay(data) {
      // 增加至播放列表中
      this.addPlayList(data);
      // 增加到播放
      this.getCDMUGa(data);
      // 显示主页
      this.setHomeShow(true);
    },
    ...mapActions(["getCDMUGa"]),
    ...mapMutations(["setHomeShow", "addPlayList"])
  }
};
</script>
<style lang="scss" scoped>
@import "commonCSS/mixin.scss";
.user {
  @include pos_l_fixed();
  background-color: $body-color;
  height: 100%;
}
.header {
  height: 44px;
  background-color: $bg-color;
  & > i {
    @include pos_l(16px, 10px);
    @include font(22px);
  }
  .tabnav {
    width: 60%;
    margin: 0 auto;
    display: flex;
    padding-top: 6px;
    justify-content: space-evenly;
    p {
      border-bottom: 2px solid $bg-color;
      @include font(16px, #fff, 32px);
      padding: 0 10px;
      &.active {
        border-bottom-color: #fff;
      }
    }
  }
}
.musiclist {
  dt {
    display: flex;
    border-bottom: 1px solid #ddd;
    height: 42px;
    padding: 0 14px;
    line-height: 42px;
    i {
      @include font(22px, $font-color, 42px);
      margin-right: 10px;
    }
  }
  dd {
    display: flex;
    border-bottom: 1px solid #ddd;
    height: 60px;
    padding: 0 14px;
    line-height: 60px;
    & > span {
      @include font(16px, $font-color, 60px);
      margin-right: 30px;
    }
    .contion {
      display: flex;
      // flex-wrap: wrap-reverse;
      flex-direction: column;
      justify-content: center;
      .name {
        @include font(18px, $font-color, 24px);
      }
      .desc {
        @include font(14px, $font-color, 20px);
      }
    }
  }
}
</style>