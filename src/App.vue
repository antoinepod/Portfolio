<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
</script>

<template>
  <div :class="'main-container'">
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
  max-width: 100dvw;
  font-family: 'Product Sans';
  transition: color 0.8s ease-in-out, background-color 0.8s ease-in-out, fill 0.8s ease-in-out, stroke 0.8s ease-in-out, border-color 0.8s ease-in-out, box-shadow 0.8s ease-in-out, text-shadow 0.8s ease-in-out;
  background-color: var(--color-background);
  color: var(--color-text);

  .header {
    z-index: 2 !important;
  }

  .router-view {
    min-height: calc(100dvh - 7.5rem);
    z-index: 1 !important;
  }
}
</style>
