<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import { useWindowStore } from '@/stores/windowStore';
import i18n from '@/i18n';
import router from '@/router';

export type Message = {
  content: string;
  from: string;
  order?: string;
  show?: string;
}

const props = defineProps<{
  messages: Array<Message>
}>()

const { t } = i18n.global;

const orderMessages: (messages: Array<Message>) => Array<Message> = (messages: Array<Message>) => {
  let order = "";
  return messages.map((message, index) => {
    if (index === 0 || message.from !== props.messages[index - 1].from)
      order = "first";
    else if (index === props.messages.length - 1 || message.from !== props.messages[index + 1].from)
      order = "last"
    else
      order = "middle"
    return {
      ...message,
      order: order
    }
  })
}
const finalMessages = computed(() => orderMessages(props.messages));

const checkLastMessage = (index: number) => {
  if (props.messages[index].from !== props.messages[index + 1]?.from && index != props.messages.length - 1)
    return "separator";
  return "";
}

const isConversationStarted: Ref<Boolean> = ref(false);
const startConversation = () => {
  isConversationStarted.value = true;
  const offset = useWindowStore().isMobile ? 100 : 100;
  if (discussion.value !== null) {
    window.scrollTo(0, discussion.value.offsetTop - offset);
  }
  for (let i = 0; i < props.messages.length; i++) {
    setTimeout(() => {
      let htmlMessages: Ref<Array<HTMLElement> | null> = messagesRef;
      if (htmlMessages.value !== null) {
        htmlMessages.value[i].classList.remove('hide');
        htmlMessages.value[i].scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, i * 1000);
  }
}

const messagesRef: Ref<Array<HTMLElement> | null> = ref(null);
const sendMessageRef: Ref<HTMLInputElement | null> = ref(null);

const sendMessage = () => {
  let url = `mailto:contact@antoine-podvin.fr?subject=${t('about.mail-subject')}`;
  if (sendMessageRef.value) {
    url += "&body=" + encodeURIComponent(sendMessageRef.value.value);
  }
  window.open(url);
}

const discussion: Ref<HTMLElement | null> = ref(null);
</script>

<template>
  <div ref="discussion" class='discussion-container' v-bind:class="{ disabled: !isConversationStarted }">
    <section class="discussion">
      <div v-for="(message, index) in finalMessages" :key="index" ref="messagesRef"
        :class="`bubble ${message.from} ${message.order} ${checkLastMessage(index)} hide`">
        {{ $t(message.content) }}
      </div>
    </section>
    <div class="send-message">
      <font-awesome-icon class="icon plus" icon="circle-plus" @click="router.push({ name: 'contact' })" />
      <textarea ref="sendMessageRef" type="text" :placeholder="$t('about.type-your-message')" rows="1"></textarea>
      <font-awesome-icon class="icon up" icon="circle-arrow-up" @click="sendMessage" />
    </div>
    <button v-if="!isConversationStarted" @click="startConversation()">{{ $t('about.start-conversation') }}</button>
  </div>
</template>

<style scoped lang="scss">
.discussion-container {
  outline: 2px solid var(--color-border);
  border-radius: 1rem;
  padding: 0.5rem 0 0.5rem 0.5rem;
  position: relative;

  &.disabled *:not(button) {
    pointer-events: none;
    opacity: 0.5;
  }

  .discussion {
    display: flex;
    flex-flow: column;
    height: 55vh;
    width: 100%;
    overflow-y: scroll;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
    padding-right: 0.5rem;

    &>.bubble {
      border-radius: 1rem;
      padding: 0.25rem 0.75rem;
      margin: 0.05rem;
      max-width: 80%;
      text-align: left;
      transition: all 0.5s ease-in-out;
      transform: translateY(0);
      opacity: 1;

      &+.hide {
        transform: translateY(1rem);
        opacity: 0;
      }

      &.me {
        align-self: flex-start;
        background-color: var(--color-border);
        color: var(--color-heading);
        margin-right: 0.5rem;

        &.first {
          border-bottom-left-radius: 0.2rem;
        }

        &.last {
          border-top-left-radius: 0.2rem;
        }

        &.middle {
          border-bottom-left-radius: 0.2rem;
          border-top-left-radius: 0.2rem;
        }
      }

      &.user {
        align-self: flex-end;
        background-color: #0C5F88;
        color: var(--vt-c-text-dark-1);
        margin-left: 0.5rem;

        &.first {
          border-bottom-right-radius: 0.2rem;
        }

        &.last {
          border-top-right-radius: 0.2rem;
        }

        &.middle {
          border-bottom-right-radius: 0.2rem;
          border-top-right-radius: 0.2rem;
        }
      }

      &.separator {
        margin-bottom: 0.4rem !important;
      }
    }
  }

  .send-message {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-right: 0.5rem;

    textarea {
      width: 100%;
      padding: 0.25rem 0.5rem;
      border-radius: 1rem;
      border: 2px solid var(--color-border);
      background-color: var(--color-background);
      color: var(--color-text);
      margin: 0 0.5rem;
    }

    .icon {
      color: #0C5F88;
      font-size: 1.8rem;
      cursor: pointer;
      border-radius: 50%;
      transition: all 0.2s ease;

      @media screen and (min-width: 768px) {
        &:hover {
          transform: scale(1.1);
        }
      }

      &:active {
        transform: scale(0.9);
      }
    }

    .plus {
      color: var(--color-heading);
      background-color: var(--color-border);
    }
  }

  button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 9999;
  }
}
</style>