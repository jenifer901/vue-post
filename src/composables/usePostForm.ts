import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePostsStore } from '@/stores/posts'
import type { Post } from '@/models/post.model'

export const usePostForm = () => {
    const router = useRouter()
    const route = useRoute()
    const postsStore = usePostsStore()

    // detectar modo
    const isEdit = computed(() => !!route.params.id)

    // state
    const title = ref('')
    const body = ref('')
    const tagsInput = ref('')
    const saving = ref(false)

    const errors = ref({
        title: '',
        body: '',
    })

    // load data
    onMounted(() => {
        if (isEdit.value) {
            const post = postsStore.posts.find(
                (p) => !!route.params.id ? +p.id === +route.params.id : false,
            )

            if (post) {
                title.value = post.title
                body.value = post.body
                tagsInput.value = post.tags?.join(', ') || ''
            }
        }
    })

    // validar
    const validate = () => {
        errors.value.title = ''
        errors.value.body = ''

        let valid = true

        if (!title.value.trim()) {
            errors.value.title = 'Title is required'
            valid = false
        }

        if (!body.value.trim()) {
            errors.value.body = 'Content is required'
            valid = false
        }

        return valid
    }

    const parseTags = (input: string) =>
        input.split(',').map(t => t.trim()).filter(Boolean)

    // submit
    const handleSubmit = async () => {
        if (!validate()) return

        saving.value = true

        try {
            if (isEdit.value) {
                await postsStore.updatePost(Number(route.params.id), {
                    title: title.value,
                    body: body.value,
                    tags: parseTags(tagsInput.value),
                })
            } else {
                await postsStore.addPost({
                    title: title.value,
                    body: body.value,
                    tags: parseTags(tagsInput.value),
                })
            }

            router.push('/posts')
        } finally {
            saving.value = false
        }
    }

    const isValid = computed(() => {
        return title.value.trim() && body.value.trim()
    })

    const goBack = () => router.back()

    return {
        title,
        body,
        tagsInput,
        saving,
        errors,
        isValid,
        isEdit,
        handleSubmit,
        goBack,
    }
}