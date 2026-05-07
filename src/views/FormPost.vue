<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-semibold mb-2">{{ $t('FORM_POST.NEW_POST') }}</h1>
    <p class="text-gray-500 mb-6">{{ $t('FORM_POST.NEW') }}</p>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- TITLE -->
      <div>
        <label class="text-xs text-gray-500 font-semibold mb-1 block">
          {{ $t('FORM_POST.TITLE') }}
        </label>

        <input
          v-model="title"
          type="text"
          class="w-full p-3 rounded bg-gray-100 outline-none border"
          :class="errors.title && 'border-red-500'"
          :placeholder="$t('FORM_POST.TITLE_POST')"
        />

        <p v-if="errors.title" class="text-red-500 text-xs mt-1">
          {{ errors.title }}
        </p>
      </div>

      <!-- CONTENT -->
      <div>
        <label class="text-xs text-gray-500 font-semibold mb-1 block">
          {{ $t('FORM_POST.BODY') }}
        </label>

        <textarea
          v-model="body"
          rows="6"
          class="w-full p-3 rounded bg-gray-100 outline-none border"
          :class="errors.body && 'border-red-500'"
          :placeholder="$t('FORM_POST.BODY_POST')"
        />

        <p v-if="errors.body" class="text-red-500 text-xs mt-1">
          {{ errors.body }}
        </p>
      </div>

      <!-- TAGS -->
      <div>
        <label class="text-xs text-gray-500 font-semibold mb-1 block">
          {{ $t('FORM_POST.TAGS') }}
        </label>

        <input
          v-model="tagsInput"
          type="text"
          class="w-full p-3 rounded bg-gray-100 outline-none"
          :placeholder="$t('FORM_POST.TAGS_POST')"
        />
      </div>

      <!-- ACTIONS -->
      <div class="flex justify-between items-center pt-4">
        <button type="button" @click="goBack" class="text-gray-500 hover:underline">
          {{ $t('BUTTON.CANCEL') }}
        </button>

        <button
          type="submit"
          :disabled="!isValid || saving"
          class="px-5 py-2 rounded text-white transition"
          :class="[isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed']"
        >
          <span v-if="!saving">{{ $t('BUTTOM.PUBLIC') }}</span>
          <span v-else>{{ $t('STATE.SAVE') }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { usePostForm } from '@/composables/usePostForm'

const { title, body, tagsInput, saving, errors, isValid, handleSubmit, goBack } = usePostForm()
</script>
