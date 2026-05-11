<template>
  <div class="p-2">
    <!-- HEADER -->
    <div class="flex justify-between gap-2 text-xs">
      <p class="text-sm font-semibold">
        {{ comment.user?.name || 'Usuario' }}
      </p>

      <p class="text-xs text-gray-500">
        {{ formatTimeAgo(comment.createdAt) }}
      </p>
    </div>

    <!-- VIEW -->
    <div v-if="!isEditing">
      <p class="text-gray-600 text-sm">
        {{ comment.body }}
      </p>

      <div class="flex justify-end gap-2 mt-1" v-if="isOwner(comment)">
        <button type="button" @click="startEdit">
          <EditIcon class="w-4 h-4 text-blue-500 hover:text-gray-400 transition" />
        </button>

        <button type="button" @click="$emit('delete', comment.id)">
          <DeleteIcon class="w-5 h-5 text-red-500 hover:text-gray-400 transition" />
        </button>
      </div>
    </div>

    <!-- EDIT -->
    <div v-else>
      <textarea
        @keydown.enter.prevent
        v-model="editText"
        class="w-full p-2 border rounded text-sm"
      />

      <div class="flex justify-end gap-2 mt-2 text-xs">
        <button type="button" @click.stop.prevent="save" class="text-blue-600">
          {{ $t('BUTTON.SAVE') }}
        </button>

        <button type="button" @click.stop.prevent="cancel" class="text-gray-400">
          {{ $t('BUTTON.CANCEL') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Comment } from '@/models/comment.model'
import { ref } from 'vue'
import { useTimeAgo } from '@/utils/date'
import EditIcon from '@/shared/icons/editIcon.vue'
import DeleteIcon from '@/shared/icons/deleteIcon.vue'

const { formatTimeAgo } = useTimeAgo()

const props = defineProps<{
  comment: Comment
  isOwner: (c: Comment) => boolean
}>()

const emit = defineEmits<{
  (e: 'update', payload: { id: string; text: string }): void
  (e: 'delete', id: string): void
}>()

const isEditing = ref(false)
const editText = ref(props.comment.body)

const startEdit = () => {
  isEditing.value = true
}

const cancel = () => {
  isEditing.value = false
  editText.value = props.comment.body
}

const save = () => {
  emit('update', {
    id: props.comment.id,
    text: editText.value,
  })
  isEditing.value = false
}
</script>
