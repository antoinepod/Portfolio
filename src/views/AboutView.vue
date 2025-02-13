<script setup lang="ts">
import DiscussionBubble, { type Message } from '@/components/DiscussionBubble.vue'
import i18n from '@/i18n';
import { ref, type Ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const { tm } = i18n.global;

const loadMessages = (): Array<Message> => {
  const messages: Array<Message> = [];
  for (let i in tm('about.messages') as unknown as Array<Object>) {
    messages.push({
      content: `about.messages[${i}].content`,
      from: tm('about.messages')[i].from
    });
  }
  return messages;
}

const conversation: Ref<HTMLElement | null> = ref(null);
const messages: Ref<Array<Message>> = ref(loadMessages());

const logos = [
  { file: 'vue', name: 'Vue.js' },
  { file: 'react-native', name: 'React Native' },
  { file: 'javascript', name: 'JavaScript' },
  { file: 'typescript', name: 'TypeScript' },
  { file: 'html', name: 'HTML5' },
  { file: 'css', name: 'CSS3' },
  { file: 'docker', name: 'Docker' },
  { file: 'sql', name: 'SQL' },
  { file: 'expressjs', name: 'Express.js' },
  { file: 'nodejs', name: 'Node.js' },
  { file: 'python', name: 'Python' },
  { file: 'django', name: 'Django' },
  { file: 'java', name: 'Java' },
  { file: 'springboot', name: 'Spring Boot' },
  { file: 'c', name: 'C' },
  { file: 'c++', name: 'C++' },
  { file: 'windows', name: 'Windows' },
  { file: 'linux', name: 'Linux' },
  { file: 'git', name: 'Git' },
  { file: 'figma', name: 'Figma' },
  { file: 'vs-code', name: 'VS Code' },
  { file: 'jetbrains', name: 'Jetbrains' },
  { file: 'android', name: 'Android Studio' },
  { file: 'postman', name: 'Postman' }
];
</script>

<template>
  <div class="about">
    <div class="conversation-container">
      <div class="introduction">
        <div class="heading">
          <img class="photo-cv" src="/photo_cv.jpg" alt="Antoine Podvin" />
          <h2 class="title">{{ $t('about.title-full') }}</h2>
        </div>
        <p v-html="$t('about.introduction')"></p>
        <a class="button" :href="$t('about.cv-link')" target="_blank">
          <FontAwesomeIcon class="file-icon" icon="file-invoice" />
          {{ $t('about.cv') }}
        </a>
      </div>
      <div class="conversation">
        <DiscussionBubble ref="conversation" :messages="messages" />
      </div>
    </div>
    <div class="tech-stack-container">
      <h2>{{ $t('about.tech-stack.title') }}</h2>
      <p>{{ $t('about.tech-stack.description') }}</p>
      <div class="tech-stack">
        <div v-for="logo in logos">
          <div v-if="logo.name" class="tech-stack-item">
            <img :src="`/logos/${logo.file}.svg`" :alt="logo.name" />
            <p>{{ logo.name }}</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.about {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .conversation-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: justify;
    margin: 1rem auto;

    .conversation {
      margin: auto;
      max-width: 35rem;
    }

    .introduction {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      max-width: 50rem;
      text-align: justify;
      margin: auto;
      padding: 2rem;

      .heading {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: 0 auto 2rem auto;

        .title {
          text-align: left;
          margin: auto;
        }

        .photo-cv {
          max-width: 6rem;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 2rem;
        }
      }

      .button {
        text-decoration: none;
        margin: 1rem auto;
        background-color: var(--color-heading);
        color: var(--color-background) !important;

        &:hover {
          background-color: var(--color-text);
        }

        .file-icon {
          margin-right: 0.5rem;
        }
      }
    }

    @media screen and (max-width: 767px) {
      flex-direction: column;

      .introduction {
        width: 95%;
        max-width: 50rem;
        margin: 1rem auto;
        padding: 0;

        .heading {
          .photo-cv {
            margin-right: 1rem;
          }
        }
      }
    }
  }

  .tech-stack-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    max-width: 80rem;
    text-align: justify;
    margin: auto 1rem;

    @media screen and (max-width: 767px) {
      width: 90dvw;
      margin: 1rem auto;
    }


    h2 {
      margin: 2rem auto;
    }

    p {
      margin: 1rem auto;
      text-align: center;
    }

    .tech-stack {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 2rem auto;
      flex-wrap: wrap;

      .tech-stack-item {
        margin: 1rem;
        border-radius: 0.5rem;
        transition: all 0.2s;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 10rem;
        height: 10rem;
        box-shadow: 0 0 0.5rem 0.1rem var(--color-border);

        img {
          width: 5rem;
          height: 5rem;
          margin-top: 2rem;
          transition: all 0.2s;
        }

        p {
          margin: 0;
          text-align: center;

          @media screen and (min-width: 768px) {
            opacity: 0;
            transition: all 0.2s ease;
            transform: translateY(-0.5rem);
          }
        }

        &:hover {
          transform: scale(1.05);

          img {
            transform: translateY(-1rem);
          }

          p {
            opacity: 1;
            transform: translateY(0rem);
          }
        }

        @media screen and (max-width: 767px) {
          width: 8rem;
          height: 8rem;

          img {
            width: 4rem;
            height: 4rem;
            transform: translateY(-1rem);
          }
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
}
</style>
