<template>
  <div class="imgname">
    <img :src="imgage" alt="" />
    <p>{{ name }}</p>
  </div>
</template>
<script>
export default {
  name: "imgname",
  data() {
    return {};
  },
  props: {
    name: {
      type: String
    },
    imgage: {
      type: String
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.imgname {
  border-bottom: 1px solid #ddd;
  padding: 4px 16px;
  display: flex;
  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 3px;
  }
  p {
    font-size: 16px;
    line-height: 50px;
  }
}
</style>