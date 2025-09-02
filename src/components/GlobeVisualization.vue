<template>
  <div class="globe-wrapper">
    <!-- 加载状态 -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner">
        <div class="spinner-ring"></div>
        <div class="loading-text"></div>
      </div>
    </div>

    <!-- 地球容器 -->
    <div
      class="globe-container"
      id="container"
      ref="globeContainer"
      :class="{ 'globe-hidden': isLoading }"
    ></div>
  </div>
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
const isLoading = ref(true);
let earthInstance = null;

// 地球配置
const earthConfig = {
  R: 150, // 大小
  // bgStyle: {
  //   color: "00ffff", // 设置为透明，避免白色背景
  //   opacity: 1,
  // },
  stopRotateByHover: true, // 鼠标划过，地球停止转动
  mapStyle: {
    areaColor: "#0080b3", // 国家地区背景
    lineColor: "#00DCEB", // 地区边界颜色
  },
  spriteStyle: {
    color: "#0080b3", // 光晕颜色
    // size: 2.5,
    show: true,
  },
  pathStyle: {
    color: "#00DCEB", // 飞线基础颜色
    show: true,
  },
  flyLineStyle: {
    color: "#00DCEB", // 飞线流星颜色
    show: true,
  },
  // roadStyle: {
  //   flyLineStyle: {
  //     color: "#00DCEB", //
  //   },
  //   pathStyle: {
  //     color: "#00DCEB",
  //   },
  // },
  scatterStyle: {
    color: "#00DCEB",
  },
  wallStyle: {
    color: "#00DCEB",
    opacity: 0.5,
  },
  mapStreamStyle: {
    color: "#ff0000",
    opacity: 1,
    speed: 1,
    splitLine: 3,
  },
  // 地球
  earth: {
    color: "#05345F", // 整体颜色(海洋)
    // material: "MeshPhongMaterial", //材质类型
    dragConfig: {
      disableY: true,
    },
  },
  // 场景背景设置为透明
  scene: {
    background: "transparent",
  },
  // 渲染器背景设置
  renderer: {
    alpha: true, // 启用透明度
    antialias: true,
    clearColor: "transparent", // 清除颜色设为透明
  },
  hoverRegionStyle: {
    show: false,
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

async function initEarth() {
  try {
    // 设置加载状态
    isLoading.value = true;

    earthFlyLine.registerMap("world", geojson);

    const dom = document.getElementById("container");
    const chart = earthFlyLine.init({
      dom,
      map: "world",
      config: earthConfig,
      rotateSpeed: 0.002,
      bgStyle: {
        color: "#0000FF",
        opacity: 1,
      },
      // light: "RectAreaLight", //  通透性： AmbientLight | 线形：PointLight | 定向手电筒：DirectionalLight | 和前面没啥区别 RectAreaLight
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

    // 存储实例
    earthInstance = chart;

    // 使用多种方式检测加载完成
    let loadingTimer = null;
    let checkCount = 0;
    const maxChecks = 30; // 最多检查30次

    const checkLoadingComplete = () => {
      checkCount++;

      // 检查DOM中是否有canvas元素（表示地球已渲染）
      const canvas = globeContainer.value?.querySelector("canvas");
      const hasCanvas = canvas && canvas.width > 0 && canvas.height > 0;

      if (hasCanvas || checkCount >= maxChecks) {
        // 地球加载完成或达到最大检查次数
        clearInterval(loadingTimer);
        // 再等待一小段时间确保渲染完成
        setTimeout(() => {
          isLoading.value = false;
        }, 300);
      }
    };

    // 每100ms检查一次
    loadingTimer = setInterval(checkLoadingComplete, 100);

    // 保险起见，最多2秒后强制显示
    setTimeout(() => {
      if (isLoading.value) {
        clearInterval(loadingTimer);
        isLoading.value = false;
      }
    }, 2000);
  } catch (error) {
    console.error("地球初始化失败:", error);
    // 即使失败也要隐藏加载状态
    isLoading.value = false;
  }
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
.globe-wrapper {
  width: 100%;
  height: 105%;
  position: relative;
  border-radius: 8px;

  overflow: hidden;
}

.globe-container {
  width: 100%;
  height: 100%;
  position: relative;

  border-radius: 8px;
  transition: opacity 0.5s ease-in-out;
}

.globe-hidden {
  opacity: 0;
  pointer-events: none;
}

.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    135deg,
    rgba(4, 13, 33, 0.9),
    rgba(0, 20, 50, 0.7)
  );
  border-radius: 8px;
  z-index: 10;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.spinner-ring {
  width: 60px;
  height: 60px;
  border: 3px solid rgba(0, 228, 255, 0.2);
  border-top: 3px solid #00e4ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  box-shadow: 0 0 20px rgba(0, 228, 255, 0.3);
}

.loading-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 1px;
  text-shadow: 0 0 10px rgba(0, 228, 255, 0.5);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 确保地球库内部的canvas也有正确的背景 */
.globe-container canvas {
  background: transparent !important;
  border-radius: 8px;
}

/* 针对可能的白色背景进行覆盖 */
.globe-container * {
  background-color: transparent !important;
}

/* 针对WebGL渲染器的特殊处理 */
.globe-container div[style*="background"] {
  background: transparent !important;
}

/* 确保加载动画的平滑过渡 */
.loading-container {
  animation: fadeIn 0.3s ease-in-out;
}

.globe-container:not(.globe-hidden) {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
