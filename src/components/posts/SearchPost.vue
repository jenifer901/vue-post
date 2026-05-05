<script setup lang="ts">
import { usePostsStore } from '@/stores/posts'

const store = usePostsStore()
</script>

<template>
  <input
    class="input input-sm bg-gray-200 border-gray-300 text-sm hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
    type="text"
    :placeholder="$t('HEADER.SEARCH')"
    v-model="store.searchInput"
  />
</template>
