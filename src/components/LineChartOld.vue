<template>
  <div class="chart-container">
    <ECGEffect :line-count="4" :speed="1500" color="#00e4ff" />
    <div class="chart-title">{{ title }}</div>
    <div class="chart" ref="chartRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount, nextTick } from "vue";
import * as echarts from "echarts";
import ECGEffect from "./ECGEffect.vue";

const props = defineProps({
  title: {
    type: String,
    default: "折线图",
  },
  data: {
    type: Object,
    default: () => ({
      xAxis: [],
      series: [],
    }),
  },
});

const chartRef = ref(null);
let chart = null;

function initChart() {
  if (!chartRef.value) {
    console.warn("Chart container not found");
    return;
  }

  try {
    chart = echarts.init(chartRef.value);
    updateChart();

    // 添加图表点击事件
    chart.on("click", function (params) {
      console.log("Chart clicked:", params);
    });
  } catch (error) {
    console.error("Failed to initialize chart:", error);
  }
}

function updateChart() {
  if (!chart) {
    console.warn("Chart not initialized");
    return;
  }

  // 数据验证
  const xAxisData = props.data?.xAxis || [];
  const seriesData = props.data?.series || [];

  if (xAxisData.length === 0 && seriesData.length === 0) {
    console.warn("No data provided for chart");
    // 显示空数据提示
    const emptyOption = {
      title: {
        text: "暂无数据",
        left: "center",
        top: "middle",
        textStyle: {
          color: "rgba(255, 255, 255, 0.5)",
          fontSize: 16,
        },
      },
    };
    chart.setOption(emptyOption);
    return;
  }

  const option = {
    grid: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: xAxisData,
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.3)",
        },
      },
      axisLabel: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 12,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 12,
      },
      splitLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.1)",
          type: "dashed",
        },
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        data: seriesData,
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 8,
        lineStyle: {
          width: 1,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: "#00e4ff" },
            { offset: 0.5, color: "#00ffcc" },
            { offset: 1, color: "#00e4ff" },
          ]),
          shadowColor: "rgba(0, 228, 255, 0.8)",
          shadowBlur: 10,
          shadowOffsetY: 0,
        },
        itemStyle: {
          color: "#00e4ff",
          borderColor: "#fff",
          borderWidth: 3,
          shadowColor: "rgba(0, 228, 255, 1)",
          shadowBlur: 15,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(0, 228, 255, 0.6)" },
            { offset: 0.5, color: "rgba(0, 255, 204, 0.3)" },
            { offset: 1, color: "rgba(0, 228, 255, 0.05)" },
          ]),
          shadowColor: "rgba(0, 228, 255, 0.3)",
          shadowBlur: 20,
        },
        emphasis: {
          focus: "series",
          itemStyle: {
            borderWidth: 4,
            shadowBlur: 20,
            shadowColor: "rgba(0, 228, 255, 1)",
            borderColor: "#00ffcc",
          },
          lineStyle: {
            width: 6,
            shadowBlur: 15,
          },
        },
        // 添加动画效果
        animationDuration: 2000,
        animationEasing: "cubicOut",
        animationDelay: function (idx) {
          return idx * 100;
        },
      },
    ],
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0, 20, 80, 0.9)",
      borderColor: "#00e4ff",
      borderWidth: 1,
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
      axisPointer: {
        type: "line",
        lineStyle: {
          color: "rgba(0, 228, 255, 0.5)",
          width: 2,
        },
      },
      formatter: function (params) {
        if (params && params.length > 0) {
          const param = params[0];
          return `${param.name}<br/>${param.seriesName || "数值"}: ${
            param.value
          }`;
        }
        return "";
      },
    },
    animation: true,
    animationDuration: 1000,
    animationEasing: "cubicOut",
  };

  try {
    chart.setOption(option, true); // true 表示不合并，完全替换
  } catch (error) {
    console.error("Failed to update chart:", error);
  }
}

function resizeChart() {
  if (chart) {
    try {
      chart.resize();
    } catch (error) {
      console.error("Failed to resize chart:", error);
    }
  }
}

// 使用 nextTick 确保 DOM 已经渲染
onMounted(async () => {
  await nextTick();
  initChart();
  window.addEventListener("resize", resizeChart);
});

onBeforeUnmount(() => {
  // 清理事件监听器
  window.removeEventListener("resize", resizeChart);

  // 销毁图表实例
  if (chart) {
    try {
      chart.dispose();
    } catch (error) {
      console.error("Failed to dispose chart:", error);
    } finally {
      chart = null;
    }
  }
});

// 监听数据变化，深度监听
watch(
  () => props.data,
  (newData, oldData) => {
    console.log("Chart data changed:", { newData, oldData });
    updateChart();
  },
  {
    deep: true,
    immediate: false, // 不立即执行，因为 onMounted 中已经初始化了
  }
);

// 监听容器尺寸变化
watch(
  () => chartRef.value,
  (newRef) => {
    if (newRef && !chart) {
      initChart();
    }
  }
);
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  min-height: 300px; /* 确保最小高度 */
  padding: 15px;
  background-color: rgba(0, 20, 80, 0.3);
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 200, 255, 0.3);
  border: 1px solid rgba(0, 228, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
/* 
.chart-container::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(0, 228, 255, 0.3),
    transparent,
    rgba(0, 228, 255, 0.3),
    transparent
  );
  background-size: 400% 400%;
  border-radius: 10px;
  z-index: -1;
  animation: glowing-border 3s ease-in-out infinite;
} */

.chart-container::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 228, 255, 0.1),
    transparent
  );
  animation: scanning-light 4s linear infinite;
  pointer-events: none;
}

.chart-container:hover {
  box-shadow: 0 0 30px rgba(0, 200, 255, 0.6);
  border-color: rgba(0, 228, 255, 0.6);
}

.chart-container:hover::before {
  animation-duration: 1.5s;
}

@keyframes glowing-border {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes scanning-light {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

.chart-title {
  font-size: 16px;
  font-weight: 600;
  color: #00e4ff;
  margin-bottom: 15px;
  text-align: center;
  text-shadow: 0 0 5px rgba(0, 228, 255, 0.5);
  position: relative;
  animation: title-glow 2s ease-in-out infinite alternate;
}

.chart-title::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(
    circle,
    rgba(0, 228, 255, 0.1) 0%,
    transparent 70%
  );
  animation: title-pulse 3s ease-in-out infinite;
  z-index: -1;
}

@keyframes title-glow {
  0% {
    text-shadow: 0 0 5px rgba(0, 228, 255, 0.5);
  }
  100% {
    text-shadow: 0 0 15px rgba(0, 228, 255, 0.8),
      0 0 25px rgba(0, 228, 255, 0.4);
  }
}

@keyframes title-pulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.1;
  }
}

.chart {
  width: 100%;
  height: calc(100% - 45px); /* 调整高度计算 */
  min-height: 250px; /* 确保图表区域最小高度 */
}
</style>
