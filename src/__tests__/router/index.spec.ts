import { describe, it, expect, beforeEach, vi } from 'vitest'
import router from '@/router'

describe('router guards', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('redirects to /login if not authenticated', async () => {
        await router.push('/posts')
        await router.isReady()

        expect(router.currentRoute.value.fullPath).toBe('/login')
    })

    it('allows access if authenticated', async () => {
        localStorage.setItem('token', 'test-token')

        await router.push('/posts')
        await router.isReady()

        expect(router.currentRoute.value.fullPath).toBe('/posts')
    })

    it('redirects to /posts if already logged and goes to /login', async () => {
        localStorage.setItem('token', 'test-token')

        await router.push('/login')
        await router.isReady()

        expect(router.currentRoute.value.fullPath).toBe('/posts')
    })

    it('allows access to public route without auth', async () => {
        await router.push('/login')
        await router.isReady()

        expect(router.currentRoute.value.fullPath).toBe('/login')
    })

    it('redirects unknown routes to /posts', async () => {
        localStorage.setItem('token', 'test-token')
        await router.push('/random-route')
        await router.isReady()

        expect(router.currentRoute.value.fullPath).toBe('/posts')
    })
})