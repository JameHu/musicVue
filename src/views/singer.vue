<template>
  <div class="singer">
    <van-index-bar :index-list="indexList">
      <van-index-anchor index="热">热门</van-index-anchor>
      <imgname
        v-for="(item, index) in relist"
        :key="index"
        :imgage="item.avatar"
        :name="item.name"
      />
      <div class="list" v-for="(item, index) in lists" :key="index">
        <van-index-anchor index="index">{{ index }}</van-index-anchor>
        <imgname
          v-for="(sitem, index) in item"
          :key="index"
          :imgage="sitem.avatar"
          :name="sitem.name"
        />
      </div>
    </van-index-bar>
  </div>
</template>
<script>
const pinyin = require("pinyin");

import imgname from "cnpmC/imgname/imgname.vue";

import { _getList } from "network/singer";

export default {
  name: "singer",
  data() {
    return {
      indexList: [],
      titleList: [],
      remenLen: 10,
      relist: [],
      lists: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      _getList().then(res => {
        let s = res.data.artists;
        this.creatR(s); // 整合热门数据
        this.crAlleat(s); // 整合热门数据
      });
    },
    creatR(data) {
      let arr = [];
      let x = 0;
      while (x < this.remenLen) {
        arr.push(this.trimli(data[x]));
        x++;
      }

      this.relist.push(...arr);
    },
    crAlleat(data) {
      let d = data,
        arr = {};

      for (const key in d) {
        if (d.hasOwnProperty(key)) {
          const item = d[key];
          let s = pinyin(item.name[0], {
            style: pinyin.STYLE_FIRST_LETTER
          })[0][0].toUpperCase();

          d[key].interll = s;
        }
      }

      d.forEach(item => {
        let m = item["interll"];
        if (m in arr) {
          arr[m].push(this.trimli(item));
        } else {
          arr[m] = [this.trimli(item)];
        }
      });

      var newData = {},
        sortObj = Object.keys(arr).sort();

      sortObj.map(key => {
        newData[key] = arr[key];
      });

      this.lists = newData;

      sortObj.unshift("热");
      this.indexList = sortObj;
    },
    trimli(orger) {
      return {
        id: orger.id,
        name: orger.name,
        avatar: orger.img1v1Url,
        aliaName: orger.alias.join(" / ")
      };
    }
  },
  components: {
    imgname
  }
};
</script>
<style lang="scss" scoped>
</style>