import { describe, it, expect, vi, beforeEach } from 'vitest'
import { api } from '@/services/api'

describe('api service', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  // request interceptor (token)
  it('adds Authorization header if token exists', async () => {
    localStorage.setItem('token', 'TEST_TOKEN')

    const config = {
      headers: {},
    }

    const interceptor = api.interceptors.request.handlers[0].fulfilled
    const result = await interceptor(config)

    expect(result.headers.Authorization).toBe('Bearer TEST_TOKEN')
  })

  // request sin token
  it('does not add Authorization header if no token', async () => {
    const config = {
      headers: {},
    }

    const interceptor = api.interceptors.request.handlers[0].fulfilled
    const result = await interceptor(config)

    expect(result.headers.Authorization).toBeUndefined()
  })

  // response OK
  it('returns response if no error', async () => {
    const response = { data: 'ok' }

    const interceptor = api.interceptors.response.handlers[0].fulfilled
    const result = interceptor(response)

    expect(result).toEqual(response)
  })

  // response 401
  it('clears localStorage on 401 error', async () => {
    localStorage.setItem('token', 'TOKEN')
    localStorage.setItem('userId', '1')
    localStorage.setItem('userName', 'test')

    const error = {
      response: {
        status: 401,
      },
    }

    const interceptor = api.interceptors.response.handlers[0].rejected

    await expect(interceptor(error)).rejects.toBeDefined()

    expect(localStorage.getItem('token')).toBeNull()
    expect(localStorage.getItem('userId')).toBeNull()
    expect(localStorage.getItem('userName')).toBeNull()
  })

  // response error distinto de 401
  it('does not clear localStorage on non-401 error', async () => {
    localStorage.setItem('token', 'TOKEN')

    const error = {
      response: {
        status: 500,
      },
    }

    const interceptor = api.interceptors.response.handlers[0].rejected

    await expect(interceptor(error)).rejects.toBeDefined()

    expect(localStorage.getItem('token')).toBe('TOKEN')
  })
})
