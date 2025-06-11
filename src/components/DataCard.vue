<template>
  <div class="data-card" :class="{ 'pulse': highlight }">
    <div class="card-icon" :style="{ backgroundColor: iconBgColor }">
      <i :class="icon"></i>
    </div>
    <div class="card-content">
      <div class="card-title">{{ title }}</div>
      <div class="card-value">{{ formattedValue }}</div>
      <div class="card-trend" :class="trendClass">
        <i :class="trendIcon"></i> {{ trend }}%
      </div>
    </div>
    <div class="card-sparkline" ref="sparklineRef"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [Number, String],
    required: true
  },
  trend: {
    type: Number,
    default: 0
  },
  icon: {
    type: String,
    default: 'fas fa-chart-line'
  },
  color: {
    type: String,
    default: '#00e4ff'
  },
  sparklineData: {
    type: Array,
    default: () => []
  },
  highlight: {
    type: Boolean,
    default: false
  }
})

const sparklineRef = ref(null)
let chart = null

const iconBgColor = computed(() => {
  return `${props.color}33` // 添加20%透明度
})

const trendClass = computed(() => {
  return props.trend >= 0 ? 'positive' : 'negative'
})

const trendIcon = computed(() => {
  return props.trend >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'
})

const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    return props.value.toLocaleString()
  }
  return props.value
})

function initSparkline() {
  if (!sparklineRef.value) return
  
  chart = echarts.init(sparklineRef.value)
  updateSparkline()
}

function updateSparkline() {
  if (!chart) return
  
  const data = props.sparklineData.length > 0 
    ? props.sparklineData 
    : [Math.random() * 10, Math.random() * 15, Math.random() * 20, Math.random() * 25, Math.random() * 30, 
       Math.random() * 35, Math.random() * 40, Math.random() * 45, Math.random() * 50]
  
  const option = {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    xAxis: {
      type: 'category',
      show: false
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [{
      data: data,
      type: 'line',
      showSymbol: false,
      smooth: true,
      lineStyle: {
        width: 2,
        color: props.color
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: `${props.color}80` }, // 50% 透明度
          { offset: 1, color: `${props.color}00` }  // 0% 透明度
        ])
      }
    }]
  }
  
  chart.setOption(option)
}

onMounted(() => {
  initSparkline()
  window.addEventListener('resize', () => {
    chart && chart.resize()
  })
})

watch(() => props.sparklineData, () => {
  updateSparkline()
}, { deep: true })
</script>

<style scoped>
.data-card {
  display: flex;
  background-color: rgba(0, 20, 80, 0.3);
  border-radius: 10px;
  padding: 15px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 228, 255, 0.3);
  box-shadow: 0 0 10px rgba(0, 228, 255, 0.2);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.data-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 228, 255, 0.3);
}

.data-card.pulse {
  animation: pulse 2s infinite;
}

.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 20px;
  color: white;
}

.card-content {
  flex: 1;
}

.card-title {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 5px;
}

.card-value {
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin-bottom: 5px;
}

.card-trend {
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.card-trend.positive {
  color: #00ffcc;
}

.card-trend.negative {
  color: #ff6666;
}

.card-sparkline {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100px;
  height: 40px;
  opacity: 0.5;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 228, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(0, 228, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 228, 255, 0);
  }
}
</style>