<template>
  <div v-if="loading">
    <LoadingSpinner />
  </div>
  <div v-else class="flex items-center gap-3 mb-4">
    <!-- Authors -->
    <select v-model="localUserId" class="select select-bordered select-sm">
      <option value="">Autores</option>
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.name }}
      </option>
    </select>

    <!-- Tags -->
    <select v-model="localTag" class="select select-bordered select-sm">
      <option value="">Tags</option>
      <option v-for="tag in tags" :key="tag" :value="tag">
        {{ tag }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { usePostsStore } from '@/stores/posts'
import LoadingSpinner from '@/shared/components/loadingSpinner.vue'

type User = {
  id: string
  name: string
}

defineProps<{
  users: User[]
  tags: string[]
  loading: boolean
}>()

const postsStore = usePostsStore()

// state local (para controlar selects)
const localUserId = ref<string>('')
const localTag = ref<string>('')

// sync local → store
watch([localUserId, localTag], () => {
  postsStore.setFilter({
    userId: localUserId.value || undefined,
    tag: localTag.value || undefined,
  })
})

// sync inicial
onMounted(() => {
  localUserId.value = postsStore.filters.userId || ''
  localTag.value = postsStore.filters.tag || ''
})
</script>
