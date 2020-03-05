<template>
  <div class="player" v-if="Object.keys(getMusic).length != 0">
    <home />
    <minHome @musicPlay="musicPlay" />
    <musicList :start="offStart" @musicPlay="musicPlay" />
  </div>
</template>
<script>
import home from "cnpmC/player/home";
import minHome from "cnpmC/player/minHome";
import musicList from "cnpmC/player/musicList";

import { mapGetters } from "vuex";
export default {
  name: "player",
  data() {
    return {
      offStart: false
    };
  },
  computed: {
    ...mapGetters(["getMusic"])
  },
  created() {},
  methods: {
    musicPlay(boolear) {
      this.offStart = boolear;
    }
  },
  components: {
    home,
    minHome,
    musicList
  }
};
</script>
<style lang="scss" scoped>
</style>