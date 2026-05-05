<template>
  <button @click="$emit('click')" :class="['btn btn-circle btn-primary fixed', positionClasses]">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom-right',
})

defineEmits(['click'])

const positionClasses = computed(() => {
  switch (props.position) {
    case 'top-left':
      return 'top-6 left-6'
    case 'top-right':
      return 'top-6 right-6'
    case 'bottom-left':
      return 'bottom-6 left-6'
    case 'bottom-right':
    default:
      return 'bottom-6 right-6'
  }
})
</script>
