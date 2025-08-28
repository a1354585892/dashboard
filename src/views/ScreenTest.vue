<template>
  <div class="screen-test">
    <div class="test-header">
      <h1>大屏自适应测试页面</h1>
      <p>设计尺寸: 2560×1040px</p>
    </div>

    <div class="test-content">
      <div class="test-grid">
        <!-- 左上角 -->
        <div class="test-box corner-box top-left">
          <h3>左上角</h3>
          <p>位置: (0, 0)</p>
          <div class="size-indicator">200×150</div>
        </div>

        <!-- 右上角 -->
        <div class="test-box corner-box top-right">
          <h3>右上角</h3>
          <p>位置: (2360, 0)</p>
          <div class="size-indicator">200×150</div>
        </div>

        <!-- 中心区域 -->
        <div class="test-box center-box">
          <h2>中心区域</h2>
          <p>这是页面的中心位置</p>
          <div class="center-content">
            <div class="metric-card">
              <div class="metric-value">1,234</div>
              <div class="metric-label">总数据量</div>
            </div>
            <div class="metric-card">
              <div class="metric-value">98.5%</div>
              <div class="metric-label">系统可用性</div>
            </div>
            <div class="metric-card">
              <div class="metric-value">2.3s</div>
              <div class="metric-label">响应时间</div>
            </div>
          </div>
        </div>

        <!-- 左下角 -->
        <div class="test-box corner-box bottom-left">
          <h3>左下角</h3>
          <p>位置: (0, 890)</p>
          <div class="size-indicator">200×150</div>
        </div>

        <!-- 右下角 -->
        <div class="test-box corner-box bottom-right">
          <h3>右下角</h3>
          <p>位置: (2360, 890)</p>
          <div class="size-indicator">200×150</div>
        </div>
      </div>

      <!-- 边界标识 -->
      <div class="boundary-markers">
        <div class="marker top-marker">顶部边界</div>
        <div class="marker bottom-marker">底部边界</div>
        <div class="marker left-marker">左边界</div>
        <div class="marker right-marker">右边界</div>
      </div>

      <!-- 网格线 -->
      <div class="grid-lines">
        <div class="grid-line vertical" style="left: 25%"></div>
        <div class="grid-line vertical" style="left: 50%"></div>
        <div class="grid-line vertical" style="left: 75%"></div>
        <div class="grid-line horizontal" style="top: 25%"></div>
        <div class="grid-line horizontal" style="top: 50%"></div>
        <div class="grid-line horizontal" style="top: 75%"></div>
      </div>
    </div>

    <!-- 测试信息面板 -->
    <div class="test-info">
      <h4>测试说明</h4>
      <ul>
        <li>四个角落的方块应该完全可见</li>
        <li>中心内容应该居中显示</li>
        <li>边界标识应该贴近屏幕边缘</li>
        <li>网格线应该均匀分布</li>
        <li>所有文字应该清晰可读</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  console.log("屏幕测试页面已加载");
  console.log("设计尺寸: 2560×1040px");
  console.log("当前窗口尺寸:", window.innerWidth, "×", window.innerHeight);
});
</script>

<style scoped>
.screen-test {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  color: #fff;
  overflow: hidden;
}

.test-header {
  position: absolute;
  top: var(--spacing-md);
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 10;
}

.test-header h1 {
  font-size: var(--font-3xl);
  margin: 0;
  color: #00e4ff;
  text-shadow: 0 0 var(--spacing-md) rgba(0, 228, 255, 0.5);
}

.test-header p {
  font-size: var(--font-xl);
  margin: var(--spacing-v-sm) 0 0 0;
  color: #a6f9ff;
}

.test-content {
  width: 100%;
  height: 100%;
  position: relative;
}

.test-grid {
  width: 100%;
  height: 100%;
  position: relative;
}

.test-box {
  position: absolute;
  border: 2px solid rgba(0, 228, 255, 0.5);
  border-radius: 10px;
  background: rgba(0, 20, 80, 0.3);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.corner-box {
  width: 200px;
  height: 150px;
}

.top-left {
  top: 20px;
  left: 20px;
}

.top-right {
  top: 20px;
  right: 20px;
}

.bottom-left {
  bottom: 20px;
  left: 20px;
}

.bottom-right {
  bottom: 20px;
  right: 20px;
}

.center-box {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 400px;
  border-width: 3px;
}

.center-content {
  display: flex;
  gap: 40px;
  margin-top: 30px;
}

.metric-card {
  background: rgba(0, 228, 255, 0.1);
  border: 1px solid rgba(0, 228, 255, 0.3);
  border-radius: 8px;
  padding: 20px;
  min-width: 120px;
}

.metric-value {
  font-size: 36px;
  font-weight: bold;
  color: #00e4ff;
  margin-bottom: 8px;
}

.metric-label {
  font-size: 14px;
  color: #a6f9ff;
}

.size-indicator {
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 12px;
  color: #666;
}

.boundary-markers {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.marker {
  position: absolute;
  background: rgba(255, 0, 0, 0.8);
  color: #fff;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: bold;
}

.top-marker {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.bottom-marker {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.left-marker {
  left: 0;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
}

.right-marker {
  right: 0;
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
}

.grid-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.grid-line {
  position: absolute;
  background: rgba(0, 228, 255, 0.2);
}

.grid-line.vertical {
  width: 1px;
  height: 100%;
}

.grid-line.horizontal {
  width: 100%;
  height: 1px;
}

.test-info {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(0, 228, 255, 0.3);
  border-radius: 8px;
  padding: 20px;
  max-width: 600px;
}

.test-info h4 {
  margin: 0 0 15px 0;
  color: #00e4ff;
}

.test-info ul {
  margin: 0;
  padding-left: 20px;
}

.test-info li {
  margin-bottom: 5px;
  color: #a6f9ff;
}
</style>
