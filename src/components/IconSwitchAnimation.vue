<script setup lang="ts">
const props = defineProps<{
  value: boolean;
  icon_true: string;
  icon_false: string;
}>();
</script>

<template>
  <div class="icon-container">
    <Transition name="spin" class="transition">
      <font-awesome-icon v-if="value" class="icon" :icon="icon_true" />
      <font-awesome-icon v-else class="icon" :icon="icon_false" />
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.icon-container {
  position: relative;
  width: 1rem;
  height: 1.5rem;

  .icon {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
  }

  .spin-enter-active {
    animation: spin-in 0.5s;
  }

  .spin-leave-active {
    animation: spin-out 0.5s;
  }

  @keyframes spin-out {
    0% {
      transform: rotate(0deg);
      opacity: 1;
    }

    100% {
      transform: rotate(90deg);
      opacity: 0;
    }
  }

  @keyframes spin-in {
    0% {
      transform: rotate(90deg);
      opacity: 0;
    }

    100% {
      transform: rotate(0deg);
      opacity: 1;
    }
  }
}
</style>