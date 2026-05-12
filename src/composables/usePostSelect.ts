import { useCommentsStore } from '@/stores/comments'
import { usePostSelectStore } from '@/stores/selectPost'
import { storeToRefs } from 'pinia'
import { ref, watch, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

type ModalObj = 'post' | 'comment'

export const usePostSelect = () => {
  const route = useRoute()
  const router = useRouter()

  const postStore = usePostSelectStore()
  const commentsStore = useCommentsStore()

  const { post, loading: loadingPost, isOwner } = storeToRefs(postStore)
  const { comments, loading: loadingComments } = storeToRefs(commentsStore)
  const { isCommentOwner } = commentsStore

  const showModal = ref(false)
  const selectedId = ref<string | null>(null)
  const selectModal = ref<ModalObj | null>(null)

  const postId = route.params.id as string

  watch(
    () => postId,
    async (id) => {
      if (!id) return

      await Promise.all([postStore.fetchPostById(id), commentsStore.fetchComments(id)])
    },
    { immediate: true },
  )

  onUnmounted(() => {
    postStore.clear()
    commentsStore.clear()
  })

  const goToEdit = () => {
    router.push(`/post/${postId}/edit`)
  }

  const goToShowModal = (obj: ModalObj, id?: string) => {
    selectedId.value = id ?? null
    selectModal.value = obj
    showModal.value = true
  }

  const actions: Record<ModalObj, () => Promise<void> | void> = {
    post: async () => {
      await postStore.deletePost(postId)
      router.push('/posts')
    },

    comment: async () => {
      if (!selectedId.value) return
      await commentsStore.deleteComment(selectedId.value)
    },
  }

  const confirmModal = async () => {
    if (!selectModal.value) return

    await actions[selectModal.value]()

    showModal.value = false
    selectModal.value = null
    selectedId.value = null
  }

  const addComment = (text: string) => {
    commentsStore.addComment(postId, text)
  }

  const updateComment = (id: string, text: string) => {
    commentsStore.updateComment(id, text, postId)
  }

  return {
    post,
    loadingPost,
    isOwner,
    comments,
    loadingComments,
    isCommentOwner,
    goToEdit,
    goToShowModal,
    addComment,
    updateComment,
    showModal,
    confirmModal,
  }
}
