<template>
  <div class="num">
    {{ displayedValue }}
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = {
  autoTime: {
    type: Number,
    default: 5000,
  },
};
const displayedValue = ref(0);
const targetValue = ref(0);
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
  const endValue = targetValue.value;
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

async function updateValue() {
  const newVal = await fetchValueFromAPI();
  targetValue.value = newVal;
  animateToTarget();
}

onMounted(() => {
  updateValue();
  timer = setInterval(updateValue, 5000);
});

onBeforeUnmount(() => {
  clearInterval(timer);
  cancelAnimationFrame(animationFrame);
});
</script>


<style scoped>
.num {
  font-size: 2rem;
  color: #6ae6ff;
  font-weight: 500;
  text-align: center;
}
</style>

