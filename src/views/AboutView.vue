<script setup lang="ts">
import DiscussionBubble, { type Message } from '@/components/DiscussionBubble.vue'
import i18n from '@/i18n';
import { ref, type Ref } from 'vue';

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

const messages: Ref<Array<Message>> = ref(loadMessages());
</script>

<template>
  <div class="about">
    <div class="conversation">
      <div class="heading">
        <img class="photo-cv" src="/photo_cv.jpg" alt="Antoine Podvin" />
        <h2 class="title">{{ $t('about.title-full') }}</h2>
      </div>
      <div class="conversation">
        <DiscussionBubble :messages="messages" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .conversation {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80dvw;
    max-width: 40rem;
    text-align: justify;

    .heading {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 2rem auto;

      .title {
        text-align: left;
      }

      .photo-cv {
        max-width: 6rem;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 2rem;
      }
    }

    

    @media screen and (max-width: 767px) {
      flex-direction: column;
      width: 90dvw;

      .heading {
        margin: 1rem auto;

        .photo-cv {
          margin-right: 1rem;
        }
      }
    }
  }
}
</style>
