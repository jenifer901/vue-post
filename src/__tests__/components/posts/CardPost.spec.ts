import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CardPost from '@/components/posts/CardPost.vue'

// mock i18n
vi.mock('vue-i18n', () => ({
    useI18n: () => ({
        locale: 'es',
    }),
}))

// mock fecha
vi.mock('@/utils/date', () => ({
    useTimeAgo: () => ({
        formatDateShort: () => 'hoy',
    }),
}))

// mock Post
const postMock = {
    id: '1',
    title: 'Post test',
    body: 'Contenido del post',
    createdAt: new Date().toISOString(),
    user: {
        name: 'Jenni',
        avatar: 'avatar.png',
    },
    tags: ['vue', 'test'],
}

describe('CardPost', () => {
    it('renders post data correctly', () => {
        const wrapper = mount(CardPost, {
            props: { post: postMock },
        })

        expect(wrapper.text()).toContain('Post test')
        expect(wrapper.text()).toContain('Contenido del post')
        expect(wrapper.text()).toContain('Jenni')
        expect(wrapper.text()).toContain('vue')
        expect(wrapper.text()).toContain('test')
        expect(wrapper.text()).toContain('hoy')
    })

    it('emits select event on click', async () => {
        const wrapper = mount(CardPost, {
            props: { post: postMock },
        })

        await wrapper.trigger('click')

        expect(wrapper.emitted('select')).toBeTruthy()
        expect(wrapper.emitted('select')?.[0]).toEqual([postMock])
    })

    it('renders user avatar', () => {
        const wrapper = mount(CardPost, {
            props: { post: postMock },
        })

        const img = wrapper.find('img')
        expect(img.attributes('src')).toBe('avatar.png')
    })

    it('renders all tags', () => {
        const wrapper = mount(CardPost, {
            props: { post: postMock },
        })

        const tags = wrapper.findAll('span')

        expect(tags.length).toBeGreaterThan(0)
    })
})