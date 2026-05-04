<template>
  <div>
    <!-- form -->
    <form class="space-y-5" @submit.prevent="onSubmit">
      <!-- usuario -->
      <div class="flex flex-col gap-1">
        <p class="text-xs font-medium text-gray-500">
          {{ $t('LOGIN.USER') }}
        </p>

        <input
          v-model="form.name"
          type="text"
          :placeholder="$t('LOGIN.USER_INPUT')"
          class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p v-if="errors.name" class="text-red-500 text-xs">{{ errors.name }}</p>
      </div>

      <!-- contraseña -->
      <div class="flex flex-col gap-1">
        <p class="text-xs font-medium text-gray-500">
          {{ $t('LOGIN.PASSWORD') }}
        </p>

        <input
          v-model="form.password"
          type="password"
          :placeholder="$t('LOGIN.PASSWORD_INPUT')"
          class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p v-if="errors.password" class="text-red-500 text-xs">{{ errors.password }}</p>
      </div>

      <!-- error -->
      <p v-if="error" class="text-sm text-red-500 text-center">
        {{ $t('LOGIN.CREDENTIAL_ERROR') }}
      </p>

      <!-- botón -->
      <button
        type="submit"
        class="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition"
        :disabled="!isValid"
        :class="
          isValid ? 'bg-blue-600 text-white' : 'bg-gray-200 text-slate-700 hover:bg-slate-100'
        "
      >
        <span v-if="loading" class="animate-pulse">
          {{ $t('STATE.ACCESSING') }}
        </span>

        <span v-else>
          {{ $t('LOGIN.ACCESS') }}
        </span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useLogin } from '@/composables/useLogin'

defineProps<{
  loading: boolean
  error: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', data: { name: string; password: string }): void
}>()

const { form, errors, validate, isValid } = useLogin()

const onSubmit = () => {
  if (!validate()) return

  emit('submit', { ...form })
}
</script>
