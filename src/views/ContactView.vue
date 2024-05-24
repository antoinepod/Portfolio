<script setup lang="ts">
import { useDarkModeStore } from '@/stores/darkMode';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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

const copyMail = () => {
  copyToClipboard('antoinepodvinn@gmail.com');
};

const copyPhone = () => {
  copyToClipboard('+33618843245');
};
</script>

<template>
  <div class="contact">
    <h2>{{ $t("contact.title-full") }}</h2>
    <div class="mail">
      <h4>{{ $t('contact.email.title') }}</h4>
      <p>{{ $t('contact.email.description') }}</p>
      <p class="to-copy" @click="copyMail">antoinepodvinn@gmail.com</p>
      <a href="mailto:contact@antoine-podvin.fr" class="button">
        <FontAwesomeIcon class="email-icon" icon="envelope" />
        {{ $t('contact.email.send-email') }}
      </a>
    </div>
    <div class="phone">
      <h4>{{ $t('contact.phone.title') }}</h4>
      <p>{{ $t('contact.phone.description') }}</p>
      <p class="to-copy" @click="copyPhone">+33 6 18 84 32 45</p>
      <div class="phone-buttons">
        <a href="tel:+33618843245" class="button">
          <FontAwesomeIcon class="phone-icon" icon="phone" />
          {{ $t('contact.phone.call-me') }}
        </a>
        <a href="sms:+33618843245" class="button">
          <FontAwesomeIcon class="sms-icon" icon="comment" />
          {{ $t('contact.phone.send-sms') }}
        </a>
      </div>
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

  .to-copy {
    width: fit-content;
    margin: 1rem auto;
    transition: all 0.3s ease;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
      color: #3E87AB;
    }
  }

  .button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0.4rem 1rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #0C5F88;
    color: var(--vt-c-text-dark-1);
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: auto;
    width: fit-content;

    &:hover {
      background-color: #3E87AB;
    }

    .email-icon,
    .phone-icon,
    .sms-icon {
      margin-right: 0.5rem;
    }
  }

  .phone-buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .button {
      margin: 0 1rem;
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