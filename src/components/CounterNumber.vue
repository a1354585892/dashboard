<template>
  <div class="num">
    {{ displayedValue }}
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

const props = defineProps({
  autoTime: {
    type: Number,
    default: 1000,
  },
  total: {
    type: Number,
    default: 0,
  },
});
const displayedValue = ref(0);
let animationFrame = null;
let timer = null;

// 模拟接口请求
async function fetchValueFromAPI() {
  // 用真实接口替换此处
  return Math.floor(Math.random() * 10000);
}

function animateToTarget() {
  cancelAnimationFrame(animationFrame);
  const duration = 1500; // 动画时长 1s
  const startTime = performance.now();
  const startValue = displayedValue.value;
  const endValue = props.total;
  const diff = endValue - startValue;

  function step(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    displayedValue.value = Math.floor(startValue + diff * progress);

    if (progress < 1) {
      animationFrame = requestAnimationFrame(step);
    }
  }

  animationFrame = requestAnimationFrame(step);
}
const updateData = () => {
  console.log(111, 222);

  animateToTarget();
  timer = setInterval(animateToTarget, 5000);
};

watch(
  () => props.total,
  () => {
    updateData();
  }
);

onMounted(() => {});

onBeforeUnmount(() => {
  clearInterval(timer);
  cancelAnimationFrame(animationFrame);
});
</script>

<style scoped>
.num {
  font-size: var(--font-2xl); /* 响应式字体 */
  color: #6ae6ff;
  font-weight: 500;
  text-align: center;
  line-height: var(--line-height-tight); /* 响应式行高 */
}
</style>
