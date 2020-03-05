<template>
  <div id="app">
    <musictop />
    <!-- <keep-alive>
      <router-view />
    </keep-alive> -->

    <router-view />
    <player />
  </div>
</template>
<script>
import musictop from "cnpmC/musictop/musictop.vue";
import player from "@/views/player";
export default {
  name: "app",
  data() {
    return {};
  },
  created() {},
  components: {
    player,
    musictop
  }
};
</script>
<style lang="scss">
@import "commonCSS/index.scss";
html,
body,
#app {
  height: 100%;
}
</style>
