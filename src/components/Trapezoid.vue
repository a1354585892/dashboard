<template>
  <div class="trapezoid" :style="boxStyles"></div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  width: Number,
  height: Number,
});
const boxStyles = computed(() => {
  return {
    width: width + "px",
    height: height + "px",
  };
});
</script>

<style lang="less" scoped>
.trapezoid {
  position: relative;
  margin: 0 0;
  opacity: 0.7;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform: skewX(30deg);
    background: linear-gradient(135deg, rgba(0, 255, 255, 0.8), transparent);
    animation: flashAnimation 3s infinite;
  }
  &.left {
    right: 100%;
  }
  &.left::before {
    left: 0;
    // transform: scaleX(-1);
  }
  &.right {
    left: 100%;
  }
  &.right::before {
    right: 0;
  }
}
</style>