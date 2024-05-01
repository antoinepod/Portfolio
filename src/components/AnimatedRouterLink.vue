<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  to: string
}>();
</script>

<template>
  <RouterLink class="animated-router-link" :to="to">
    <slot></slot>
  </RouterLink>
</template>

<style scoped lang="scss">
.animated-router-link {
  color: var(--color-text);
  cursor: pointer;
  display: inline-block;
  position: relative;
  text-decoration: none;

  &::after {
    content: '';
    position: absolute;
    border-radius: 20px;
    height: 2px;
    left: 0;
    bottom: 0;
    width: 100%;
    margin-left: 0;
    transform: scaleX(0);
    background-color: currentColor;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
}
</style>