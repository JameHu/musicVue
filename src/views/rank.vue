<template>
  <div class="rank">
    <ul class="ranklists">
      <li v-for="(item, index) in topList" :key="index">
        <div class="img">
          <img :src="item.coverImgUrl" alt="" class="icon" />
        </div>
        <div class="names">
          <p v-for="(song, index) in item.top" :key="index">
            {{ index + 1 }}.{{ song[0] }} - {{ song[1] }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { _getTopDate } from "network/rank";
export default {
  name: "rank",
  data() {
    return {
      topList: [],
      ProArr: [0, 1, 2, 3, 4, 22, 23]
    };
  },
  created() {
    // this.getTopListDate();
    this.getTopDate();
  },
  methods: {
    getTopListDate() {
      Promise.all(_getTopDate(this.ProArr)).then(res => {
        const itemList = res.map(item => {
          let list = item.data.playlist;
          list.top = list.tracks.slice(0, 3);

          return list;
        });

        this.topList.push(...itemList);
      });
    },
    getTopDate() {
      this.ProArr.forEach(async item => {
        let res = await _getTopDate(item);

        let data = res.data.playlist,
          topbase = data.tracks.slice(0, 3).map(item => {
            return [item.name, item.ar[0].name];
          });
        this.topList.push({
          top: topbase,
          coverImgUrl: data.coverImgUrl
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "commonCSS/mixin.scss";
.ranklists {
  margin: 4px 0;
  padding: 0 10px;
  li {
    display: flex;
    padding: 3px 0;
    border-bottom: 1px solid #ddd;
    .img {
      width: 100px;
      height: 100px;
      border-radius: 4px;
      // flex: 0 0 100px;
      // overflow: hidden;

      flex: 1;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .names {
      display: flex;
      overflow: hidden;
      justify-content: space-around;
      flex-direction: column;
      padding: 0 20px;
      flex: 2;
      p {
        font-size: 14px;
        @include write();
      }
    }
  }
}
</style>