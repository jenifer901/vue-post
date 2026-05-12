import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { api } from '@/services/api'
import type { Post } from '@/models/post.model'
import type { CreatePostDto } from '@/models/posts.types'
import { useAuthStore } from './auth'

export const usePostSelectStore = defineStore('postSelect', () => {
  const post = ref<Post | null>(null)
  const loading = ref(false)

  const { userId } = storeToRefs(useAuthStore())

  // FETCH POST
  const fetchPostById = async (id: string) => {
    loading.value = true

    try {
      const res = await api.get(`/posts/${id}`, {
        params: {
          _embed: 'user',
        },
      })

      post.value = res.data
    } finally {
      loading.value = false
    }
  }

  const isOwner = computed(() => {
    return post.value?.userId === userId.value
  })

  // EDIT POST
  const updatePost = async (id: string, data: CreatePostDto) => {
    const res = await api.put(`/posts/${id}`, {
      ...data,
      userId: userId.value,
      createdAt: new Date().toISOString(),
    })

    post.value = res.data
  }

  const deletePost = async (id: string) => {
    await api.delete(`/posts/${id}?_dependent=comments`)
    post.value = null
  }

  // CLEAN
  const clear = () => {
    post.value = null
  }

  return {
    // state
    post,
    loading,

    // actions
    fetchPostById,
    isOwner,
    updatePost,
    deletePost,
    clear,
  }
})
