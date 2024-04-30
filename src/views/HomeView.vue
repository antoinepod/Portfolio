<script setup lang="ts">
</script>

<template>
  <div class="home">
    <h1>{{ $t('home.presentation-title') }}</h1>
    <p>{{ $t('home.presentation-subtitle') }}</p>
    <img class="photo-cv" src="/photo_cv.jpg" alt="Antoine Podvin" />
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .photo-cv {
    width: 50dvw;
    border-radius: 20px;
    margin-bottom: 20px;
  }
}
</style>
