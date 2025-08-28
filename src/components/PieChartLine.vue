<template>
  <div class="chart-container">
    <light-beam
      :beam-count="6"
      beam-color="rgba(0, 255, 204, 0.15)"
      :rotation-speed="3000"
    />
    <particle-effect
      :particle-count="6"
      particle-color="rgba(0, 255, 204, 0.5)"
      :animation-speed="3500"
    />
    <div class="chart-box">
      <div class="chart-title">
        <div class="title">应用领域</div>
      </div>
      <div class="chart" ref="chartRef"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount, nextTick } from "vue";
import * as echarts from "echarts";
import ParticleEffect from "./ParticleEffect.vue";
import LightBeam from "./LightBeam.vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const chartRef = ref(null);
let chart = null;

function initChart() {
  if (!chartRef.value) {
    console.warn("Pie chart container not found");
    return;
  }
  try {
    chart = echarts.init(chartRef.value);
    updateChart();
    simulateClick();
  } catch (error) {
    console.error("Failed to initialize pie chart:", error);
  }
}
const simulateClick = () => {
  let currentIndex = 0;
  setInterval(() => {
    // 先取消之前的高亮
    chart &&
      chart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: currentIndex,
      });

    currentIndex = (currentIndex + 1) % 4;

    // 高亮当前项
    chart &&
      chart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: currentIndex,
      });

    // 显示 tooltip
    // chart.dispatchAction({
    //   type: "showTip",
    //   seriesIndex: 0,
    //   dataIndex: currentIndex,
    // });
  }, 2000);
};
function updateChart() {
  if (!chart) {
    console.warn("Pie chart not initialized");
    return;
  }
  const defaultData = [
    { name: "叉车", value: 350 },
    { name: "大巴车", value: 250 },
    { name: "矿车", value: 200 },
    { name: "其他", value: 200 },
  ];

  const chartData = props.data && props.data.length ? props.data : defaultData;

  if (chartData.length === 0) {
    console.warn("No data provided for pie chart");
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
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
      backgroundColor: "rgba(0, 20, 80, 0.9)",
      borderColor: "#00e4ff",
      borderWidth: 1,
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
    },
    legend: {
      // orient: "vertical",
      right: "20",
      top: "10",
      textStyle: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 12,
      },
      // itemGap: 10,
    },
    series: [
      {
        name: "应用领域",
        type: "pie",
        radius: ["30%", "70%"],
        center: ["50%", "55%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "14",
            fontWeight: "bold",
            color: "#fff",
            textShadowColor: "rgba(0, 228, 255, 0.8)",
            textShadowBlur: 10,
          },
          itemStyle: {
            shadowBlur: 0,
          },
          scaleSize: 10,
          labelLine: {
            show: true,
          },
        },
        labelLine: {
          // show: false,
          show: false,
        },
        data: chartData,
        color: [
          new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: "rgba(95, 192, 215, 1)" },
            { offset: 1, color: "rgba(95, 192, 215, 1)" },
          ]),
          new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: "rgba(89, 156, 174, 1)" },
            { offset: 1, color: "rgba(89, 156, 174, 1)" },
          ]),
          new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: "rgba(67, 122, 142, 1)" },
            { offset: 1, color: "rgba(67, 122, 142, 1)" },
          ]),
          new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: "rgba(22, 54, 76, 1)" },
            { offset: 1, color: "rgba(22, 54, 76, 1)" },
          ]),
        ],
        animation: true,
        animationDuration: 2000,
        animationEasing: "elasticOut",
        animationDelay: function (idx) {
          return idx * 200;
        },
        animationDurationUpdate: 1000,
        animationEasingUpdate: "cubicInOut",
      },
    ],
  };

  try {
    chart.setOption(option, true);
  } catch (error) {
    console.error("Failed to update pie chart:", error);
  }
}

function resizeChart() {
  if (chart) {
    try {
      chart.resize();
    } catch (error) {
      console.error("Failed to resize pie chart:", error);
    }
  }
}

onMounted(async () => {
  await nextTick();
  initChart();
  window.addEventListener("resize", resizeChart);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart);

  if (chart) {
    try {
      chart.dispose();
    } catch (error) {
      console.error("Failed to dispose pie chart:", error);
    } finally {
      chart = null;
    }
  }
});

watch(
  () => props.data,
  (newData, oldData) => {
    console.log("Pie chart data changed:", { newData, oldData });
    updateChart();
  },
  {
    deep: true,
    immediate: false,
  }
);
</script>

<style lang="less" scoped>
.chart-container {
  width: 100%;
  // padding-top: 68.86%;
  border-radius: 0.25rem;
  box-shadow: 0 0 15px rgba(0, 200, 255, 0.3);
  transition: all 0.3s ease;
  position: relative;
}
/* 
.chart-container::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: conic-gradient(
    from 0deg,
    transparent,
    rgba(0, 228, 255, 0.2),
    rgba(0, 255, 204, 0.2),
    rgba(255, 204, 0, 0.2),
    rgba(255, 102, 102, 0.2),
    transparent
  );
  border-radius: 10px;
  z-index: -1;
  animation: rotating-border 4s linear infinite;
} */

.chart-container::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 80%;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    rgba(0, 228, 255, 0.05) 0%,
    transparent 70%
  );
  border-radius: 50%;
  animation: pie-pulse 3s ease-in-out infinite;
  pointer-events: none;
}

.chart-container:hover {
  box-shadow: 0 0 30px rgba(0, 200, 255, 0.6);
  border-color: rgba(0, 228, 255, 0.6);
}

.chart-container:hover::before {
  animation-duration: 2s;
}

@keyframes rotating-border {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pie-pulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.1;
  }
}
@keyframes pie-title-glow {
  0% {
    text-shadow: 0 0 5px rgba(0, 228, 255, 0.5);
  }
  100% {
    text-shadow: 0 0 15px rgba(0, 228, 255, 0.8),
      0 0 25px rgba(0, 255, 204, 0.4), 0 0 35px rgba(255, 204, 0, 0.2);
  }
}

@keyframes pie-title-rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
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