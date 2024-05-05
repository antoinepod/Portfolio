<script setup lang="ts">
import { computed, onMounted, ref, watch, type Ref } from 'vue';
import i18n from '@/i18n';

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

onMounted(() => {
  for (let i = 0; i < props.messages.length; i++) {
    setTimeout(() => {
      let htmlMessages: Ref<Array<HTMLElement> | null> = messagesRef;
      if (htmlMessages.value !== null)
        htmlMessages.value[i].classList.remove('hide');
    }, i * 1000);
  }
})

const messagesRef: Ref<Array<HTMLElement> | null> = ref(null);
const sendMessageRef: Ref<HTMLInputElement | null> = ref(null);
const popupRef: Ref<HTMLDivElement | null> = ref(null);

const sendMessage = () => {
  window.open(`mailto:contact@antoine-podvin.fr?subject=${t('about.mail-subject')}&body=${sendMessageRef.value?.value}`);
}

const showPopup = () => {
  if (popupRef.value !== null)
    popupRef.value.style.opacity = popupRef.value.style.opacity === "1" ? "0" : "1";
  console.log(popupRef.value);
}
</script>

<template>
  <div class="discussion-container">
    <section class="discussion">
      <div v-for="(message, index) in finalMessages" :key="index" ref="messagesRef"
        :class="`bubble ${message.from} ${message.order} ${checkLastMessage(index)} hide`">
        {{ $t(message.content) }}
      </div>
    </section>
    <div class="send-message">
      <div ref="popupRef" class="popup">hello</div>
      <font-awesome-icon class="icon plus" icon="circle-plus" @click="showPopup"/>
      <input ref="sendMessageRef" type="text" :placeholder="$t('about.type-your-message')">
      <font-awesome-icon class="icon up" icon="circle-arrow-up" @click="sendMessage" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.discussion-container {
  outline: 2px solid var(--color-border);
  border-radius: 1rem;
  padding: 0.5rem;
  padding-right: 0rem;

  .discussion {
    display: flex;
    flex-flow: column;
    height: 55dvh;
    width: 100%;
    overflow-y: scroll;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;

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

    input {
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

    .popup {
      opacity: 0;
      position: absolute;
      background-color: red;
      border: 2px solid var(--color-border);
      border-radius: 1rem;
      padding: 0.5rem;
      z-index: 1;
      width: 20rem;
      height: 10rem;
      left: calc(50% - 10rem);
      top: calc(50% - 5rem);
      transition: all 0.5s ease-in-out;
    }
  }
}
</style>