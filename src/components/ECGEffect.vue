<template>
  <div class="ecg-container">
    <svg class="ecg-svg" viewBox="0 0 800 200" preserveAspectRatio="none">
      <defs>
        <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color: #00e4ff; stop-opacity: 0" />
          <stop offset="50%" style="stop-color: #00e4ff; stop-opacity: 0.8" />
          <stop offset="100%" style="stop-color: #00e4ff; stop-opacity: 0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- 心电图波形线 -->
      <path
        v-for="(line, index) in ecgLines"
        :key="index"
        :d="line.path"
        :style="getLineStyle(line, index)"
        class="ecg-line"
      />

      <!-- 网格线 -->
      <g class="grid-lines" opacity="0.2">
        <!-- 垂直网格线 -->
        <line
          v-for="x in verticalLines"
          :key="`v-${x}`"
          :x1="x"
          y1="0"
          :x2="x"
          y2="200"
          stroke="#00e4ff"
          stroke-width="0.5"
        />
        <!-- 水平网格线 -->
        <line
          v-for="y in horizontalLines"
          :key="`h-${y}`"
          x1="0"
          :y1="y"
          x2="800"
          :y2="y"
          stroke="#00e4ff"
          stroke-width="0.5"
        />
      </g>
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  lineCount: {
    type: Number,
    default: 3,
  },
  speed: {
    type: Number,
    default: 2000,
  },
  color: {
    type: String,
    default: "#00e4ff",
  },
});

const ecgLines = ref([]);
const verticalLines = ref([]);
const horizontalLines = ref([]);
let animationFrame = null;

// 生成心电图波形路径
function generateECGPath(offset = 0, amplitude = 1) {
  const points = [];
  const width = 800;
  const centerY = 100;

  for (let x = 0; x <= width; x += 2) {
    let y = centerY;

    // 心电图特征波形
    const normalizedX = (x + offset) % 200;

    if (normalizedX < 20) {
      // P波
      y += Math.sin((normalizedX / 20) * Math.PI) * 8 * amplitude;
    } else if (normalizedX >= 40 && normalizedX < 60) {
      // QRS复合波
      if (normalizedX < 45) {
        y -= (normalizedX - 40) * 4 * amplitude; // Q波
      } else if (normalizedX < 50) {
        y += (normalizedX - 45) * 12 * amplitude; // R波
      } else if (normalizedX < 55) {
        y -= (normalizedX - 50) * 8 * amplitude; // S波
      } else {
        y += (55 - normalizedX) * 2 * amplitude;
      }
    } else if (normalizedX >= 80 && normalizedX < 120) {
      // T波
      y += Math.sin(((normalizedX - 80) / 40) * Math.PI) * 12 * amplitude;
    }

    // 添加一些随机噪声
    y += (Math.random() - 0.5) * 2 * amplitude;

    points.push(`${x},${y}`);
  }

  return `M ${points.join(" L ")}`;
}

function createECGLine(index) {
  return {
    path: generateECGPath(index * 50, 0.8 + Math.random() * 0.4),
    offset: index * 50,
    speed: 0.5 + Math.random() * 0.5,
    opacity: 0.6 + Math.random() * 0.4,
    amplitude: 0.8 + Math.random() * 0.4,
  };
}

function initECG() {
  // 初始化心电图线条
  ecgLines.value = [];
  for (let i = 0; i < props.lineCount; i++) {
    ecgLines.value.push(createECGLine(i));
  }

  // 生成网格线
  verticalLines.value = [];
  for (let x = 0; x <= 800; x += 40) {
    verticalLines.value.push(x);
  }

  horizontalLines.value = [];
  for (let y = 0; y <= 200; y += 20) {
    horizontalLines.value.push(y);
  }
}

function updateECG() {
  ecgLines.value.forEach((line) => {
    line.offset += line.speed;
    if (line.offset > 800) {
      line.offset = -200;
    }
    line.path = generateECGPath(line.offset, line.amplitude);
  });
}

function animate() {
  updateECG();
  animationFrame = requestAnimationFrame(animate);
}

function getLineStyle(line, index) {
  return {
    stroke: props.color,
    strokeWidth: 2 - index * 0.2,
    fill: "none",
    opacity: line.opacity,
    filter: "url(#glow)",
    strokeDasharray: index === 0 ? "none" : "5,5",
    animationDelay: `${index * 0.5}s`,
  };
}

onMounted(() => {
  initECG();
  animate();
});

onBeforeUnmount(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
});
</script>

<style scoped>
.ecg-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  opacity: 0.6;
}

.ecg-svg {
  width: 100%;
  height: 100%;
}

.ecg-line {
  animation: ecg-pulse 2s ease-in-out infinite;
}

.grid-lines {
  animation: grid-fade 4s ease-in-out infinite alternate;
}

@keyframes ecg-pulse {
  0%,
  100% {
    filter: drop-shadow(0 0 3px currentColor);
  }
  50% {
    filter: drop-shadow(0 0 8px currentColor);
  }
}

@keyframes grid-fade {
  0% {
    opacity: 0.1;
  }
  100% {
    opacity: 0.3;
  }
}
</style>
