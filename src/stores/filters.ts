import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '@/services/api'
import type { Post } from '@/models/post.model'

export const useFiltersStore = defineStore('filters', () => {
  const posts = ref<Post[]>([])
  const loading = ref(false)

  const fetchFiltersData = async () => {
    loading.value = true

    try {
      const res = await api.get('/posts', {
        params: {
          _embed: 'user',
        },
      })

      posts.value = res.data
    } finally {
      loading.value = false
    }
  }

  // authors
  const authors = computed(() => {
    const map = new Map<string, string>()

    posts.value.forEach((p) => {
      if (p.userId && p.user?.name) {
        map.set(p.userId, p.user.name)
      }
    })

    return Array.from(map.entries()).map(([id, name]) => ({
      id,
      name,
    }))
  })

  // tags
  const tags = computed(() => {
    const allTags = posts.value.flatMap((p) => p.tags ?? [])
    return [...new Set(allTags)]
  })

  return {
    loading,
    authors,
    tags,
    fetchFiltersData,
  }
})
