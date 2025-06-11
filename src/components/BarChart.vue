<template>
  <div class="chart-container">
    <div class="chart-title">{{ title }}</div>
    <div class="chart" ref="chartRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  title: {
    type: String,
    default: '柱状图'
  },
  data: {
    type: Object,
    default: () => ({
      xAxis: [],
      series: []
    })
  }
})

const chartRef = ref(null)
let chart = null

function initChart() {
  if (!chartRef.value) return
  
  chart = echarts.init(chartRef.value)
  updateChart()
}

function updateChart() {
  if (!chart) return
  
  const option = {
    grid: {
      top: 10,
      right: 10,
      bottom: 20,
      left: 40,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.data.xAxis || [],
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.7)'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.7)'
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    series: [
      {
        data: props.data.series || [],
        type: 'bar',
        barWidth: '40%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#00e4ff' },
            { offset: 1, color: '#0050b3' }
          ])
        }
      }
    ]
  }
  
  chart.setOption(option)
}

function resizeChart() {
  chart && chart.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
  if (chart) {
    chart.dispose()
    chart = null
  }
  window.removeEventListener('resize', resizeChart)
})

watch(() => props.data, () => {
  updateChart()
}, { deep: true })
</script>