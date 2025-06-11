<template>
  <div class="light-beam-container">
    <div
      v-for="(beam, index) in lightBeams"
      :key="index"
      class="light-beam"
      :style="getLightBeamStyle(beam)"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  beamCount: {
    type: Number,
    default: 8,
  },
  beamColor: {
    type: String,
    default: "#00e4ff",
  },
  rotationSpeed: {
    type: Number,
    default: 2000,
  },
});

const lightBeams = ref([]);
let animationFrame = null;

function createLightBeam(index) {
  const angle = (360 / props.beamCount) * index;
  return {
    angle: angle,
    length: Math.random() * 40 + 30,
    width: Math.random() * 2 + 1,
    opacity: Math.random() * 0.6 + 0.2,
    rotationSpeed: Math.random() * 0.5 + 0.5,
    pulseDuration: Math.random() * 2000 + 1000,
    startTime: Date.now() + Math.random() * 2000,
  };
}

function initLightBeams() {
  lightBeams.value = [];
  for (let i = 0; i < props.beamCount; i++) {
    lightBeams.value.push(createLightBeam(i));
  }
}

function updateLightBeams() {
  const currentTime = Date.now();

  lightBeams.value.forEach((beam, index) => {
    // 旋转光束
    beam.angle += beam.rotationSpeed;
    if (beam.angle >= 360) beam.angle -= 360;

    // 脉冲效果
    const pulseProgress =
      ((currentTime - beam.startTime) % beam.pulseDuration) /
      beam.pulseDuration;
    beam.opacity = 0.2 + 0.6 * Math.sin(pulseProgress * Math.PI * 2);
    beam.length = 30 + 20 * Math.sin(pulseProgress * Math.PI * 2);
  });
}

function animate() {
  updateLightBeams();
  animationFrame = requestAnimationFrame(animate);
}

function getLightBeamStyle(beam) {
  return {
    transform: `rotate(${beam.angle}deg)`,
    width: `${beam.width}px`,
    height: `${beam.length}%`,
    opacity: beam.opacity,
    background: `linear-gradient(to top, 
      transparent 0%, 
      ${props.beamColor} 50%, 
      transparent 100%
    )`,
    boxShadow: `0 0 ${beam.width * 3}px ${props.beamColor}`,
    transformOrigin: "bottom center",
  };
}

onMounted(() => {
  initLightBeams();
  animate();
});

onBeforeUnmount(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
});
</script>

<style scoped>
.light-beam-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  overflow: hidden;
  margin-right: 20px;
  margin-top: 20px;
}

.light-beam {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform-origin: bottom center;
  border-radius: 50% 50% 0 0;
  animation: beam-flicker 3s ease-in-out infinite;
}

@keyframes beam-flicker {
  0%,
  100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.5);
  }
}
</style>
