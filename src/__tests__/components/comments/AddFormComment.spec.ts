import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AddFormComment from '@/components/comments/AddFormComment.vue'

// mock i18n
vi.mock('vue-i18n', () => ({
    useI18n: () => ({
        t: (key: string) => key,
    }),
}))

export const mountWithI18n = (component: component, options = {}) => {
    return mount(component, {
        global: {
            mocks: {
                $t: (key: string) => key,
            },
        },
        ...options,
    })
}

describe('AddFormComment', () => {
    it('renders correctly', () => {
        const wrapper = mountWithI18n(AddFormComment)

        expect(wrapper.text()).toContain('COMMENTS.ADD')
        expect(wrapper.find('textarea').exists()).toBe(true)
        expect(wrapper.find('button').exists()).toBe(true)
    })

    it('disables submit button when textarea is empty', () => {
        const wrapper = mountWithI18n(AddFormComment)

        const button = wrapper.find('button')

        expect(button.attributes('disabled')).toBeDefined()
    })

    it('enables submit button when text is entered', async () => {
        const wrapper = mountWithI18n(AddFormComment)

        const textarea = wrapper.find('textarea')

        await textarea.setValue('nuevo comentario')

        const button = wrapper.find('button')

        expect(button.attributes('disabled')).toBeUndefined()
    })

    it('emits submit event with text', async () => {
        const wrapper = mountWithI18n(AddFormComment)

        const textarea = wrapper.find('textarea')

        await textarea.setValue('comentario test')
        await wrapper.find('form').trigger('submit.prevent')

        expect(wrapper.emitted('submit')).toBeTruthy()
        expect(wrapper.emitted('submit')?.[0]).toEqual(['comentario test'])
    })

    it('clears textarea after submit', async () => {
        const wrapper = mountWithI18n(AddFormComment)

        const textarea = wrapper.find('textarea')

        await textarea.setValue('comentario test')
        await wrapper.find('form').trigger('submit.prevent')

        expect((textarea.element as HTMLTextAreaElement).value).toBe('')
    })
})