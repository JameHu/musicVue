<template>
  <div class="musictop">
    <div class="title">
      <router-link to="/user" tag="i" class="iconfont iconai221"></router-link>
      <p>不知-音乐</p>
      <router-link
        to="/search"
        tag="i"
        class="iconfont iconsousuo"
      ></router-link>
    </div>
    <div class="tablist">
      <router-link
        tag="div"
        :to="item.link"
        v-for="(item, index) in tab"
        :key="index"
        active-class="active"
        ><p>{{ item.text }}</p></router-link
      >
      <!-- <p v-for="(item, index) in tab" :key="index">{{ item.text }}</p> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "musictop",
  data() {
    return {
      tab: [
        { text: "推荐", link: "/recommend" },
        { text: "排行", link: "/rank" },
        { text: "歌手", link: "/singer" }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
@import "commonCSS/mixin.scss";
.musictop {
  background: $bg-color;
  .title {
    display: flex;
    height: 44px;
    padding: 0 16px;
    justify-content: space-between;
    p {
      @include font(18px, #fff, 44px);
    }
    i {
      @include font(22px, #fff, 44px);
    }
  }
  .tablist {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    div {
      flex: 1;
      text-align: center;
      p {
        display: inline-block;
        @include font(14px, #fff, 24px);
        border-bottom: 2px solid $bg-color;
      }
      &.active {
        p {
          border-bottom-color: #fff;
        }
      }
    }
  }
}
</style>