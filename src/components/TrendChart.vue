<template>
  <div class="chart-container">
    <div class="chart-title">{{ title }}</div>
    <div class="chart" ref="chartRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  title: {
    type: String,
    default: "趋势图",
  },
  data: {
    type: Array,
    default: () => [],
  },
});

const chartRef = ref(null);
let chart = null;

function initChart() {
  if (!chartRef.value) return;

  chart = echarts.init(chartRef.value);
  updateChart();
}

function updateChart() {
  if (!chart) return;

  const option = {
    grid: {
      top: 10,
      right: 10,
      bottom: 20,
      left: 40,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.3)",
        },
      },
      axisLabel: {
        color: "rgba(255, 255, 255, 0.7)",
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: "rgba(255, 255, 255, 0.7)",
      },
      splitLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
    series: [
      {
        data: props.data.length
          ? props.data
          : [4200, 4500, 4800, 4300, 4100, 4600, 4700],
        type: "line",
        smooth: true,
        symbol: "none",
        lineStyle: {
          width: 1,
          color: "#00e4ff",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(0, 228, 255, 0.5)" },
            { offset: 1, color: "rgba(0, 228, 255, 0.05)" },
          ]),
        },
      },
    ],
  };

  chart.setOption(option);
}

function resizeChart() {
  chart && chart.resize();
}

onMounted(() => {
  initChart();
  window.addEventListener("resize", resizeChart);
});

onBeforeUnmount(() => {
  if (chart) {
    chart.dispose();
    chart = null;
  }
  window.removeEventListener("resize", resizeChart);
});

watch(
  () => props.data,
  () => {
    updateChart();
  },
  { deep: true }
);
</script>