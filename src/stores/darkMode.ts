import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useDarkModeStore = defineStore('darkMode', () => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const mode: Ref<'light' | 'dark'> = ref(prefersDarkMode ? 'dark' : 'light');
  const storedMode = window.localStorage.getItem('prefers-color-scheme');

  if (!storedMode) {
    window.localStorage.setItem('prefers-color-scheme', mode.value);
  } else {
    if (storedMode === 'dark' || storedMode === 'light')
      mode.value = storedMode;
  }

  const setMode = (value: 'light' | 'dark') => {
    mode.value = value;
    window.localStorage.setItem('prefers-color-scheme', mode.value);
  }

  const toggleDarkMode = () => {
    mode.value = mode.value === 'light' ? 'dark' : 'light';
    setMode(mode.value);
  };

  const isDark = computed(() => {
    document.documentElement.setAttribute("data-theme", mode.value);
    return mode.value === 'dark';
  });

  const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQueryList.addEventListener('change', () => {
    setMode(mediaQueryList.matches ? 'dark' : 'light');
  });

  return { mode, toggleDarkMode, isDark };
});
