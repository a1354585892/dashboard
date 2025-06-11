<template>
  <div class="circle-progress">
    <div class="title">{{ title }}</div>
    <div class="progress-container">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle
          class="progress-background"
          cx="50"
          cy="50"
          r="40"
          stroke-width="8"
        />
        <circle
          class="progress-bar"
          cx="50"
          cy="50"
          r="40"
          stroke-width="8"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
        />
      </svg>
      <div class="percentage">{{ percentage }}%</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '进度'
  },
  percentage: {
    type: Number,
    default: 0
  }
})

const circumference = computed(() => 2 * Math.PI * 40)
const dashOffset = computed(() => 
  circumference.value * (1 - props.percentage / 100)
)
</script>

<style scoped>
.circle-progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.title {
  font-size: 14px;
  color: #00e4ff;
  margin-bottom: 10px;
}

.progress-container {
  position: relative;
  width: 100px;
  height: 100px;
}

.progress-background {
  fill: none;
  stroke: rgba(0, 100, 200, 0.2);
}

.progress-bar {
  fill: none;
  stroke: #00e4ff;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: center;
  transition: stroke-dashoffset 0.5s;
}

.percentage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  font-weight: bold;
  color: #00e4ff;
}
</style>