import { describe, it, expect, vi, beforeEach } from 'vitest'
import { usePostSelect } from '@/composables/usePostSelect'
import { usePostSelectStore } from '@/stores/selectPost'
import { useCommentsStore } from '@/stores/comments'
import { setActivePinia, createPinia } from 'pinia'

// mocks router
vi.mock('vue-router', () => ({
    useRoute: () => ({
        params: { id: '1' },
    }),
    useRouter: () => ({
        push: vi.fn(),
    }),
}))

vi.mock('@/stores/selectPost')
vi.mock('@/stores/comments')

describe('usePostSelect', () => {
    let postStore: Post
    let commentsStore: Comment

    beforeEach(() => {
        setActivePinia(createPinia())

        postStore = {
            fetchPostById: vi.fn(),
            deletePost: vi.fn(),
            clear: vi.fn(),
        }

        commentsStore = {
            fetchComments: vi.fn(),
            deleteComment: vi.fn(),
            addComment: vi.fn(),
            updateComment: vi.fn(),
            clear: vi.fn(),
            isCommentOwner: vi.fn(),
        }

        vi.mocked(usePostSelectStore).mockReturnValue(postStore)
        vi.mocked(useCommentsStore).mockReturnValue(commentsStore)
    })

    it('fetches post and comments on init', async () => {
        usePostSelect()

        expect(postStore.fetchPostById).toHaveBeenCalledWith('1')
        expect(commentsStore.fetchComments).toHaveBeenCalledWith('1')
    })

    it('opens modal correctly', () => {
        const composable = usePostSelect()

        composable.goToShowModal('comment', '123')

        expect(composable.showModal.value).toBe(true)
    })

    it('deletes comment on confirmModal', async () => {
        const composable = usePostSelect()

        composable.goToShowModal('comment', '123')
        await composable.confirmModal()

        expect(commentsStore.deleteComment).toHaveBeenCalledWith('123')
    })

    it('calls addComment', () => {
        const composable = usePostSelect()

        composable.addComment('test')

        expect(commentsStore.addComment).toHaveBeenCalledWith('1', 'test')
    })

    it('calls updateComment', () => {
        const composable = usePostSelect()

        composable.updateComment('123', 'edit')

        expect(commentsStore.updateComment).toHaveBeenCalledWith('123', 'edit', '1')
    })

    it('clears stores on unmount', () => {
        const composable = usePostSelect()

        // simulamos unmount
        composable.confirmModal // fuerza init

        postStore.clear()
        commentsStore.clear()

        expect(postStore.clear).toHaveBeenCalled()
        expect(commentsStore.clear).toHaveBeenCalled()
    })
})