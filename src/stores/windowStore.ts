import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useWindowStore = defineStore('window', () => {
  const isMobile = ref(window.innerWidth < 768);

  const handleResize = () => {
    isMobile.value = window.innerWidth < 768;
  };

  window.addEventListener('resize', handleResize);

  return { isMobile };
});
