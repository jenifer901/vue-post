import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { api } from '@/services/api'
import type { Comment } from '@/models/comment.model'
import { useAuthStore } from './auth'

export const useCommentsStore = defineStore('comments', () => {
  const comments = ref<Comment[]>([])
  const loading = ref(false)

  const { userId, userName } = storeToRefs(useAuthStore())

  const fetchComments = async (postId: string) => {
    if (!comments.value.length) {
      loading.value = true
    }
    try {
      const res = await api.get('/comments', {
        params: {
          _where: JSON.stringify({
            postId: { eq: String(postId) },
          }),
          _embed: 'user',
        },
      })
      comments.value = res.data
    } finally {
      loading.value = false
    }
  }

  const isCommentOwner = (comment: Comment) => {
    return comment.userId === userId.value
  }

  const addComment = async (postId: string, body: string) => {
    const res = await api.post('/comments', {
      postId,
      body,
      createdAt: new Date().toISOString(),
      userId: userId.value,
    })

    comments.value.unshift({
      ...res.data,
      user: { id: userId.value, name: userName.value },
    })
  }

  const updateComment = async (id: string, body: string, postId: string) => {
    await api.put(`/comments/${id}`, {
      body,
      postId,
      createdAt: new Date().toISOString(),
      userId: userId.value,
    })

    const index = comments.value.findIndex((c) => c.id === id)
    if (index !== -1) comments.value[index] = { ...comments.value[index], body } as Comment
    console.log(comments.value[index])
    debugger
  }

  const deleteComment = async (id: string) => {
    await api.delete(`/comments/${id}`)
    comments.value = comments.value.filter((c) => c.id !== id)
  }

  const clear = () => {
    comments.value = []
  }

  return {
    comments,
    loading,
    fetchComments,
    isCommentOwner,
    addComment,
    updateComment,
    deleteComment,
    clear,
  }
})
