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
    <div class="chart-title">{{ title }}</div>
    <div class="chart" ref="chartRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount, nextTick } from "vue";
import * as echarts from "echarts";
import ParticleEffect from "./ParticleEffect.vue";
import LightBeam from "./LightBeam.vue";

const props = defineProps({
  title: {
    type: String,
    default: "饼图",
  },
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
  } catch (error) {
    console.error("Failed to initialize pie chart:", error);
  }
}

function updateChart() {
  if (!chart) {
    console.warn("Pie chart not initialized");
    return;
  }

  const defaultData = [
    { name: "类别1", value: 35 },
    { name: "类别2", value: 25 },
    { name: "类别3", value: 20 },
    { name: "类别4", value: 20 },
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
      orient: "vertical",
      right: 10,
      top: "center",
      textStyle: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 12,
      },
      itemGap: 10,
    },
    series: [
      {
        name: props.title,
        type: "pie",
        radius: ["45%", "75%"],
        center: ["40%", "50%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 15,
          borderColor: "rgba(3, 9, 41, 0.8)",
          borderWidth: 1,
          shadowBlur: 20,
          shadowColor: function (params) {
            const colors = [
              "rgba(0, 228, 255, 0.8)",
              "rgba(0, 102, 255, 0.8)",
              "rgba(0, 255, 204, 0.8)",
              "rgba(255, 204, 0, 0.8)",
              "rgba(255, 102, 102, 0.8)",
            ];
            return colors[params.dataIndex % colors.length];
          },
          shadowOffsetX: 0,
          shadowOffsetY: 0,
        },
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
            shadowBlur: 30,
            shadowColor: function (params) {
              const colors = [
                "rgba(0, 228, 255, 1)",
                "rgba(0, 102, 255, 1)",
                "rgba(0, 255, 204, 1)",
                "rgba(255, 204, 0, 1)",
                "rgba(255, 102, 102, 1)",
              ];
              return colors[params.dataIndex % colors.length];
            },
            borderWidth: 4,
            borderColor: "#fff",
          },
          scaleSize: 10,
        },
        labelLine: {
          show: false,
        },
        data: chartData,
        color: [
          new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: "#00e4ff" },
            { offset: 1, color: "#0099cc" },
          ]),
          new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: "#0066ff" },
            { offset: 1, color: "#003399" },
          ]),
          new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: "#00ffcc" },
            { offset: 1, color: "#00cc99" },
          ]),
          new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: "#ffcc00" },
            { offset: 1, color: "#cc9900" },
          ]),
          new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            { offset: 0, color: "#ff6666" },
            { offset: 1, color: "#cc3333" },
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

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  min-height: 300px;
  padding: 15px;
  background-color: rgba(0, 20, 80, 0.3);
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 200, 255, 0.3);
  border: 1px solid #00e4ff;
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

.chart-title {
  font-size: 16px;
  font-weight: 600;
  color: #00e4ff;
  margin-bottom: 15px;
  text-align: center;
  text-shadow: 0 0 5px rgba(0, 228, 255, 0.5);
  position: relative;
  animation: pie-title-glow 2.5s ease-in-out infinite alternate;
}

.chart-title::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150%;
  height: 150%;
  background: conic-gradient(
    from 0deg,
    rgba(0, 228, 255, 0.05),
    rgba(0, 255, 204, 0.05),
    rgba(255, 204, 0, 0.05),
    rgba(255, 102, 102, 0.05),
    rgba(0, 228, 255, 0.05)
  );
  border-radius: 50%;
  animation: pie-title-rotate 6s linear infinite;
  z-index: -1;
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

.chart {
  width: 100%;
  height: calc(100% - 45px);
  min-height: 250px;
}
</style>