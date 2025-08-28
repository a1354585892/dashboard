<template>
  <DynamicBackground />
  <div class="app-container">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>

  <!-- 开发导航 -->
  <DevNavigation v-if="showDevNavigation" />
</template>

<script setup>
import DynamicBackground from "./components/DynamicBackground.vue";
import DevNavigation from "./components/DevNavigation.vue";
import { ref } from "vue";

const showDevNavigation = ref(process.env.NODE_ENV === "development");
</script>

<style>
.app-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

/* 页面过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
