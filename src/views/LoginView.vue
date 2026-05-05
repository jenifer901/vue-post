<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

// redirect si ya está logueado
if (authStore.isAuthenticated) {
  router.push('/posts')
}

const handleLogin = async (data: { name: string; password: string }) => {
  await authStore.login(data.name, data.password)

  if (authStore.isAuthenticated) {
    router.push('/posts')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="flex flex-1 items-center justify-center px-4">
      <div class="w-full max-w-sm bg-white rounded-xl shadow-md p-8">
        <!-- title -->
        <div class="text-center mb-6">
          <h2 class="text-xl font-semibold text-gray-800">
            {{ $t('LOGIN.WELCOME') }}
          </h2>

          <p class="text-sm text-gray-500">
            {{ $t('LOGIN.CREDENTIAL') }}
          </p>
        </div>
        <LoginForm :loading="authStore.loading" :error="authStore.error" @submit="handleLogin" />
      </div>
    </div>
  </div>
</template>
