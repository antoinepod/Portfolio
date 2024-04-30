<script setup lang="ts">
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <h3>{{ $t('404.title') }}</h3>
    <p>{{ $t('404.message') }}</p>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: normal;
  text-align: center;

  h1 {
    font-size: 8rem;
  }

  h3 {
    font-size: 3rem;
    margin-bottom: 5dvh;
  }

  p {
    font-size: 1.5rem;
  }
}
</style>
