<template>
  <div class="data-flow-container">
    <div 
      v-for="(flow, index) in dataFlows" 
      :key="index"
      class="data-flow"
      :style="getDataFlowStyle(flow)"
    >
      <div class="flow-dot"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  flowCount: {
    type: Number,
    default: 5
  },
  flowColor: {
    type: String,
    default: '#00e4ff'
  },
  speed: {
    type: Number,
    default: 2000
  }
})

const dataFlows = ref([])
let animationFrame = null

function createDataFlow(index) {
  return {
    x: Math.random() * 100,
    y: Math.random() * 100,
    targetX: Math.random() * 100,
    targetY: Math.random() * 100,
    progress: 0,
    size: Math.random() * 3 + 2,
    opacity: Math.random() * 0.8 + 0.2,
    speed: Math.random() * 0.02 + 0.01,
    trail: []
  }
}

function initDataFlows() {
  dataFlows.value = []
  for (let i = 0; i < props.flowCount; i++) {
    dataFlows.value.push(createDataFlow(i))
  }
}

function updateDataFlows() {
  dataFlows.value.forEach(flow => {
    // 更新位置
    flow.progress += flow.speed
    
    if (flow.progress >= 1) {
      // 重新设置目标
      flow.x = flow.targetX
      flow.y = flow.targetY
      flow.targetX = Math.random() * 100
      flow.targetY = Math.random() * 100
      flow.progress = 0
      flow.trail = []
    } else {
      // 插值计算当前位置
      const currentX = flow.x + (flow.targetX - flow.x) * flow.progress
      const currentY = flow.y + (flow.targetY - flow.y) * flow.progress
      
      // 添加到轨迹
      flow.trail.push({ x: currentX, y: currentY })
      if (flow.trail.length > 10) {
        flow.trail.shift()
      }
    }
  })
}

function animate() {
  updateDataFlows()
  animationFrame = requestAnimationFrame(animate)
}

function getDataFlowStyle(flow) {
  const currentX = flow.x + (flow.targetX - flow.x) * flow.progress
  const currentY = flow.y + (flow.targetY - flow.y) * flow.progress
  
  return {
    left: `${currentX}%`,
    top: `${currentY}%`,
    width: `${flow.size}px`,
    height: `${flow.size}px`,
    opacity: flow.opacity * (1 - flow.progress * 0.5),
    backgroundColor: props.flowColor,
    boxShadow: `0 0 ${flow.size * 3}px ${props.flowColor}`,
    transform: `scale(${1 + flow.progress * 0.5})`
  }
}

onMounted(() => {
  initDataFlows()
  animate()
})

onBeforeUnmount(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<style scoped>
.data-flow-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.data-flow {
  position: absolute;
  border-radius: 50%;
  transition: all 0.1s ease;
  animation: data-pulse 1.5s ease-in-out infinite;
}

.flow-dot {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: inherit;
  animation: dot-glow 2s ease-in-out infinite alternate;
}

@keyframes data-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

@keyframes dot-glow {
  0% {
    filter: brightness(1);
  }
  100% {
    filter: brightness(2);
  }
}
</style>
