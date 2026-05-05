<template>
  <div>
    <!-- form -->
    <form class="space-y-5" @submit.prevent="onSubmit">
      <!-- usuario -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">
            {{ $t('LOGIN.USER') }}
          </span>
        </label>

        <input
          v-model="form.name"
          type="text"
          :placeholder="$t('LOGIN.USER_INPUT')"
          class="input input-bordered w-full"
        />

        <span v-if="errors.name" class="text-error text-xs mt-1">
          {{ errors.name }}
        </span>
      </div>

      <!-- contraseña -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">
            {{ $t('LOGIN.PASSWORD') }}
          </span>
        </label>

        <input
          v-model="form.password"
          type="password"
          :placeholder="$t('LOGIN.PASSWORD_INPUT')"
          class="input input-bordered w-full"
        />

        <span v-if="errors.password" class="text-error text-xs mt-1">
          {{ errors.password }}
        </span>
      </div>

      <!-- error -->
      <div v-if="error" class="alert alert-error py-2 text-sm">
        {{ $t('LOGIN.CREDENTIAL_ERROR') }}
      </div>

      <!-- botón -->
      <button type="submit" class="btn btn-primary w-full" :disabled="!isValid || loading">
        <span v-if="loading" class="loading loading-spinner"></span>

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
