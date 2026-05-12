<template>
  <div class="max-w-3xl mx-auto p-6 space-y-10" @submit.prevent>
    <!-- Post -->
    <div v-if="loadingPost && !post">{{ $t('STATE.LOADING') }}</div>

    <DetailsPost
      v-if="post"
      :post="post"
      :loading="loadingPost"
      :can-edit="isOwner"
      @edit="goToEdit"
      @delete="goToShowModal('post')"
    />

    <!-- Comments-->
    <ListComments
      :comments="comments"
      :loading="loadingComments"
      :is-owner="isCommentOwner"
      @update="updateComment"
      @delete="(id) => goToShowModal('comment', id)"
    />

    <!-- Add Comment-->
    <AddFormComment @submit="addComment" />

    <ConfirmModal
      v-model="showModal"
      :title="$t('BUTTON.DELETE')"
      :message="$t('MODAL.CONFIRM_DELETE_BODY')"
      persistent
      @confirm="confirmModal"
    />
  </div>
</template>
<script setup lang="ts">
import AddFormComment from '@/components/comments/AddFormComment.vue'
import ListComments from '@/components/comments/ListComments.vue'
import DetailsPost from '@/components/posts/DetailsPost.vue'
import { usePostSelect } from '@/composables/usePostSelect'
import ConfirmModal from '@/shared/components/ConfirmModal.vue'

const {
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
} = usePostSelect()
</script>
