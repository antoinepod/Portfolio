<script setup lang="ts">
import router from '@/router';
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <h3>{{ $t('not-found.title') }}</h3>
    <p>{{ $t('not-found.message') }}</p>
    <button @click="$router.push('/')">{{ $t('not-found.back-to-home') }}</button>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: auto;

  h3 {
    margin-bottom: 5dvh;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    background-color: var(--color-heading);
    color: var(--color-background) !important;
    margin: 1rem auto;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: var(--color-text);
    }
  }
}
</style>
