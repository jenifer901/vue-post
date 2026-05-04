import { createI18n } from 'vue-i18n'
import es from './locales/es.json'
import en from './locales/en.json'
import type { MessageSchema } from './schema'

type Locales = 'es' | 'en'

export const i18n = createI18n<[MessageSchema], Locales>({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'en',
  messages: {
    es,
    en,
  },
})
