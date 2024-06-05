<script setup lang="ts">
import { useDarkModeStore } from '@/stores/darkMode';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
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

const copyMail = () => {
  copyToClipboard('contact@antoine-podvin.fr');
};

const copyPhone = () => {
  copyToClipboard('+33618843245');
};

const formName: Ref<HTMLInputElement | null> = ref(null);
const formEmail: Ref<HTMLInputElement | null> = ref(null);
const formSubject: Ref<HTMLInputElement | null> = ref(null);
const formMessage: Ref<HTMLTextAreaElement | null> = ref(null);

const sendFormEmail = () => {
  let url = `mailto:contact@antoine-podvin.fr?subject=${formSubject.value?.value}&body=${formName.value?.value}%20(${formEmail.value?.value})%0D%0A%0D%0A`;
  if (formMessage.value) {
    url += encodeURIComponent(formMessage.value.value);
  }
  window.open(url);
};
</script>

<template>
  <div class="contact">
    <h2>{{ $t("contact.title-full") }}</h2>
    <div class="mail">
      <div class="infos">
        <h4>{{ $t('contact.email.title') }}</h4>
        <p>{{ $t('contact.email.description') }}</p>
        <p class="to-copy" @click="copyMail">contact@antoine-podvin.fr</p>
        <a href="mailto:contact@antoine-podvin.fr" class="button">
          <FontAwesomeIcon class="email-icon" icon="envelope" />
          {{ $t('contact.email.send-email') }}
        </a>
      </div>
      <div class="form">
        <h4>{{ $t('contact.email.form.title') }}</h4>
        <input ref="formName" type="text" :placeholder="$t('contact.email.form.name')">
        <input ref="formEmail" type="email" :placeholder="$t('contact.email.form.email')">
        <input ref="formSubject" type="text" :placeholder="$t('contact.email.form.subject')">
        <textarea ref="formMessage" :placeholder="$t('contact.email.form.message')" rows="4"></textarea>
        <button class="send" @click="sendFormEmail">
          <FontAwesomeIcon class="email-icon" icon="circle-arrow-up" />
          {{ $t('contact.email.form.send') }}
        </button>
      </div>
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

  h2 {
    margin: 2rem 0;

    @media screen and (max-width: 767px) {
      margin: unset;
      margin-top: 2rem;
    }
  }

  .mail,
  .phone {
    margin: 2rem auto;
  }

  .socials {
    margin-top: 2rem;
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

  .email-icon,
  .phone-icon,
  .sms-icon {
    margin-right: 0.5rem;
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

  .mail {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &>* {
      margin: 0 1rem;
      width: 50%;
    }

    @media screen and (max-width: 767px) {
      flex-direction: column;

      &>* {
        width: 100%;
        margin: 1rem 0;
      }
    }
  }

  .form {
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    box-shadow: 0 0 10px var(--color-border);
    border-radius: 1rem;
    padding: 1rem;
    text-align: center;
    transition: all 0.5s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    input,
    textarea {
      padding: 0.25rem 0.5rem;
      border-radius: 0.5rem;
      border: 2px solid var(--color-border);
      background-color: var(--color-background);
      color: var(--color-text);
      margin: 0.25rem;
    }

    button {
      text-decoration: none;
      margin: 0.5rem auto 0 auto;
    }
  }
}
</style>