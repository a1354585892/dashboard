<template>
  <div class="chart-test">
    <h2>图表测试页面</h2>
    
    <div class="test-section">
      <h3>折线图测试</h3>
      <div class="chart-wrapper">
        <line-chart 
          title="测试折线图" 
          :data="testLineData" 
        />
      </div>
    </div>

    <div class="test-section">
      <h3>空数据测试</h3>
      <div class="chart-wrapper">
        <line-chart 
          title="空数据图表" 
          :data="emptyData" 
        />
      </div>
    </div>

    <div class="controls">
      <button @click="updateData">更新数据</button>
      <button @click="clearData">清空数据</button>
      <button @click="randomData">随机数据</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LineChart from '../components/LineChart.vue'

const testLineData = ref({
  xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  series: [120, 200, 150, 80, 70, 110, 130]
})

const emptyData = ref({
  xAxis: [],
  series: []
})

function updateData() {
  testLineData.value = {
    xAxis: ['1月', '2月', '3月', '4月', '5月', '6月'],
    series: [300, 280, 350, 400, 380, 420]
  }
}

function clearData() {
  testLineData.value = {
    xAxis: [],
    series: []
  }
}

function randomData() {
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  const randomLength = Math.floor(Math.random() * 8) + 4 // 4-12个数据点
  
  testLineData.value = {
    xAxis: months.slice(0, randomLength),
    series: Array.from({ length: randomLength }, () => Math.floor(Math.random() * 500) + 100)
  }
}
</script>

<style scoped>
.chart-test {
  padding: 20px;
  background: linear-gradient(135deg, #0c1445 0%, #1a2980 100%);
  min-height: 100vh;
  color: white;
}

h2, h3 {
  color: #00e4ff;
  text-align: center;
  margin-bottom: 20px;
}

.test-section {
  margin-bottom: 40px;
}

.chart-wrapper {
  height: 400px;
  margin: 20px 0;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

button {
  padding: 10px 20px;
  background: rgba(0, 228, 255, 0.2);
  border: 1px solid #00e4ff;
  border-radius: 5px;
  color: #00e4ff;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background: rgba(0, 228, 255, 0.4);
  box-shadow: 0 0 10px rgba(0, 228, 255, 0.5);
}
</style>
