<template>
  <div class="rank">
    <div class="rank-title">
      <div class="rank-title-name">地区</div>
      <div>设备总数(个)</div>
    </div>
    <div class="list main-list">
      <TransitionGroup name="rank" tag="div" class="list h-0">
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
import {
  ref,
  onMounted,
  nextTick,
  onBeforeUnmount,
  computed,
  watch,
} from "vue";
import CounterNumber from "./CounterNumber1.vue";
import { fetchDashboardRegionData } from "../api/dashboard";
import { useRoute } from "vue-router";

// 定义props接收数据
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const rawData = ref([]); // 原始数据
const listData = ref([]); // 带宽度的展示数据
let timer = null;
const route = useRoute();

const sortedData = computed(() =>
  [...listData.value].sort((a, b) => b.data - a.data)
);

const supplierId = computed(() => {
  return route.params.supplierId || route.query.supplierId;
});

// 获取真实的区域分布数据
async function fetchRegionData() {
  try {
    const res = await fetchDashboardRegionData(supplierId.value);
    console.log("[ Rank组件获取区域数据 res, ] >", res);
    if (res && res.code === 0 && res.data && Array.isArray(res.data)) {
      return res.data.map((item) => ({
        country: item.region,
        data: item.count || 0,
      }));
    }
  } catch (error) {
    console.error("获取区域分布数据失败:", error);
  }

  // 如果接口失败，返回默认数据
  return [
    { country: "中国", data: 800 + Math.floor(Math.random() * 100) },
    { country: "泰国", data: 600 + Math.floor(Math.random() * 120) },
    { country: "马来西亚", data: 300 + Math.floor(Math.random() * 60) },
    { country: "土耳其", data: 150 + Math.floor(Math.random() * 120) },
    { country: "沙特阿拉伯", data: 120 + Math.floor(Math.random() * 150) },
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
async function updateData() {
  // 优先使用props传入的数据，如果没有则调用接口获取
  let newData = [];
  if (props.data && props.data.length > 0) {
    newData = props.data.map((item) => ({
      country: item.country || item.name || item.region,
      data: item.data || item.count || item.value || 0,
    }));
  } else {
    newData = await fetchRegionData();
  }

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

// 监听props数据变化
watch(
  () => props.data,
  (newData) => {
    if (newData && newData.length > 0) {
      updateData();
    }
  },
  { deep: true }
);

onMounted(() => {
  updateData();
  timer = setInterval(updateData, 10000); // 每10秒刷新一次
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style lang="less" scoped>
.rank {
  width: 100%;
  height: 100%;
  padding: 0 2px;
  display: flex;
  flex-direction: column;

  .rank-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: var(--height-xs);
    margin-bottom: var(--spacing-v-sm);
    flex-shrink: 0;
    .rank-title-name {
      padding-left: 2%;
    }
  }

  .list {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .main-list {
    padding-bottom: 4px;
  }
  .rank-list {
    background: linear-gradient(270deg, #005a9b 0%, #001733 100%);
    position: relative;
    border-radius: 4px;
    flex: 1;
    display: flex;
    align-items: center;
    // margin-bottom: var(--spacing-v-xs);

    &:last-child {
      margin-bottom: 0;
    }
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
      margin-top: var(--spacing-v-sm);
    }
  }

  .rank-li {
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1px 2%;
    border-radius: 8px;
    line-height: var(--height-xs);
    height: var(--height-xs);
    position: relative;
    z-index: 2;
    flex-shrink: 0; /* 不允许收缩 */
    :deep(.num) {
      font-size: var(--font-md);
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
