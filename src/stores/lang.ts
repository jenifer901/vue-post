import { defineStore } from 'pinia'
import { i18n } from '@/i18n'

type Lang = 'es' | 'en'

export const useLangStore = defineStore('lang', {
  state: () => ({
    lang: (localStorage.getItem('lang') as Lang) || 'es',
  }),

  actions: {
    setLang(newLang: Lang) {
      this.lang = newLang

      const i18nGlobal = i18n.global
      i18nGlobal.locale.value = newLang

      localStorage.setItem('lang', newLang)
    },
  },
})
