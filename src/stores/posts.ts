import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import axios, { type AxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/auth'

// 🧠 tipos
type WhereFilter = {
  userId?: { eq: string }
  tags?: { contains: string }
  or?: Array<{
    title?: { contains: string }
    body?: { contains: string }
  }>
}

type Params = {
  _page: number
  _per_page: number
  _sort: string
  _embed: string
  _where?: string
}

type Post = {
  id: number
  title: string
  body: string
  userId: string
  tags?: string[]
}

type PostsResponse = {
  data: Post[]
  pages: number
  items: number
}

const API_URL = import.meta.env.VITE_API_URL

export const usePostsStore = defineStore('posts', () => {
  const authStore = useAuthStore()

  // state
  const page = ref(1)

  const filters = ref<{
    userId?: string | null
    tag?: string | null
  }>({})

  const searchInput = ref('')
  const addSuccess = ref(false)

  const posts = ref<Post[]>([])
  const totalPages = ref(0)
  const totalItems = ref(0)
  const loading = ref(false)

  //  computed
  const hasNext = computed(() => page.value < totalPages.value)
  const hasPrev = computed(() => page.value > 1)

  //  fetch (equivalente a httpResource)
  const fetchPosts = async () => {
    loading.value = true

    try {
      const params: Params = {
        _page: page.value,
        _per_page: 10,
        _sort: '-views',
        _embed: 'user',
      }

      const where: WhereFilter = {}

      if (filters.value.userId) {
        where.userId = { eq: String(filters.value.userId) }
      }

      if (filters.value.tag) {
        where.tags = { contains: filters.value.tag }
      }

      if (searchInput.value) {
        where.or = [
          { title: { contains: searchInput.value } },
          { body: { contains: searchInput.value } },
        ]
      }

      if (Object.keys(where).length > 0) {
        params._where = JSON.stringify(where)
      }

      const config: AxiosRequestConfig = { params }

      const res = await axios.get<PostsResponse>(`${API_URL}/posts`, config)

      posts.value = res.data.data
      totalPages.value = res.data.pages
      totalItems.value = res.data.items
    } catch (e) {
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  //  reactivo (como signals)
  watch([page, filters, searchInput], fetchPosts, { deep: true })

  //  actions
  const nextPage = () => {
    if (hasNext.value) page.value++
  }

  const prevPage = () => {
    if (hasPrev.value) page.value--
  }

  const goToPage = (p: number) => {
    page.value = p
  }

  const addPost = async (post: Omit<Post, 'id'>) => {
    await axios.post(`${API_URL}/posts`, {
      ...post,
      userId: authStore.userId,
    })

    addSuccess.value = true
    fetchPosts()
  }

  const resetAddState = () => {
    addSuccess.value = false
  }

  const resetFilters = () => {
    filters.value = {
      userId: null,
      tag: null,
    }
    searchInput.value = ''
    page.value = 1
  }

  const setFilter = (filter: { userId?: string; tag?: string }) => {
    filters.value = filter
    page.value = 1
  }

  //  init
  fetchPosts()

  return {
    // state
    posts,
    totalPages,
    totalItems,
    loading,
    searchInput,
    addSuccess,

    // computed
    hasNext,
    hasPrev,
    currentPage: page,

    // actions
    nextPage,
    prevPage,
    goToPage,
    addPost,
    resetAddState,
    resetFilters,
    setFilter,
  }
})
