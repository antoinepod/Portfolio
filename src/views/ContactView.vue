<script setup lang="ts">
import { useDarkModeStore } from '@/stores/darkMode';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import IconSwitchAnimation from '@/components/IconSwitchAnimation.vue';
import { ref, type Ref } from 'vue';

const darkModeStore = useDarkModeStore();

const copyToClipboard = (data: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(data);
  } else {
    const textArea: HTMLTextAreaElement = document.createElement('textarea');
    textArea.value = data;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
};

const copyMailState: Ref<boolean> = ref(false);
const copyPhoneState: Ref<boolean> = ref(false);

const copyMail = () => {
  copyToClipboard('antoinepodvinn@gmail.com');
  copyMailState.value = true;
};

const copyPhone = () => {
  copyToClipboard('+33618843245');
  copyPhoneState.value = true;
};
</script>

<template>
  <div class="contact">
    <h2>{{ $t("contact.title") }}</h2>
    <div class="mail">
      <h4>{{ $t('contact.email.title') }}</h4>
      <p>{{ $t('contact.email.description') }}</p>
      <p>antoinepodvinn@gmail.com</p>
      <button @click="copyMail">
        <IconSwitchAnimation class="copy-icon" :value="copyMailState" icon_false="copy" icon_true="envelope" />
        {{ copyMailState ? $t('contact.email.email-copied') : $t('contact.email.copy-email') }}
      </button>
    </div>
    <div class="phone">
      <h4>{{ $t('contact.phone.title') }}</h4>
      <p>{{ $t('contact.phone.description') }}</p>
      <p>+33 6 18 84 32 45</p>
      <button @click="copyPhone">
        <IconSwitchAnimation class="copy-icon" :value="copyPhoneState" icon_false="copy" icon_true="phone" />
        {{ copyPhoneState ? $t('contact.phone.phone-copied') : $t('contact.phone.copy-phone') }}
      </button>
    </div>
    <div class="socials">
      <h4>{{ $t('contact.socials.title') }}</h4>
      <p>{{ $t('contact.socials.description') }}</p>
      <div class="links">
        <a class="linkedin" href="https://www.linkedin.com/in/antoine-podvin/" target="_blank"
          rel="noopener noreferrer">
          <img src="@/assets/images/linkedin.svg" alt="LinkedIn" />
          <p class="username">@antoine-podvin</p>
        </a>
        <a class="github" href="https://github.com/antoinepod" target="_blank" rel="noopener noreferrer">
          <img v-if="darkModeStore.isDark" src="@/assets/images/github-white.png" alt="GitHub" />
          <img v-else src="@/assets/images/github.png" alt="GitHub" />
          <p class="username">@antoinepod</p>
        </a>
        <a class="malt" href="https://www.malt.fr/profile/antoinepodvin" target="_blank" rel="noopener noreferrer">
          <img src="@/assets/images/malt.svg" alt="malt" />
          <p class="username">@antoinepodvin</p>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &>* {
    margin: 2rem 0;

    @media screen and (max-width: 767px) {
      margin: 1rem 0;
    }
  }

  a {
    text-decoration: none;
    color: var(--color-text);
  }

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0.4rem 1rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #0C5F88;
    color: var(--color-background);
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: auto;

    &:hover {
      background-color: #3E87AB;
    }

    .copy-icon {
      margin-top: 0.3rem;
      margin-right: 0.5rem;
    }
  }

  .links {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;

    &>* {
      margin: 1rem 2rem;
      text-decoration: none;
    }

    img {
      object-fit: contain;
      max-width: 12rem;
      height: 3rem;
      margin-bottom: 0.2rem;
    }

    @media screen and (max-width: 767px) {
      flex-direction: column;
    }

    @media screen and (min-width: 768px) {
      .username {
        opacity: 0;
        transition: all 0.3s ease;
        transform: translateY(-0.5rem);
      }

      img:hover+.username,
      .username:hover {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
}
</style>