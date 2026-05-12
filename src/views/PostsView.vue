<template>
  <div class="overflow-x-auto w-full p-15 pt-3">
    <div class="pb-2">
      <h1 class="text-lg font-semibold text-base-content">{{ $t('FORM_POST.LIST') }}</h1>
    </div>

    <div class="flex justify-between items-start mb-2">
      <!--Filters-->
      <FiltersPosts :users="authors" :tags="tags" :loading="loadingSelect" />

      <span class="text-xs text-gray-400">
        <!--Result view-->
        <div class="pt-4">
          <h3>{{ $t('RESULTS.SHOWING', { shown: 10, total: totalItems }) }}</h3>
        </div>
      </span>
    </div>

    <!-- Loading -->
    <div v-if="loading">
      <LoadingSpinner size="lg" :text="$t('STATE.LOADING')" />
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
    <div class="flex justify-between items-center mt-8 text-sm text-gray-600">
      <button
        data-test="prev-btn"
        type="button"
        @click="prevPage"
        :disabled="!hasPrev"
        class="px-3 py-1 rounded bg-gray-100 disabled:opacity-50"
      >
        {{ $t('BUTTON.PREVIOUS') }}
      </button>
      <PaginationPosts :totalPages="totalPages" :currentPage="currentPage" @pageChange="goToPage" />
      <button
        data-test="next-btn"
        type="button"
        @click="nextPage"
        :disabled="!hasNext"
        class="px-3 py-1 rounded bg-gray-100 disabled:opacity-50"
      >
        {{ $t('BUTTON.NEXT') }}
      </button>
    </div>
  </div>
  <!-- Add button float -->
  <FabButton @click="goToAddPost">
    <AddCircle class="w-5 h-5" />
  </FabButton>
</template>

<script setup lang="ts">
import CardPost from '@/components/posts/CardPost.vue'
import FiltersPosts from '@/components/posts/FiltersPosts.vue'
import PaginationPosts from '@/components/posts/PaginationPosts.vue'
import { usePostsPage } from '@/composables/usePostsPage'
import FabButton from '@/shared/components/FabButton.vue'
import LoadingSpinner from '@/shared/components/loadingSpinner.vue'
import AddCircle from '@/shared/icons/addCircle.vue'

const {
  posts,
  totalPages,
  loading,
  hasPrev,
  hasNext,
  currentPage,
  totalItems,
  authors,
  tags,
  loadingSelect,
  prevPage,
  nextPage,
  goToPage,
  goToPost,
  goToAddPost,
} = usePostsPage()
</script>
