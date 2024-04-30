<script setup lang="ts">
import { onUpdated, ref, type Ref } from 'vue';
import { RouterLink } from 'vue-router'

import router from '@/router';

import { useDarkModeStore } from '@/stores/darkMode';
import { useWindowStore } from '@/stores/windowStore';
import { changeLang } from '@/i18n';

import IconSwitchAnimation from '@/components/IconSwitchAnimation.vue';

const darkModeStore = useDarkModeStore();
const windowStore = useWindowStore();

const showMenu: Ref<boolean> = ref(false);

const collapseMenu: Ref<HTMLElement | null> = ref(null);
const collapseButton: Ref<HTMLButtonElement | null> = ref(null);
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
  collapseButton.value?.click();
}

router.beforeResolve((to, from, next) => {
  if (showMenu.value) {
    toggleMenu();
  }
  next();
});
</script>

<template>
  <button ref="collapseButton" hidden data-bs-toggle="collapse" data-bs-target="#navbarCollapse">Collapse Menu</button>
  <header>
    <div :class="'header-container' + (windowStore.isMobile ? ' fixed-bottom' : '')">
      <nav class="navbar navbar-expand-md">
        <RouterLink class="title" to="/">Antoine Podvin</RouterLink>
        <IconSwitchAnimation class="menu-icon navbar-toggler" :value="showMenu" icon_true="times"
          icon_false="bars" @click="toggleMenu" />
        <div ref="collapseMenu" class="collapse navbar-collapse" id="navbarCollapse">
          <div class="navbar-nav">
            <div class="links" @click="">
              <RouterLink to="/about">{{ $t('about.title') }}</RouterLink>
              <RouterLink to="/projects">{{ $t('projects.title') }}</RouterLink>
              <RouterLink to="/contact">{{ $t('contact.title') }}</RouterLink>
            </div>
            <div class="icons">
              <font-awesome-icon class="font-awesome" :icon="useDarkModeStore().isDark ? 'sun' : 'moon'"
                @click="darkModeStore.toggleDarkMode()" />
              <img v-if="$i18n.locale === 'fr'" src="@/assets/images/flags/en.svg" alt="English flag"
                @click="changeLang('en')" />
              <img v-else src="@/assets/images/flags/fr.svg" alt="French flag" @click="changeLang('fr')" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header-container {
  margin: auto;
  margin: 1.5rem auto;
  padding: 0.5rem;
  border-radius: 40px;
  min-width: 45rem;
  width: 50dvw;
  background-color: var(--color-background);

  @media screen and (max-width: 767px) {
    width: 90dvw;
    min-width: unset;
  }

  box-shadow: 0px 0px 10px 5px var(--color-border);

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5rem;
    margin: 0 1rem;

    .title {
      font-weight: bold;
      text-decoration: none;
    }

    a {
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

    .menu-icon {
      border: none;
      font-size: 1.5rem;
      color: var(--color-text);
    }

    .navbar-nav {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 10%;

      @media screen and (max-width: 767px) {
        margin: 0;
        margin-top: 1rem;
        flex-direction: row;
      }
    }

    .links {
      width: 70%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      @media screen and (max-width: 767px) {
        margin: auto;
        flex-direction: column;
        align-items: flex-start;
      }
    }

    .icons {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &>* {
        cursor: pointer;
        margin: 0 0.8rem;
      }

      img {
        width: 2rem;
      }

      @media screen and (max-width: 767px) {
        flex-direction: column-reverse;

        &>* {
          cursor: pointer;
          margin: 1rem;
        }
      }
    }
  }
}
</style>