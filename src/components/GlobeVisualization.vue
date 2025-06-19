<template>
  <div class="globe-container" id="container" ref="globeContainer"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import earthFlyLine from "earth-flyline";
import geojson from "../common/world.json";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const globeContainer = ref(null);
let earthInstance = null;

// 地球配置
const earthConfig = {
  bgStyle: {
    color: "#00DCEB",
    opacity: 0,
  },
  mapStyle: {
    areaColor: "#187BB2", // 地区
    lineColor: "#00DCEB",
  },
  spriteStyle: {
    color: "#00DCEB",
    size: 2.5,
    show: true,
  },
  pathStyle: {
    color: "#00DCEB",
    show: true,
  },
  flyLineStyle: {
    color: "#00DCEB",
    show: true,
  },
  roadStyle: {
    flyLineStyle: {
      color: "#00DCEB",
    },
    pathStyle: {
      color: "#00DCEB",
    },
  },
  scatterStyle: {
    color: "#00DCEB",
  },
  wallStyle: {
    color: "#00DCEB",
    opacity: 0.5,
  },
  mapStreamStyle: {
    color: "#00DCEB",
    opacity: 1,
    speed: 1,
    splitLine: 3,
  },
  // 地球
  earth: {
    color: "#00142C",
  },
};

onMounted(() => {
  initEarth();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  if (earthInstance) {
    earthInstance.dispose();
  }
});

function initEarth() {
  earthFlyLine.registerMap("world", geojson);

  const dom = document.getElementById("container");
  const chart = earthFlyLine.init({
    dom,
    map: "world",
    config: earthConfig,
    rotateSpeed: 0.002,
  });

  const chinaData = geojson.features.find((item) => {
    return item.properties.name === "China";
  }).geometry.coordinates;
  chinaData.forEach((item) => {
    chart.addData("mapStreamLine", {
      data: item, //请注意 data 的数据结构: [[[lon,lat],[lon,lat],[lon,lat]]] 三维数组，第一维代表多边形，第二维代表多边形的点位，第三维代表点位的经纬度
      style: {
        //...
        color: "#f0f0f0",
        opacity: 0.5,
        speed: 1,
        splitLine: 3,
      },
    });
  });
  const flyLineData = [
    {
      from: {
        id: 1,
        lon: 117.285, //经度
        lat: 34.204, //维度
      },
      to: {
        id: 2,
        lon: 14.23, //经度
        lat: 52.203, //维度
      },
    },
    {
      from: { id: 1, lon: 117.285, lat: 34.204 },
      to: { id: 2, lon: 100.5018, lat: 13.7563 }, // 泰国 曼谷
    },
    {
      from: { id: 1, lon: 117.285, lat: 34.204 },
      to: { id: 3, lon: 101.6869, lat: 3.139 }, // 马来西亚 吉隆坡
    },
    {
      from: { id: 1, lon: 117.285, lat: 34.204 },
      to: { id: 4, lon: 28.9784, lat: 41.0082 }, // 土耳其 伊斯坦布尔
    },
    {
      from: { id: 1, lon: 117.285, lat: 34.204 },
      to: { id: 5, lon: 46.6753, lat: 24.7136 }, // 沙特阿拉伯 利雅得
    },
    {
      from: { id: 1, lon: 117.285, lat: 34.204 },
      to: { id: 6, lon: -0.1276, lat: 51.5074 }, // 英国 伦敦
    },
    {
      from: { id: 1, lon: 117.285, lat: 34.204 },
      to: { id: 7, lon: 2.3522, lat: 48.8566 }, // 法国 巴黎
    },
    {
      from: { id: 1, lon: 117.285, lat: 34.204 },
      to: { id: 8, lon: 151.2093, lat: -33.8688 }, // 澳大利亚 悉尼
    },
    {
      from: { id: 1, lon: 117.285, lat: 34.204 },
      to: { id: 9, lon: -74.006, lat: 40.7128 }, // 美国 纽约
    },
    {
      from: { id: 1, lon: 117.285, lat: 34.204 },
      to: { id: 10, lon: 37.6173, lat: 55.7558 }, // 俄罗斯 莫斯科
    },
    {
      from: { id: 1, lon: 117.285, lat: 34.204 },
      to: { id: 11, lon: 139.6917, lat: 35.6895 }, // 日本 东京
    },
  ];
  chart.addData("flyLine", flyLineData);
}

function updateEarthData() {
  if (!earthInstance || !props.data || props.data.length === 0) return;

  // 清除现有数据
  earthInstance.clear();

  // 准备点数据
  const points = [];
  const uniqueLocations = new Set();

  // 收集所有唯一的地点
  props.data.forEach((item) => {
    const fromKey = `${item.from[0]},${item.from[1]}`;
    const toKey = `${item.to[0]},${item.to[1]}`;

    if (!uniqueLocations.has(fromKey)) {
      uniqueLocations.add(fromKey);
      points.push({
        name: item.fromName || "起点",
        coordinate: item.from,
        value: item.value || 100,
      });
    }

    if (!uniqueLocations.has(toKey)) {
      uniqueLocations.add(toKey);
      points.push({
        name: item.toName || "终点",
        coordinate: item.to,
        value: item.value || 100,
      });
    }
  });

  // 添加散点
  earthInstance.addScatter(points);

  // 添加飞线
  const flylines = props.data.map((item) => ({
    source: item.from,
    target: item.to,
    value: item.value || 100,
    name: item.name || `${item.fromName || "起点"} - ${item.toName || "终点"}`,
  }));

  earthInstance.addFlyLine(flylines);

  // 渲染地球
  earthInstance.render();
}

function handleResize() {
  if (earthInstance && globeContainer.value) {
    earthInstance.resize();
  }
}

// 监听数据变化
watch(
  () => props.data,
  () => {
    updateEarthData();
  },
  { deep: true }
);
</script>

<style scoped>
.globe-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: rgba(4, 13, 33, 0.3);
  border-radius: 8px;
}
</style>
