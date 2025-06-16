<script setup lang="ts">
import { RouterView } from 'vue-router'

import { Analytics } from '@vercel/analytics/vue';

import Header from '@/components/Header.vue'
import Footer from './components/Footer.vue';
</script>

<template>
  <Analytics />
  <div class="main-container">
    <Header class="header"></Header>
    <div class="router-view-container">
      <RouterView class="router-view" />
      <Footer class="footer"></Footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-container {
  position: relative;
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

  .router-view-container {
    z-index: 1 !important;
    padding: 7.5rem 0 1.5rem 0;

    @media screen and (max-width: 767px) {
      padding: 2rem 0 7.5rem 0;
    }

    .router-view {
      position: relative;
      max-width: inherit;
      min-height: calc(100vh - 15.2rem);
    }

    .footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
}
</style>
