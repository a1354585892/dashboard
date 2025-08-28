<template>
  <div class="screen-debug-panel" v-if="visible" :class="{ collapsed }">
    <div class="debug-header" @click="toggleCollapse">
      <span>屏幕适配调试面板</span>
      <span class="toggle-btn">{{ collapsed ? '▼' : '▲' }}</span>
    </div>
    
    <div class="debug-content" v-show="!collapsed">
      <div class="debug-section">
        <h4>屏幕信息</h4>
        <div class="debug-item">
          <span>窗口尺寸:</span>
          <span>{{ screenInfo.width }} × {{ screenInfo.height }}</span>
        </div>
        <div class="debug-item">
          <span>设备类型:</span>
          <span>{{ deviceInfo.isDesktop ? '桌面' : deviceInfo.isMobile ? '移动' : '平板' }}</span>
        </div>
        <div class="debug-item">
          <span>屏幕方向:</span>
          <span>{{ deviceInfo.isLandscape ? '横屏' : '竖屏' }}</span>
        </div>
      </div>
      
      <div class="debug-section">
        <h4>缩放信息</h4>
        <div class="debug-item">
          <span>设计尺寸:</span>
          <span>{{ DESIGN_WIDTH }} × {{ DESIGN_HEIGHT }}</span>
        </div>
        <div class="debug-item">
          <span>缩放比例:</span>
          <span>{{ (scaleInfo.scale * 100).toFixed(1) }}%</span>
        </div>
        <div class="debug-item">
          <span>X轴缩放:</span>
          <span>{{ (scaleInfo.scaleX * 100).toFixed(1) }}%</span>
        </div>
        <div class="debug-item">
          <span>Y轴缩放:</span>
          <span>{{ (scaleInfo.scaleY * 100).toFixed(1) }}%</span>
        </div>
        <div class="debug-item">
          <span>实际尺寸:</span>
          <span>{{ Math.round(scaleInfo.width) }} × {{ Math.round(scaleInfo.height) }}</span>
        </div>
      </div>
      
      <div class="debug-section">
        <h4>缩放模式</h4>
        <div class="mode-selector">
          <label v-for="mode in scaleModes" :key="mode.value">
            <input 
              type="radio" 
              :value="mode.value" 
              v-model="currentMode"
              @change="onModeChange"
            />
            <span>{{ mode.label }}</span>
          </label>
        </div>
      </div>
      
      <div class="debug-section">
        <h4>操作</h4>
        <div class="debug-actions">
          <button @click="refreshScale">刷新缩放</button>
          <button @click="resetMode">重置模式</button>
          <button @click="toggleFullscreen">{{ isFullscreen ? '退出全屏' : '进入全屏' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, computed } from 'vue'
import { SCREEN_CONFIG, detectDevice, getOptimalScaleMode } from '../utils/screenAdapter.js'

const props = defineProps({
  scaleInfo: {
    type: Object,
    default: () => ({
      scale: 1,
      scaleX: 1,
      scaleY: 1,
      width: SCREEN_CONFIG.DESIGN_WIDTH,
      height: SCREEN_CONFIG.DESIGN_HEIGHT,
      offsetX: 0,
      offsetY: 0
    })
  }
})

const emit = defineEmits(['mode-change', 'refresh-scale'])

const visible = ref(true)
const collapsed = ref(false)
const isFullscreen = ref(false)
const currentMode = ref('fit')

const { DESIGN_WIDTH, DESIGN_HEIGHT } = SCREEN_CONFIG

const screenInfo = reactive({
  width: window.innerWidth,
  height: window.innerHeight
})

const deviceInfo = reactive(detectDevice())

const scaleModes = [
  { value: 'fit', label: '适应显示' },
  { value: 'fill', label: '填满容器' },
  { value: 'width', label: '按宽度' },
  { value: 'height', label: '按高度' }
]

const scaleInfo = computed(() => props.scaleInfo)

// 切换折叠状态
const toggleCollapse = () => {
  collapsed.value = !collapsed.value
}

// 模式改变
const onModeChange = () => {
  emit('mode-change', currentMode.value)
}

// 刷新缩放
const refreshScale = () => {
  emit('refresh-scale')
}

// 重置模式
const resetMode = () => {
  currentMode.value = getOptimalScaleMode()
  onModeChange()
}

// 切换全屏
const toggleFullscreen = () => {
  if (!isFullscreen.value) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}

// 更新屏幕信息
const updateScreenInfo = () => {
  screenInfo.width = window.innerWidth
  screenInfo.height = window.innerHeight
  Object.assign(deviceInfo, detectDevice())
}

// 监听全屏状态变化
const onFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
}

// 监听窗口大小变化
const onResize = () => {
  updateScreenInfo()
}

onMounted(() => {
  currentMode.value = getOptimalScaleMode()
  
  window.addEventListener('resize', onResize)
  document.addEventListener('fullscreenchange', onFullscreenChange)
  
  // 监听屏幕适配事件
  window.addEventListener('screen-resize', (event) => {
    // 可以在这里处理屏幕缩放事件
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  document.removeEventListener('fullscreenchange', onFullscreenChange)
})

// 暴露方法
defineExpose({
  show: () => { visible.value = true },
  hide: () => { visible.value = false },
  toggle: () => { visible.value = !visible.value }
})
</script>

<style scoped>
.screen-debug-panel {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 300px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(0, 228, 255, 0.3);
  border-radius: 8px;
  color: #fff;
  font-size: 12px;
  z-index: 9999;
  backdrop-filter: blur(10px);
}

.debug-header {
  padding: 10px 15px;
  background: rgba(0, 228, 255, 0.1);
  border-bottom: 1px solid rgba(0, 228, 255, 0.2);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}

.debug-header:hover {
  background: rgba(0, 228, 255, 0.2);
}

.debug-content {
  padding: 15px;
  max-height: 400px;
  overflow-y: auto;
}

.debug-section {
  margin-bottom: 15px;
}

.debug-section h4 {
  margin: 0 0 8px 0;
  color: #00e4ff;
  font-size: 13px;
}

.debug-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  padding: 2px 0;
}

.debug-item span:first-child {
  color: #a6f9ff;
}

.debug-item span:last-child {
  color: #fff;
  font-weight: bold;
}

.mode-selector {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.mode-selector label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 2px 0;
}

.mode-selector input[type="radio"] {
  margin: 0;
}

.debug-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.debug-actions button {
  padding: 6px 12px;
  background: rgba(0, 228, 255, 0.2);
  border: 1px solid rgba(0, 228, 255, 0.3);
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 11px;
  transition: all 0.2s;
}

.debug-actions button:hover {
  background: rgba(0, 228, 255, 0.3);
  border-color: rgba(0, 228, 255, 0.5);
}

.collapsed {
  /* 折叠状态下的样式 */
}

.toggle-btn {
  font-size: 10px;
  transition: transform 0.2s;
}
</style>
