<template>
  <div class="title">
    <div class="text">
      <span>{{ title }}</span>
    </div>
    <!-- <div class="light light-t"></div> -->
    <!-- <div class="light light-b"></div> -->
  </div>
</template>

<script setup>
const props = defineProps({
  title: "指标",
});
</script>

<style lang="less" scoped>
.title {
  width: 80%;
  background: url("../assets/title-r.png") no-repeat center center;
  background-size: 100% 100%;
  padding-top: 4.6vh;
  position: relative;
  margin-left: 20%;
}
.text {
  color: #a6f9ff;
  font-size: 1rem;
  position: absolute;
  height: 100%;
  right: 21%;
  top: 0;
  display: flex;
  align-items: center;
}
</style>