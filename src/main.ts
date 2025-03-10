import { createApp, type ComponentPublicInstance } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import i18n from './i18n'
import { FontAwesomeIcon } from './font-awesome'

import './assets/main.css'

const app = createApp(App)

app.component("font-awesome-icon", FontAwesomeIcon)
app.use(createPinia())
app.use(i18n)
app.use(router)

app.config.warnHandler = (msg: string, _instance: ComponentPublicInstance | null, trace: string) =>
  ![
    'Extraneous non-props attributes'
  ].some((warning) => msg.includes(warning)) &&
  console.warn('[Vue warn]: '.concat(msg).concat(trace))

app.mount('#app')
