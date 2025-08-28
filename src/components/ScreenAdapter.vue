<template>
  <div class="screen-adapter" ref="screenAdapter">
    <div class="screen-content" ref="screenContent" :style="contentStyle">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import {
  SCREEN_CONFIG,
  calculateScale,
  debounce,
  getOptimalScaleMode,
} from "../utils/screenAdapter.js";

const props = defineProps({
  // 缩放模式
  scaleMode: {
    type: String,
    default: () => getOptimalScaleMode(),
  },
  // 是否启用自动检测最佳模式
  autoDetect: {
    type: Boolean,
    default: true,
  },
});

const screenAdapter = ref(null);
const screenContent = ref(null);
const scaleInfo = ref({
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  width: SCREEN_CONFIG.DESIGN_WIDTH,
  height: SCREEN_CONFIG.DESIGN_HEIGHT,
  offsetX: 0,
  offsetY: 0,
});

// 计算缩放信息
const getScaleInfo = () => {
  if (!screenAdapter.value) return scaleInfo.value;

  const clientWidth = screenAdapter.value.clientWidth;
  const clientHeight = screenAdapter.value.clientHeight;

  const mode = props.autoDetect ? getOptimalScaleMode() : props.scaleMode;
  const info = calculateScale(clientWidth, clientHeight, mode);

  return info;
};

// 计算样式
const contentStyle = computed(() => {
  const info = scaleInfo.value;

  return {
    width: `${SCREEN_CONFIG.DESIGN_WIDTH}px`,
    height: `${SCREEN_CONFIG.DESIGN_HEIGHT}px`,
    transform: `scale(${info.scale})`,
    transformOrigin: "center center",
  };
});

// 处理窗口大小变化
const handleResize = () => {
  if (!screenAdapter.value) return;

  const info = getScaleInfo();
  scaleInfo.value = info;

  // 触发自定义事件
  const event = new CustomEvent("screen-resize", {
    detail: info,
  });
  window.dispatchEvent(event);
};

const debouncedResize = debounce(handleResize, 100);

onMounted(() => {
  handleResize();
  window.addEventListener("resize", debouncedResize);

  // 监听屏幕方向变化
  if (screen.orientation) {
    screen.orientation.addEventListener("change", debouncedResize);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", debouncedResize);

  if (screen.orientation) {
    screen.orientation.removeEventListener("change", debouncedResize);
  }
});

// 暴露方法和数据给父组件
defineExpose({
  scaleInfo,
  getScaleInfo,
  handleResize,
});
</script>

<style scoped>
.screen-adapter {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
}

.screen-content {
  position: relative;
  transition: transform 0.3s ease-in-out;
}
</style>
