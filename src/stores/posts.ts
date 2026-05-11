import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/services/api'
import type { Post } from '@/models/post.model'
import type {
  CreatePostDto,
  PostsApiResponse,
  PostsQueryParams,
  PostsWhereFilter,
} from '@/models/posts.types'

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
  const currentPage = computed(() => page.value)

  //  fetch (equivalente a httpResource)
  const fetchPosts = async () => {
    loading.value = true

    try {
      const params: PostsQueryParams = {
        _page: page.value,
        _per_page: 10,
        _sort: '-views',
        _embed: 'user',
      }

      const where: PostsWhereFilter = {}

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

      const config = { params }

      const res = await api.get<PostsApiResponse>('/posts', config)

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
  watch([page, filters, searchInput], fetchPosts, {
    deep: true,
  })

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

  const addPost = async (post: CreatePostDto) => {
    await api.post('/posts', {
      ...post,
      userId: authStore.userId,
      createdAt: new Date().toISOString(),
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

  return {
    // state
    posts,
    totalPages,
    totalItems,
    loading,
    searchInput,
    addSuccess,
    filters,

    // computed
    hasNext,
    hasPrev,
    currentPage,

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
