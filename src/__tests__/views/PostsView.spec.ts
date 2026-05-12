import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PostsView from '@/views/PostsView.vue'

// mock composable post
vi.mock('@/composables/usePostsPage', () => ({
  usePostsPage: () => ({
    posts: [
      { id: '1', title: 'Post 1' },
      { id: '2', title: 'Post 2' },
    ],
    totalPages: 2,
    loading: false,
    hasPrev: false,
    hasNext: true,
    currentPage: 1,
    totalItems: 2,
    authors: [],
    tags: [],
    loadingSelect: false,
    prevPage: vi.fn(),
    nextPage: vi.fn(),
    goToPage: vi.fn(),
    goToPost: vi.fn(),
    goToAddPost: vi.fn(),
  }),
}))

// mock componentes hijos
vi.mock('@/components/posts/CardPost.vue', () => ({
  default: {
    template: '<div data-test="card-post" @click="$emit(\'select\')">Post</div>',
  },
}))

vi.mock('@/components/posts/FiltersPosts.vue', () => ({
  default: {
    template: '<div data-test="filters" />',
  },
}))

vi.mock('@/components/posts/PaginationPosts.vue', () => ({
  default: {
    template: '<div data-test="pagination" />',
  },
}))

vi.mock('@/shared/components/FabButton.vue', () => ({
  default: {
    template: '<button data-test="fab"><slot /></button>',
  },
}))

vi.mock('@/shared/components/loadingSpinner.vue', () => ({
  default: {
    template: '<div data-test="loading" />',
  },
}))

vi.mock('@/shared/icons/addCircle.vue', () => ({
  default: {
    template: '<div />',
  },
}))

describe('PostsView', () => {
  const mountComponent = () =>
    mount(PostsView, {
      global: {
        mocks: {
          $t: (msg: string) => msg, // mock i18n
        },
      },
    })

  //test por componentes hijos
  // render básico
  it('renders title', () => {
    const wrapper = mountComponent()
    expect(wrapper.text()).toContain('FORM_POST.LIST')
  })

  // render de posts
  it('renders posts list', () => {
    const wrapper = mountComponent()
    const posts = wrapper.findAll('[data-test="card-post"]')
    expect(posts.length).toBe(2)
  })

  // loading state
  it('does not show loading when loading is false', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false)
  })

  // botones paginación
  it('disables previous button when hasPrev is false', () => {
    const wrapper = mountComponent()
    const btn = wrapper.find('[data-test="prev-btn"]')

    expect(btn.attributes('disabled')).toBeDefined()
  })

  // botón next activo
  it('enables next button when hasNext is true', () => {
    const wrapper = mountComponent()
    const btn = wrapper.find('[data-test="next-btn"]')

    expect(btn.attributes('disabled')).toBeUndefined()
  })

  // FAB existe
  it('renders floating action button', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('[data-test="fab"]').exists()).toBe(true)
  })
})
