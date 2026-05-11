<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import SearchPost from '@/components/posts/SearchPost.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import ConfirmModal from '@/shared/components/ConfirmModal.vue'
import LoginOut from '@/shared/icons/loginOut.vue'

const showLogoutModal = ref(false)

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const techpoc = 'TechPoC'

// equivalente a showSearch
const showSearch = computed(() => route.path === '/posts')

const confirmLogout = () => {
  showLogoutModal.value = false
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="navbar bg-base-200">
    <!-- left -->
    <div class="flex-1">
      <span class="text-base font-semibold">
        {{ techpoc }}
      </span>
    </div>

    <!-- right -->
    <div class="flex items-center gap-3">
      <!-- search -->
      <SearchPost v-if="showSearch" />

      <!-- language -->
      <LanguageSwitcher />

      <!-- logout -->
      <button
        type="button"
        v-if="authStore.isAuthenticated"
        class="btn btn-ghost btn-sm"
        @click="showLogoutModal = true"
      >
        <LoginOut class="w-4 h-4" />
        {{ $t('HEADER.EXIT') }}
      </button>
    </div>
  </div>
  <ConfirmModal
    v-model="showLogoutModal"
    :title="$t('HEADER.EXIT')"
    :message="$t('HEADER.LOGOUT_CONFIRM')"
    persistent
    @confirm="confirmLogout"
  />
</template>
