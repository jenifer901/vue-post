<template>
  <div class="border-t border-gray-200 pt-6">
    <p class="text-xs text-gray-400 mb-4">{{ $t('COMMENTS.TITLE') }} / {{ comments.length }}</p>

    <div v-if="loading && !comments.length">{{ $t('STATE.LOADING') }}</div>

    <div v-else-if="!comments.length" class="text-gray-400">
      {{ $t('COMMENTS.EMPTY') }}
    </div>

    <CommentItem
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      :isOwner="isOwner"
      @update="$emit('update', $event.id, $event.text)"
      @delete="$emit('delete', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Comment } from '@/models/comment.model'
import CommentItem from './CommentItem.vue'

defineProps<{
  comments: Comment[]
  loading: boolean
  isOwner: (comment: Comment) => boolean
}>()

defineEmits(['update', 'delete'])
</script>
