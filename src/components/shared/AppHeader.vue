<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import SearchPost from '@/components/posts/SearchPost.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const techpoc = 'TechPoC'

// equivalente a showSearch
const showSearch = computed(() => route.path === '/posts')

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="w-full border-b border-slate-200 bg-slate-50">
    <div class="mx-auto flex items-center justify-between px-4 py-3">
      <div class="text-base font-semibold tracking-tight text-slate-800">
        {{ techpoc }}
      </div>

      <div class="flex items-center gap-3">
        <!-- buscador -->
        <SearchPost v-if="showSearch" />

        <!-- idioma -->
        <LanguageSwitcher />

        <!-- logout -->
        <div v-if="authStore.isAuthenticated">
          <button class="text-black text-sm flex items-center gap-1" @click="logout">
            {{ $t('HEADER.EXIT') }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
