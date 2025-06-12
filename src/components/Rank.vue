<template>
  <div class="rank">
    <div class="rank-title">
      <div>国家</div>
      <div>设备总数(个)</div>
    </div>
    <div class="list">
      <TransitionGroup name="rank" tag="div" class="list">
        <div v-for="item in sortedData" :key="item.country" class="rank-list">
          <div class="rank-li">
            <div>{{ item.country }}</div>
            <div>
              <!-- {{ item.data }} -->
              <CounterNumber :num="item.data" />
            </div>
          </div>
          <div
            class="rank-block"
            :style="{
              width: item.width,
            }"
          >
            <div class="glow" />
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount, computed } from "vue";
import CounterNumber from "./CounterNumber1.vue";
const rawData = ref([]); // 原始数据
const listData = ref([]); // 带宽度的展示数据
let timer = null;
const sortedData = computed(() =>
  [...listData.value].sort((a, b) => b.data - a.data)
);
function simulateAPI() {
  // 模拟随机波动数据，可替换为实际请求
  return [
    { country: "中国", data: 1800 + Math.floor(Math.random() * 100) },
    { country: "泰国", data: 1600 + Math.floor(Math.random() * 500) },
    { country: "马来西亚", data: 300 + Math.floor(Math.random() * 100) },
    { country: "土耳其", data: 150 + Math.floor(Math.random() * 100) },
    { country: "沙特阿拉伯", data: 120 + Math.floor(Math.random() * 100) },
  ];
}
function animateNumber(start, end, duration, callback) {
  const startTime = performance.now();
  function step(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = Math.floor(start + (end - start) * progress);
    callback(value);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}
function updateData() {
  const newData = simulateAPI();
  rawData.value = newData;
  const max = Math.max(...newData.map((i) => i.data));
  // 重置动画
  listData.value = newData.map((i) => ({ ...i, width: "0%", dataDisplay: 0 }));
  // 延迟一帧触发动画
  nextTick(() => {
    listData.value = newData.map((i) => ({
      ...i,
      width: `${((i.data / max) * 90).toFixed(2)}%`,
    }));
  });
}

onMounted(() => {
  updateData();
  timer = setInterval(updateData, 10000); // 每 30 秒刷新一次
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style lang="less" scoped>
.rank {
  width: 100%;
  padding: 0 2px;
  .rank-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 2rem;
    margin-bottom: 1rem;
  }
  .rank-list {
    background: linear-gradient(270deg, #005a9b 0%, #001733 100%);
    position: relative;
    border-radius: 4px;
    &::after {
      display: block;
      content: "";
      position: absolute;
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      left: -1px;
      top: -1px;
      border-radius: 4px;
      background: linear-gradient(
        139deg,
        rgba(0, 52, 95, 1),
        rgba(0, 220, 235, 1)
      );
      z-index: -2;
    }
    & + .rank-list {
      margin-top: 1rem;
    }
  }
  .rank-li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1px 2%;
    border-radius: 8px;
    line-height: 2rem;
    height: 2rem;
    position: relative;
    z-index: 2;
    :deep(.num) {
      font-size: 1rem;
    }
  }
  .rank-block {
    position: absolute;
    inset: 2px;
    height: calc(100% - 4px);
    background: linear-gradient(270deg, #00da85 0%, #005a9b 100%);
    border-radius: 4px;
    z-index: 0;
    transition: width 1.2s ease-out;
    overflow: hidden;
    &::before {
      display: block;
      content: "";
      position: absolute;
      width: calc(100% - 2px);
      height: calc(100% - 2px);
      left: 1px;
      top: 1px;
      border-radius: 4px;
      background: linear-gradient(270deg, #00da85 0%, #005a9b 100%);
      z-index: -1;
    }
    &::after {
      display: block;
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      border-radius: 4px;
      background: linear-gradient(
        180deg,
        rgba(0, 220, 235, 1),
        rgba(0, 182, 211, 1)
      );
      z-index: -2;
    }
  }
  .glow {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    opacity: 0.6;
    animation: shimmer 2s linear infinite;
    pointer-events: none;
    border-radius: 4px;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
}
.rank-move {
  transition: transform 0.6s ease;
}
</style>