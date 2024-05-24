<script setup lang="ts">
import router from '@/router';
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <h3>{{ $t('404.title') }}</h3>
    <p>{{ $t('404.message') }}</p>
    <button @click="$router.push('/')">{{ $t('404.back-to-home') }}</button>
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
    color: var(--color-background);
    margin: 1rem auto;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: var(--color-text);
    }
  }
}
</style>
