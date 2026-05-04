<script setup lang="ts">
import { useLangStore } from '@/stores/lang'

const langStore = useLangStore()

const changeLang = (lang: 'es' | 'en') => {
  langStore.setLang(lang)
}

const isActive = (lang: 'es' | 'en') => {
  return langStore.lang === lang
}
</script>

<template>
  <div class="flex items-center">
    <button
      type="button"
      class="rounded-full px-4 py-1.5 text-sm font-medium transition"
      :class="
        isActive('es') ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
      "
      @click="changeLang('es')"
    >
      {{ $t('HEADER.LANGUAGE_ES') }}
    </button>

    <button
      type="button"
      class="rounded-full px-4 py-1.5 text-sm font-medium transition"
      :class="
        isActive('en') ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
      "
      @click="changeLang('en')"
    >
      {{ $t('HEADER.LANGUAGE_EN') }}
    </button>
  </div>
</template>
