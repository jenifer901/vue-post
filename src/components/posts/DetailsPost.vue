<template>
  <div>
    <div class="flex justify-between items-start mb-10">
      <h1 class="text-2xl font-semibold">
        {{ post.title }}
      </h1>

      <div v-if="canEdit" class="flex gap-2">
        <button
          type="button"
          @click="$emit('edit')"
          class="bg-blue-600 text-white px-3 py-1 rounded"
        >
          {{ $t('BUTTON.EDIT') }}
        </button>

        <button
          type="button"
          @click="$emit('delete')"
          class="bg-red-100 text-red-600 px-3 py-1 rounded"
        >
          {{ $t('BUTTON.DELETE') }}
        </button>
      </div>
    </div>

    <p class="text-gray-600 leading-relaxed whitespace-pre-line">
      {{ post.body }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '@/models/post.model'

defineProps<{
  post: Post
  canEdit: boolean
}>()

defineEmits(['edit', 'delete'])
</script>
