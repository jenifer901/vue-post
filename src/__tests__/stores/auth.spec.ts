import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/services/api'

// mock api service
vi.mock('@/services/api', () => ({
    api: {
        get: vi.fn(),
    }
})
)

describe('auth store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        vi.clearAllMocks()
        localStorage.clear()
    })

    // initial
    it('initializes from localStorage', () => {
        localStorage.setItem('token', 'test-token')
        localStorage.setItem('userId', '1')
        localStorage.setItem('userName', 'jenni')

        const store = useAuthStore()
        store.init()

        expect(store.token).toBe('test-token')
        expect(store.userId).toBe('1')
        expect(store.userName).toBe('jenni')
    })

    // login successfull
    it('logs in successfully', async () => {
        const store = useAuthStore()

        vi.mocked(api.get).mockResolvedValue({
            data: [{ id: 1, name: 'jenni', password: '1234' }],
        } as User)

        await store.login('jenni', '1234')

        expect(store.token).toBe('STATIC_MOCK_TOKEN')
        expect(store.userId).toBe('1')
        expect(store.userName).toBe('jenni')
        expect(store.error).toBe(false)

        expect(localStorage.getItem('token')).toBe('STATIC_MOCK_TOKEN')
    })

    // login fail
    it('sets error when login fails', async () => {
        const store = useAuthStore()

        vi.mocked(api.get).mockResolvedValue({
            data: [],
        } as { data: User[] })

        await store.login('wrong', 'wrong')

        expect(store.error).toBe(true)
        expect(store.token).toBe(null)
    })

    // login error
    it('sets error when api fails', async () => {
        const store = useAuthStore()

        vi.mocked(api.get).mockRejectedValue(new Error('API error'))

        await store.login('jenni', '1234')

        expect(store.error).toBe(true)
        expect(store.loading).toBe(false)
    })

    // logout
    it('logs out correctly', () => {
        const store = useAuthStore()

        // simular estado logueado
        store.token = 'token'
        store.userId = '1'
        store.userName = 'jenni'

        localStorage.setItem('token', 'token')
        localStorage.setItem('userId', '1')
        localStorage.setItem('userName', 'jenni')

        store.logout()

        expect(store.token).toBe(null)
        expect(store.userId).toBe(null)
        expect(store.userName).toBe(null)

        expect(localStorage.getItem('token')).toBe(null)
    })

    // getter
    it('isAuthenticated works correctly', () => {
        const store = useAuthStore()

        expect(store.isAuthenticated).toBe(false)

        store.token = 'token'

        expect(store.isAuthenticated).toBe(true)
    })
})
