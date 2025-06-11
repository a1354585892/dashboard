<template>
  <div class="dynamic-background">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref(null)
let animationId = null

onMounted(() => {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  
  // 设置canvas尺寸为窗口大小
  const setCanvasSize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  
  setCanvasSize()
  window.addEventListener('resize', setCanvasSize)
  
  // 粒子系统
  const particles = []
  const particleCount = 100
  
  // 创建粒子
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      color: `rgba(0, ${Math.floor(Math.random() * 150 + 100)}, ${Math.floor(Math.random() * 150 + 100)}, ${Math.random() * 0.5 + 0.1})`,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25
    })
  }
  
  // 绘制和更新粒子
  const drawParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // 绘制渐变背景
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, 'rgba(0, 10, 40, 1)')
    gradient.addColorStop(1, 'rgba(0, 20, 60, 1)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // 绘制网格
    ctx.strokeStyle = 'rgba(0, 100, 200, 0.1)'
    ctx.lineWidth = 0.5
    
    const gridSize = 50
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }
    
    // 更新和绘制粒子
    particles.forEach(particle => {
      particle.x += particle.speedX
      particle.y += particle.speedY
      
      // 边界检查
      if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
      if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
      
      // 绘制粒子
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.fill()
    })
    
    // 绘制连接线
    ctx.strokeStyle = 'rgba(0, 200, 255, 0.05)'
    ctx.lineWidth = 0.5
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }
    
    animationId = requestAnimationFrame(drawParticles)
  }
  
  drawParticles()
})

onBeforeUnmount(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', setCanvasSize)
})
</script>

<style scoped>
.dynamic-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
}

canvas {
  display: block;
}
</style>