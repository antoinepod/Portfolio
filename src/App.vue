<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
</script>

<template>
  <div class="main-container">
    <Header class="header"></Header>
    <RouterView class="router-view" />
  </div>
</template>

<style scoped lang="scss">
.main-container {
  display: flex;
  flex-direction: column;
  font-weight: normal;
  min-height: 100dvh;
  max-width: 100dvw;
  padding: 0 1rem;
  font-family: 'Product Sans';
  transition: color 0.8s ease-in-out, background-color 0.8s ease-in-out, fill 0.8s ease-in-out, stroke 0.8s ease-in-out, border-color 0.8s ease-in-out, box-shadow 0.8s ease-in-out, text-shadow 0.8s ease-in-out;
  background-color: var(--color-background);
  color: var(--color-text);

  .router-view {
    z-index: 1 !important;
    padding: 7.5rem 0 1.5rem 0;

    @media screen and (max-width: 767px) {
      padding: 2rem 0 7.5rem 0;
    }
  }
}
</style>
