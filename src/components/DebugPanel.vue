<template>
  <div class="debug-panel" v-if="showDebug">
    <div class="debug-header">
      <h4>调试面板</h4>
      <button @click="toggleDebug" class="close-btn">×</button>
    </div>
    <div class="debug-content">
      <div class="debug-section">
        <h5>订单数据 (orderData):</h5>
        <pre>{{ JSON.stringify(orderData, null, 2) }}</pre>
      </div>
      <div class="debug-section">
        <h5>产品数据 (productData):</h5>
        <pre>{{ JSON.stringify(productData, null, 2) }}</pre>
      </div>
      <div class="debug-section">
        <h5>业务数据 (businessData):</h5>
        <pre>{{ JSON.stringify(businessData, null, 2) }}</pre>
      </div>
      <div class="debug-section">
        <h5>平台数据 (platformData):</h5>
        <pre>{{ JSON.stringify(platformData, null, 2) }}</pre>
      </div>
    </div>
  </div>
  <!-- <button v-else @click="toggleDebug" class="debug-toggle">
    🐛 调试
  </button> -->
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  orderData: Object,
  productData: Object,
  businessData: Array,
  platformData: Array,
});

const showDebug = ref(false);

function toggleDebug() {
  showDebug.value = !showDebug.value;
}
</script>

<style scoped>
.debug-panel {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 400px;
  max-height: 80vh;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid #00e4ff;
  border-radius: 8px;
  z-index: 9999;
  overflow: hidden;
}

.debug-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background: rgba(0, 228, 255, 0.2);
  border-bottom: 1px solid #00e4ff;
}

.debug-header h4 {
  margin: 0;
  color: #00e4ff;
  font-size: 14px;
}

.close-btn {
  background: none;
  border: none;
  color: #00e4ff;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.debug-content {
  max-height: calc(80vh - 50px);
  overflow-y: auto;
  padding: 15px;
}

.debug-section {
  margin-bottom: 15px;
}

.debug-section h5 {
  margin: 0 0 5px 0;
  color: #00e4ff;
  font-size: 12px;
}

.debug-section pre {
  background: rgba(0, 20, 80, 0.5);
  border: 1px solid rgba(0, 228, 255, 0.3);
  border-radius: 4px;
  padding: 8px;
  margin: 0;
  font-size: 10px;
  color: #fff;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
}

.debug-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 228, 255, 0.2);
  border: 1px solid #00e4ff;
  border-radius: 20px;
  color: #00e4ff;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 12px;
  z-index: 9999;
  transition: all 0.3s ease;
}

.debug-toggle:hover {
  background: rgba(0, 228, 255, 0.4);
  box-shadow: 0 0 10px rgba(0, 228, 255, 0.5);
}
</style>
