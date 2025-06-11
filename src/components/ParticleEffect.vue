<template>
  <div class="particle-container" ref="particleContainer">
    <div 
      v-for="(particle, index) in particles" 
      :key="index"
      class="particle"
      :style="getParticleStyle(particle)"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  particleCount: {
    type: Number,
    default: 20
  },
  particleColor: {
    type: String,
    default: '#00e4ff'
  },
  animationSpeed: {
    type: Number,
    default: 3000
  }
})

const particleContainer = ref(null)
const particles = ref([])
let animationFrame = null

function createParticle() {
  return {
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    opacity: Math.random() * 0.8 + 0.2,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
    life: Math.random() * 100,
    maxLife: 100
  }
}

function initParticles() {
  particles.value = []
  for (let i = 0; i < props.particleCount; i++) {
    particles.value.push(createParticle())
  }
}

function updateParticles() {
  particles.value.forEach(particle => {
    particle.x += particle.speedX
    particle.y += particle.speedY
    particle.life -= 1

    // 边界检测
    if (particle.x < 0 || particle.x > 100) particle.speedX *= -1
    if (particle.y < 0 || particle.y > 100) particle.speedY *= -1

    // 重生粒子
    if (particle.life <= 0) {
      Object.assign(particle, createParticle())
    }

    // 更新透明度
    particle.opacity = (particle.life / particle.maxLife) * 0.8 + 0.2
  })
}

function animate() {
  updateParticles()
  animationFrame = requestAnimationFrame(animate)
}

function getParticleStyle(particle) {
  return {
    left: `${particle.x}%`,
    top: `${particle.y}%`,
    width: `${particle.size}px`,
    height: `${particle.size}px`,
    opacity: particle.opacity,
    backgroundColor: props.particleColor,
    boxShadow: `0 0 ${particle.size * 2}px ${props.particleColor}`
  }
}

onMounted(() => {
  initParticles()
  animate()
})

onBeforeUnmount(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<style scoped>
.particle-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  border-radius: 50%;
  transition: all 0.1s ease;
  animation: particle-twinkle 2s ease-in-out infinite alternate;
}

@keyframes particle-twinkle {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.5);
  }
}
</style>
