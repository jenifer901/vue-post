<template>
  <div :class="containerClass">
    <span class="loading loading-spinner" :class="sizeClass"></span>
    <p v-if="text" class="mt-2 text-sm text-gray-500">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text?: string
    centered?: boolean
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    text: 'loading...',
    centered: true,
    size: 'md',
  },
)

const sizeClass = {
  sm: 'loading-sm',
  md: 'loading-md',
  lg: 'loading-lg',
}[props.size]

const containerClass = props.centered
  ? 'flex flex-col items-center justify-center w-full py-10'
  : 'flex flex-col items-center'
</script>
