import { defineStore } from 'pinia'
import { api } from '@/services/api'
import type { User } from '@/models/user.model'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: null as string | null,
    userName: null as string | null,
    token: null as string | null,
    loading: false,
    error: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    init() {
      this.token = localStorage.getItem('token')
      this.userId = localStorage.getItem('userId')
      this.userName = localStorage.getItem('userName')
    },

    async login(name: string, password: string) {
      this.loading = true
      this.error = false

      try {
        const res = await api.get<User[]>('/users')
        const users = res.data

        const user = users.find((u) => u.name === name && u.password === password)

        if (!user) {
          this.error = true
          return
        }

        const token = 'STATIC_MOCK_TOKEN'

        localStorage.setItem('token', token)
        localStorage.setItem('userId', String(user.id))
        localStorage.setItem('userName', user.name)

        this.token = token
        this.userId = String(user.id)
        this.userName = user.name
      } catch (e) {
        this.error = true
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('userName')

      this.token = null
      this.userId = null
      this.userName = null
    },
  },
})
