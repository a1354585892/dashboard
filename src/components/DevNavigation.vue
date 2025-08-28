<template>
  <div class="dev-navigation" v-if="showNav" :class="{ collapsed }">
    <div class="nav-header" @click="toggleCollapse">
      <span>页面导航</span>
      <span class="toggle-btn">{{ collapsed ? "▶" : "▼" }}</span>
    </div>

    <div class="nav-content" v-show="!collapsed">
      <div class="nav-section">
        <h4>主要页面</h4>
        <router-link
          to="/"
          class="nav-link"
          :class="{ active: $route.path === '/' }"
        >
          <span class="nav-icon">🏠</span>
          <span>Dashboard</span>
        </router-link>

        <router-link
          to="/screen-test"
          class="nav-link"
          :class="{ active: $route.path === '/screen-test' }"
        >
          <span class="nav-icon">📐</span>
          <span>屏幕测试</span>
        </router-link>

        <router-link
          to="/test"
          class="nav-link"
          :class="{ active: $route.path === '/test' }"
        >
          <span class="nav-icon">📊</span>
          <span>图表测试</span>
        </router-link>

        <router-link
          to="/effects"
          class="nav-link"
          :class="{ active: $route.path === '/effects' }"
        >
          <span class="nav-icon">✨</span>
          <span>特效演示</span>
        </router-link>
      </div>

      <div class="nav-section">
        <h4>快捷操作</h4>
        <button @click="toggleFullscreen" class="nav-button">
          <span class="nav-icon">{{ isFullscreen ? "🔲" : "⛶" }}</span>
          <span>{{ isFullscreen ? "退出全屏" : "全屏显示" }}</span>
        </button>

        <button @click="refreshPage" class="nav-button">
          <span class="nav-icon">🔄</span>
          <span>刷新页面</span>
        </button>

        <button @click="openDevTools" class="nav-button">
          <span class="nav-icon">🔧</span>
          <span>开发工具</span>
        </button>
      </div>

      <div class="nav-section">
        <h4>分辨率测试</h4>
        <div class="resolution-buttons">
          <button
            v-for="resolution in commonResolutions"
            :key="resolution.name"
            @click="setWindowSize(resolution)"
            class="resolution-btn"
            :title="`${resolution.width}×${resolution.height}`"
          >
            {{ resolution.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const showNav = ref(process.env.NODE_ENV === "development");
const collapsed = ref(false);
const isFullscreen = ref(false);

// 常见分辨率配置
const commonResolutions = [
  { name: "大屏", width: 2560, height: 1040 },
  { name: "4K", width: 3840, height: 2160 },
  { name: "2K", width: 2560, height: 1440 },
  { name: "FHD", width: 1920, height: 1080 },
  { name: "HD", width: 1366, height: 768 },
  { name: "平板", width: 1024, height: 768 },
  { name: "手机", width: 375, height: 667 },
];

// 切换折叠状态
const toggleCollapse = () => {
  collapsed.value = !collapsed.value;
};

// 切换全屏
const toggleFullscreen = () => {
  if (!isFullscreen.value) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

// 刷新页面
const refreshPage = () => {
  window.location.reload();
};

// 打开开发工具
const openDevTools = () => {
  // 在开发环境中，这个功能可能不会生效
  // 但可以提示用户使用F12
  alert("请按F12打开浏览器开发者工具");
};

// 设置窗口大小（仅在开发环境中有效）
const setWindowSize = (resolution) => {
  if (window.resizeTo) {
    try {
      window.resizeTo(resolution.width, resolution.height);
    } catch (error) {
      console.warn("无法调整窗口大小，可能是浏览器安全限制");
      // 提示用户手动调整
      alert(
        `请手动调整浏览器窗口大小为 ${resolution.width}×${resolution.height}`
      );
    }
  } else {
    alert(
      `请手动调整浏览器窗口大小为 ${resolution.width}×${resolution.height}`
    );
  }
};

// 监听全屏状态变化
const onFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement;
};

// 键盘快捷键
const handleKeydown = (event) => {
  // Ctrl + Shift + N 切换导航面板
  if (event.ctrlKey && event.shiftKey && event.key === "N") {
    event.preventDefault();
    showNav.value = !showNav.value;
  }

  // F11 全屏切换
  if (event.key === "F11") {
    event.preventDefault();
    toggleFullscreen();
  }
};

onMounted(() => {
  document.addEventListener("fullscreenchange", onFullscreenChange);
  window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("fullscreenchange", onFullscreenChange);
  window.removeEventListener("keydown", handleKeydown);
});

// 暴露方法
defineExpose({
  show: () => {
    showNav.value = true;
  },
  hide: () => {
    showNav.value = false;
  },
  toggle: () => {
    showNav.value = !showNav.value;
  },
});
</script>

<style scoped>
.dev-navigation {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 250px;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(0, 228, 255, 0.3);
  border-radius: 8px;
  color: #fff;
  font-size: 12px;
  z-index: 10000;
  backdrop-filter: blur(10px);
}

.nav-header {
  padding: 10px 15px;
  background: rgba(0, 228, 255, 0.1);
  border-bottom: 1px solid rgba(0, 228, 255, 0.2);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  font-weight: bold;
}

.nav-header:hover {
  background: rgba(0, 228, 255, 0.2);
}

.nav-content {
  padding: 15px;
  max-height: 500px;
  overflow-y: auto;
}

.nav-section {
  margin-bottom: 20px;
}

.nav-section:last-child {
  margin-bottom: 0;
}

.nav-section h4 {
  margin: 0 0 10px 0;
  color: #00e4ff;
  font-size: 13px;
  border-bottom: 1px solid rgba(0, 228, 255, 0.2);
  padding-bottom: 5px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  margin-bottom: 5px;
  text-decoration: none;
  color: #a6f9ff;
  border-radius: 4px;
  transition: all 0.2s;
}

.nav-link:hover {
  background: rgba(0, 228, 255, 0.1);
  color: #fff;
}

.nav-link.active {
  background: rgba(0, 228, 255, 0.2);
  color: #00e4ff;
  border: 1px solid rgba(0, 228, 255, 0.3);
}

.nav-button {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  margin-bottom: 5px;
  background: rgba(0, 228, 255, 0.1);
  border: 1px solid rgba(0, 228, 255, 0.2);
  border-radius: 4px;
  color: #a6f9ff;
  cursor: pointer;
  font-size: 11px;
  transition: all 0.2s;
}

.nav-button:hover {
  background: rgba(0, 228, 255, 0.2);
  border-color: rgba(0, 228, 255, 0.4);
  color: #fff;
}

.nav-icon {
  font-size: 14px;
  width: 16px;
  text-align: center;
}

.resolution-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

.resolution-btn {
  padding: 6px 8px;
  background: rgba(0, 228, 255, 0.1);
  border: 1px solid rgba(0, 228, 255, 0.2);
  border-radius: 3px;
  color: #a6f9ff;
  cursor: pointer;
  font-size: 10px;
  transition: all 0.2s;
}

.resolution-btn:hover {
  background: rgba(0, 228, 255, 0.2);
  border-color: rgba(0, 228, 255, 0.4);
  color: #fff;
}

.toggle-btn {
  font-size: 10px;
  transition: transform 0.2s;
}
</style>
