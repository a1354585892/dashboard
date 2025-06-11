<template>
  <div class="effects-demo">
    <h1>✨ 动态光线效果演示</h1>

    <div class="demo-grid">
      <!-- 折线图演示 -->
      <div class="demo-card">
        <h3>💓 折线图 - 心电图背景效果</h3>
        <div class="chart-demo">
          <line-chart title="销售趋势" :data="lineData" />
        </div>
        <div class="effect-description">
          <p>✨ 扫描光线边框</p>
          <p>🌟 标题发光动画</p>
          <p>💓 心电图背景波形</p>
          <p>📊 医疗级网格线</p>
          <p>🎨 渐变线条阴影</p>
        </div>
      </div>

      <!-- 环形图演示 -->
      <div class="demo-card">
        <h3>🤍 环形图 - 白色边框 + 柔和光效</h3>
        <div class="chart-demo">
          <pie-chart title="业务占比" :data="pieData" />
        </div>
        <div class="effect-description">
          <p>🤍 白色1px边框</p>
          <p>💫 柔和标题光效</p>
          <p>⚡ 半透明光束</p>
          <p>✨ 减少粒子数量</p>
          <p>🎭 50%透明度光效</p>
        </div>
      </div>
      <!-- 环形图演示 -->
      <div class="demo-card">
        <h3>🤍 环形图 - 视觉引导线</h3>
        <div class="chart-demo">
          <pie-chart-line title="业务占比" :data="pieData" />
        </div>
        <div class="effect-description">
          <p>🤍 白色1px边框</p>
          <p>💫 柔和标题光效</p>
          <p>⚡ 半透明光束</p>
          <p>✨ 减少粒子数量</p>
          <p>🎭 50%透明度光效</p>
        </div>
      </div>

      <!-- 单独效果演示 -->
      <div class="demo-card">
        <h3>🎪 粒子效果演示</h3>
        <div class="effect-demo">
          <particle-effect
            :particle-count="30"
            particle-color="#ff6b6b"
            :animation-speed="2000"
          />
          <div class="demo-content">粒子漂浮效果</div>
        </div>
      </div>

      <div class="demo-card">
        <h3>⚡ 光束效果演示</h3>
        <div class="effect-demo">
          <light-beam
            :beam-count="12"
            beam-color="rgba(255, 107, 107, 0.4)"
            :rotation-speed="1500"
          />
          <div class="demo-content">旋转光束效果</div>
        </div>
      </div>

      <div class="demo-card">
        <h3>💓 心电图效果演示</h3>
        <div class="effect-demo">
          <ECGEffect :line-count="5" :speed="1200" color="#00e4ff" />
          <div class="demo-content">心电图背景波形</div>
        </div>
      </div>
    </div>

    <div class="controls">
      <button @click="refreshData" class="glow-button">🔄 刷新数据</button>
      <router-link to="/" class="glow-button">🏠 返回主页</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import LineChart from "../components/LineChartOld.vue";
import PieChart from "../components/PieChart.vue";
import PieChartLine from "../components/PieChartLine.vue";
import ParticleEffect from "../components/ParticleEffect.vue";
import LightBeam from "../components/LightBeam.vue";
import ECGEffect from "../components/ECGEffect.vue";

const lineData = ref({
  xAxis: ["1月", "2月", "3月", "4月", "5月", "6月"],
  series: [320, 280, 350, 400, 380, 420],
});

const pieData = ref([
  { name: "移动端", value: 45 },
  { name: "桌面端", value: 30 },
  { name: "平板端", value: 15 },
  { name: "其他", value: 10 },
]);

function refreshData() {
  // 随机更新折线图数据
  lineData.value = {
    xAxis: ["1月", "2月", "3月", "4月", "5月", "6月"],
    series: Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * 300) + 200
    ),
  };

  // 随机更新饼图数据
  pieData.value = [
    { name: "移动端", value: Math.floor(Math.random() * 50) + 20 },
    { name: "桌面端", value: Math.floor(Math.random() * 40) + 15 },
    { name: "平板端", value: Math.floor(Math.random() * 30) + 10 },
    { name: "其他", value: Math.floor(Math.random() * 20) + 5 },
  ];
}
</script>

<style scoped>
.effects-demo {
  padding: 20px;
  background: linear-gradient(135deg, #0c1445 0%, #1a2980 50%, #26d0ce 100%);
  min-height: 100vh;
  color: white;
}

h1 {
  text-align: center;
  color: #00e4ff;
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-shadow: 0 0 20px rgba(0, 228, 255, 0.8);
  animation: title-rainbow 3s ease-in-out infinite alternate;
}

@keyframes title-rainbow {
  0% {
    color: #00e4ff;
  }
  25% {
    color: #00ffcc;
  }
  50% {
    color: #ffcc00;
  }
  75% {
    color: #ff6666;
  }
  100% {
    color: #00e4ff;
  }
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.demo-card {
  background: rgba(0, 20, 80, 0.4);
  border-radius: 15px;
  padding: 20px;
  border: 1px solid rgba(0, 228, 255, 0.3);
  box-shadow: 0 0 20px rgba(0, 228, 255, 0.2);
  transition: all 0.3s ease;
}

.demo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 228, 255, 0.4);
}

.demo-card h3 {
  color: #00ffcc;
  margin-bottom: 15px;
  text-align: center;
}

.chart-demo {
  height: 300px;
  margin-bottom: 15px;
}

.effect-demo {
  height: 200px;
  position: relative;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-content {
  font-size: 18px;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

.effect-description {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

.effect-description p {
  margin: 5px 0;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.glow-button {
  padding: 12px 24px;
  background: rgba(0, 228, 255, 0.2);
  border: 2px solid #00e4ff;
  border-radius: 25px;
  color: #00e4ff;
  text-decoration: none;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  animation: button-glow 2s ease-in-out infinite alternate;
}

.glow-button:hover {
  background: rgba(0, 228, 255, 0.4);
  box-shadow: 0 0 20px rgba(0, 228, 255, 0.8);
  transform: scale(1.05);
}

@keyframes button-glow {
  0% {
    box-shadow: 0 0 5px rgba(0, 228, 255, 0.5);
  }
  100% {
    box-shadow: 0 0 15px rgba(0, 228, 255, 0.8);
  }
}
</style>
