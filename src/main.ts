import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from '@/i18n'
import { useLangStore } from '@/stores/lang'
import '@/app.css'

import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'

const app = createApp(App)

app.use(createPinia())

const auth = useAuthStore()
auth.init()
app.use(i18n)

const langStore = useLangStore()
langStore.setLang(langStore.lang)

app.use(router)

app.mount('#app')
