<template>
  <div class="chart-container">
    <ECGEffect :line-count="4" :speed="1500" color="#00e4ff" />
    <div class="chart-box">
      <div class="chart-title">
        <div class="title">充放电趋势</div>
      </div>
      <div class="chart" ref="chartRef"></div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  watch,
  onBeforeUnmount,
  nextTick,
  computed,
} from "vue";
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

// 默认数据
const defaultXAxisData = [
  "周一",
  "周二",
  "周三",
  "周四",
  "周五",
  "周六",
  "周日",
];
const defaultSeriesData = [5000, 6000, 4000, 7000, 5500, 6500, 4500];
const defaultSeriesData1 = [5200, 4200, 2200, 9200, 3700, 5700, 4700];

// 计算实际使用的数据
const xAxisData = computed(() => {
  if (props.data && props.data.length > 0) {
    return props.data.map((item) => item.date);
  }
  return defaultXAxisData;
});

const seriesData = computed(() => {
  if (props.data && props.data.length) {
    return props.data.map((item) => item.chargeCap);
  }
  return defaultSeriesData;
});

const seriesData1 = computed(() => {
  if (props.data && props.data.length) {
    return props.data.map((item) => item.dischargeCap);
  }
  return defaultSeriesData1;
});
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
function refreshChartWithAnimation() {
  if (chart) {
    chart.dispose(); // 销毁原图表实例
  }
  chart = echarts.init(chartRef.value); // 重新初始化实例
  updateChart(); // 再执行绘制逻辑
}
const simulateClick = () => {
  setInterval(() => {
    // xAxisData = xAxis;
    refreshChartWithAnimation();
  }, 5000);
};

function updateChart() {
  if (!chart) {
    console.warn("Chart not initialized");
    return;
  }

  if (xAxisData.value.length === 0 && seriesData.value.length === 0) {
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
      top: "20%",
      right: 0,
      bottom: "10%",
      left: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: xAxisData.value,
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0)",
        },
      },
      axisLabel: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 12,
        show: false,
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
        data: seriesData.value,
        type: "line",
        name: "充电",
        // smooth: true,
        symbol: "circle",
        symbolSize: 0,
        lineStyle: {
          width: 1,
          color: "#3ECDDA",
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
        emphasis: {
          focus: "series",
        },
        // 添加动画效果
        animationDuration: 3000,
        animationEasing: "cubicOut",
        animationDelay: function (idx) {
          return idx * 100;
        },
      },
      {
        data: seriesData1.value,
        type: "line",
        name: "放电",
        // smooth: true,
        symbol: "circle",
        symbolSize: 0,
        lineStyle: {
          width: 1,
          color: "#73ADFF",
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
        emphasis: {
          // focus: "series",
          // itemStyle: {
          //   borderWidth: 4,
          //   shadowBlur: 20,
          //   shadowColor: "rgba(0, 228, 255, 1)",
          //   borderColor: "#00ffcc",
          // },
          // lineStyle: {
          //   width: 6,
          //   shadowBlur: 15,
          // },
        },
        // 添加动画效果
        animationDuration: 3000,
        animationEasing: "cubicOut",
        animationDurationUpdate: 10000,
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
          return `${params[0].name}<br/>${params[0].seriesName || "数值"}: ${
            params[0].value
          }<br/>${params[1].seriesName || "数值"}: ${params[1].value}`;
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
  simulateClick();
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

// 监听容器尺寸变化
watch(
  () => chartRef.value,
  (newRef) => {
    if (newRef && !chart) {
      initChart();
    }
  }
);

// 监听props数据变化
watch(
  () => props.data,
  () => {
    if (chart) {
      updateChart();
    }
  },
  { deep: true }
);
</script>

<style lang="less" scoped>
.chart-container {
  width: 100%;
  height: 100%;
  min-height: 0; /* 移除固定最小高度，让flex控制 */
  padding: var(--spacing-md);
  background-color: rgba(0, 20, 80, 0.3);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(0, 228, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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

.chart-box {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  left: 0px;
  margin-left: 1px;
  // border-radius: 8px;
  background: #00142c;
  border-radius: 3%;
  &::after {
    display: block;
    content: "";
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    position: absolute;
    left: -1px;
    top: -1px;
    border-radius: 3%;
    background-image: linear-gradient(139deg, #00dceb, #00345f);
    z-index: -1;
  }
  .chart-title {
    position: absolute;
    left: 0;
    top: 0;
    width: 37%;
    padding-top: 7.4%;
    background: url("../assets/title-mark.png") no-repeat center center;
    background-size: 100% 100%;

    .title {
      position: absolute;
      width: 100%;
      height: 100%;
      inset: 0;
      text-align: left;
      display: flex;
      align-items: center;
      padding-left: 10%;
    }
  }
}
.chart {
  width: 100%;
  height: 100%;
  /* min-height: 250px; */
}
</style>
