<template>
  <DynamicBackground />
  <div class="app-container">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import DynamicBackground from "./components/DynamicBackground.vue";
</script>

<style>
.app-container {
  width: 100vw;
  height: 100vh;
  overflow: auto;
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
