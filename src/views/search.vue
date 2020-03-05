<template>
  <div class="srarch">
    <div class="header">
      <i class="iconfont iconzuo" @click="back()"></i>
      <div class="tabnav">
        <input type="text" value="" placeholder="搜索歌曲、歌手" />
      </div>
    </div>
    <div class="remen">
      <h5>热门搜索</h5>
      <p>Taylor Swift新歌</p>
      <p>Taylor Swift新歌</p>
      <p>Taylor Swift新歌</p>
      <p>Taylor Swift新歌</p>
      <p>Taylor Swift新歌</p>
    </div>
    <div class="result">
      <dl>
        <dt>
          <h6>最佳匹配</h6>
          <div class="angs">
            <img
              src="http://p1.music.126.net/AsrGD4Sf0HWJ3mK-Y__PLw==/18981968742063387.jpg"
              alt=""
            />
            <p>歌手：Alan Walker</p>
          </div>
        </dt>
        <dd>
          <p class="song">A Kind of Sorrow</p>
          <p class="singer">Sam Tsui/MADILYN</p>
        </dd>
        <dd>
          <p class="song">A Kind of Sorrow</p>
          <p class="singer">Sam Tsui/MADILYN</p>
        </dd>
        <dd>
          <p class="song">A Kind of Sorrow</p>
          <p class="singer">Sam Tsui/MADILYN</p>
        </dd>
      </dl>
    </div>
  </div>
</template>
<script>
export default {
  name: "srarch",
  data() {
    return {};
  },
  methods: {
    isContion(n) {
      this.contion = n;
    },
    back() {
      this.$router.back();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "commonCSS/mixin.scss";
.srarch {
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
    width: 80%;
    margin: 0 auto;
    padding-top: 6px;
    input {
      width: 100%;
      height: 44px;
      @include font(16px, #fff);
      &::placeholder {
        color: #fff;
      }
      height: 30px;
      border: none;
      background-color: $bg-color;
    }
  }
}
.remen {
  padding: 20px;
  h5 {
    display: block;
    margin-bottom: 10px;
  }
  p {
    display: inline-block;
    background-color: $body-color;
    height: 34px;
    @include font(14px, $font-color, 30px);
    padding: 0 6px;
    border-radius: 8px;
    box-shadow: 0 0 10px $body-color;
    margin: 4px 2px;
    border: 1px solid #ddd;
  }
}
@mixin border {
  padding: 3px 20px;
  border-bottom: 1px solid #ddd;
}
.result {
  dt {
    @include border();
    h6 {
      @include font(14px, $bg-color);
      margin-bottom:8px;
    }
    .angs {
      display: flex;
      img {
        width: 66px;
        height: 54px;
        margin-right:15px;
      }
      p{
        line-height:54px
      }
    }
  }
  dd {
    // .border;
    @include border();
    .song {
      padding: 3px 0;
      @include font(16px, $font-color);
    }
    .singer {
      @include font(14px, #777);
    }
  }
}
</style>