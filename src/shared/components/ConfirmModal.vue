<script setup lang="ts">
const modelValue = defineModel<boolean>()

const props = defineProps<{
  title: string
  message: string
  loading?: boolean
  persistent?: boolean
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const close = () => {
  if (!props.persistent) modelValue.value = false
}

const onConfirm = () => {
  emit('confirm')
}
</script>

<template>
  <dialog class="modal" :class="{ 'modal-open': modelValue }">
    <div class="modal-box">
      <h3 class="font-bold text-lg">{{ title }}</h3>

      <p class="py-4 text-sm text-gray-600">
        {{ message }}
      </p>

      <div class="modal-action border-t border-t-gray-500 pt-2">
        <button type="button" class="btn" @click="modelValue = false">
          {{ $t('BUTTON.CANCEL') }}
        </button>

        <button type="button" class="btn btn-error" @click="onConfirm" :disabled="loading">
          <span v-if="loading" class="loading loading-spinner"></span>
          <span v-else>{{ $t('BUTTON.ACCEPT') }}</span>
        </button>
      </div>
    </div>
    <div class="modal-backdrop" @click="close"></div>
    <!--
    <form method="dialog" class="modal-backdrop" @click="close">
      <button type="button">close</button>
    </form>-->
  </dialog>
</template>
