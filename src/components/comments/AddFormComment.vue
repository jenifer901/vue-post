<template>
  <div class="bg-gray-50 p-4 rounded-lg">
    <p class="text-sm font-semibold mb-2">
      {{ $t('COMMENTS.ADD') }}
    </p>
    <form @submit.prevent="onSubmit">
      <textarea
        v-model="text"
        rows="3"
        class="w-full p-3 rounded bg-white border outline-none"
        :placeholder="$t('COMMENTS.PLACEHOLDER')"
        @keydown.enter.prevent
      />

      <div class="flex justify-end mt-3">
        <button
          type="submit"
          :disabled="!text.trim()"
          class="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {{ $t('COMMENTS.PUBLIC') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['submit'])

const text = ref('')

const onSubmit = () => {
  if (!text.value.trim()) return

  emit('submit', text.value)
  text.value = ''
}
</script>
