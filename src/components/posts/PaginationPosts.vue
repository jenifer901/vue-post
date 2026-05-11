<template>
  <div class="flex items-center gap-1">
    <template v-for="(item, index) in items" :key="index">
      <!-- página -->
      <button
        type="button"
        v-if="item.type === 'page'"
        @click="selectPage(item.value!)"
        :class="['px-3 py-1 border rounded transition', pageClasses(item.value!)]"
      >
        {{ item.value }}
      </button>

      <!-- ellipsis -->
      <span v-else class="px-2 text-gray-400"> ... </span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type PageItem = { type: 'page'; value: number } | { type: 'ellipsis' }

const props = defineProps<{
  totalPages: number
  currentPage: number
}>()

const emit = defineEmits<{
  (e: 'pageChange', page: number): void
}>()

// lógica de paginación
const items = computed<PageItem[]>(() => {
  const total = props.totalPages
  const current = props.currentPage

  const result: PageItem[] = []

  const left = Math.max(2, current - 1)
  const right = Math.min(total - 1, current + 1)

  result.push({ type: 'page', value: 1 })

  if (left > 2) {
    result.push({ type: 'ellipsis' })
  }

  for (let i = left; i <= right; i++) {
    result.push({ type: 'page', value: i })
  }

  if (right < total - 1) {
    result.push({ type: 'ellipsis' })
  }

  if (total > 1) {
    result.push({ type: 'page', value: total })
  }

  return result
})

const selectPage = (page: number) => {
  emit('pageChange', page)
}

const isActive = (page: number) => {
  return page === props.currentPage
}

const pageClasses = (page: number) =>
  isActive(page)
    ? 'bg-blue-600 text-white border-blue-600'
    : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
</script>
