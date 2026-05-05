<template>
  <div class="overflow-x-auto w-full p-10">
    <p>{{ $t('FORM_POST.LIST') }}</p>

    <!--Filters-->

    <!--Result view-->

    <!-- Loading -->
    <div v-if="loading" class="w-full">
      <p>{{ $t('STATE.LOADING') }}</p>
    </div>

    <!--Pots-->
    <div v-if="!loading">
      <div
        v-for="(post, index) in posts"
        :key="post.id"
        :class="[
          'p-4 rounded-lg mb-2 hover:shadow-md transition border border-gray-200 ',
          index % 2 === 0 ? 'bg-white' : 'bg-gray-150',
        ]"
      >
        <CardPost :post="post" @select="goToPost" />
      </div>
    </div>
    <!-- Pagination -->
  </div>
  <!-- Add button float -->
  <FabButton @click="goToAddPost">
    <AddCircle class="w-5 h-5" />
  </FabButton>
</template>

<script setup lang="ts">
import CardPost from '@/components/posts/CardPost.vue'
import type { Post } from '@/models/post.model'
import FabButton from '@/shared/components/FabButton.vue'
import AddCircle from '@/shared/icons/addCircle.vue'
import { usePostsStore } from '@/stores/posts'
import { useRouter } from 'vue-router'
const router = useRouter()

const postsStore = usePostsStore()

const posts = postsStore.posts
const loading = postsStore.loading

const goToPost = (post: Post) => {
  router.push(`/post/${post.id}`)
}

const goToAddPost = () => {
  router.push('/post/new')
}
</script>
