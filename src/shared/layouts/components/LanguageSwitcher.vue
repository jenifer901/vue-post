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
  <div class="join">
    <button
      type="button"
      class="join-item btn btn-sm rounded-l-full"
      :class="isActive('es') ? 'btn-primary' : ''"
      @click="changeLang('es')"
    >
      {{ $t('HEADER.LANGUAGE_ES') }}
    </button>

    <button
      type="button"
      class="join-item btn btn-sm rounded-r-full"
      :class="isActive('en') ? 'btn-primary' : ''"
      @click="changeLang('en')"
    >
      {{ $t('HEADER.LANGUAGE_EN') }}
    </button>
  </div>
</template>
