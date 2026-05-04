<script setup lang="ts">
import { usePostsStore } from '@/stores/posts'

const store = usePostsStore()
</script>

<template>
  <input
    class="border-gray-300 bg-gray-200 border rounded-lg px-3 py-2 text-sm hover:border-gray-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
    type="text"
    :placeholder="$t('HEADER.SEARCH')"
    v-model="store.searchInput"
  />
</template>
