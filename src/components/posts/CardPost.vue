<template>
  <div @click="$emit('select', post)">
    <!-- header -->
    <div class="flex justify-between items-start mb-2">
      <h2 class="text-lg font-semibold text-base-content">
        {{ post.title }}
      </h2>

      <span class="text-xs text-gray-400">
        {{ formatDateShort(post.createdAt, locale) }}
      </span>
    </div>

    <!-- body -->
    <p class="text-sm text-gray-500 mb-4 line-clamp-2">
      {{ post.body }}
    </p>

    <!-- footer -->
    <div class="flex justify-between items-center">
      <!-- user -->
      <div class="flex items-center gap-2">
        <img
          :src="post.user?.avatar"
          class="w-6 h-6 rounded-full bg-base-200 flex items-center justify-center text-xs font-medium"
        />
        <span class="text-sm text-gray-600">
          {{ post.user?.name }}
        </span>
      </div>

      <!-- tags -->
      <div class="flex gap-2">
        <span v-for="tag in post.tags" :key="tag" class="p-2 text-xs rounded-lg bg-gray-300">
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '@/models/post.model'
import { useI18n } from 'vue-i18n'
import { formatDateShort } from '@/utils/date'
const { locale } = useI18n()

defineProps<{
  post: Post
}>()

defineEmits<{
  (e: 'select', post: Post): void
}>()
</script>
