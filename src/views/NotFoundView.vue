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
  text-align: center;
  margin: auto;

  h3 {
    margin-bottom: 5dvh;
  }
}
</style>
