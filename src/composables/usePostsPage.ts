import { onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePostsStore } from '@/stores/posts'
import { useFiltersStore } from '@/stores/useFilterStore'
import { storeToRefs } from 'pinia'
import type { Post } from '@/models/post.model'

export const usePostsPage = () => {
    const router = useRouter()
    const route = useRoute()

    const postsStore = usePostsStore()
    const filtersStore = useFiltersStore()

    const {
        posts,
        totalPages,
        loading,
        hasPrev,
        hasNext,
        currentPage,
        searchInput,
        filters,
        totalItems
    } = storeToRefs(postsStore)

    const { authors, tags, loading: loadingSelect } = storeToRefs(filtersStore)

    const { prevPage, nextPage, goToPage } = postsStore

    // Initialize state from URL (page, filters, search)
    onMounted(() => {
        filtersStore.fetchFiltersData()

        const query = route.query

        goToPage(Number(query.page) || 1)

        if (!query.userId && !query.tag && !query.search) {
            postsStore.resetFilters()
        } else {
            postsStore.setFilter({
                userId: query.userId as string,
                tag: query.tag as string,
            })

            searchInput.value = (query.search as string) || ''
        }
    })

    // Keep URL in sync with current state (pagination, filters, search)
    watch(
        () => ({
            page: currentPage.value,
            userId: filters.value.userId,
            tag: filters.value.tag,
            search: searchInput.value,
        }),
        (state) => {
            router.replace({
                query: {
                    page: state.page.toString(),
                    ...(state.userId && { userId: state.userId }),
                    ...(state.tag && { tag: state.tag }),
                    ...(state.search && { search: state.search }),
                },
            })
        },
        { deep: true }
    )

    // actions
    const goToPost = (post: Post) => {
        router.push(`/post/${post.id}`)
    }

    const goToAddPost = () => {
        router.push('/post/new')
    }


    return {
        // state
        posts,
        totalPages,
        loading,
        hasPrev,
        hasNext,
        currentPage,
        totalItems,
        searchInput,
        authors,
        tags,
        loadingSelect,
        // actions
        prevPage,
        nextPage,
        goToPage,
        goToPost,
        goToAddPost,
    }
}