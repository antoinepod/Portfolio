<script setup lang="ts">
import { RouterView } from 'vue-router'
import { computed } from 'vue'
import { useDarkModeStore } from '@/stores/darkMode'
import Header from '@/components/Header.vue'

const darkModeStore = useDarkModeStore();
const isDark = computed(() => darkModeStore.mode);
</script>

<template>
  <div :class="'main-container ' + isDark">
    <Header class="header"></Header>
    <RouterView class="router-view" />
  </div>
</template>

<style scoped lang="scss">
.main-container {
  display: flex;
  flex-direction: column;
  font-weight: normal;
  height: 100dvh;
  width: 100dvw;
  font-family: 'Product Sans';
  transition: color 0.8s ease-in-out, background-color 0.8s ease-in-out, fill 0.8s ease-in-out, stroke 0.8s ease-in-out, border-color 0.8s ease-in-out, box-shadow 0.8s ease-in-out, text-shadow 0.8s ease-in-out;
  background-color: var(--color-background);
  color: var(--color-text);

  .header {
    height: 15dvh;
    z-index: 2 !important;
  }

  .router-view {
    min-height: 85dvh;
    z-index: 1 !important;
  }
}
</style>
