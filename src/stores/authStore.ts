import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import axiosInstance from '@/services/axios'
import { useErrorsStore } from '@/stores/errorsStore'
import { router } from '@/router'
import { useToast } from 'vue-toast-notification'
import type { RegisterPayload, LoginPayload, AuthUser } from '@/types/auth.types'
import type { ApiActionResponse, AuthLoginResponse, LaravelResourceResponse } from '@/types/api/responses.types'
import { handleLaravelValidationError } from '@/services/handleLaravelValidationError'
import type { RouteLocationRaw } from 'vue-router'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
    const $toast = useToast()
    const errorsStore = useErrorsStore()
    
    const user = ref<AuthUser | null>(null)
    const isLoggedIn = computed(() => user.value !== null)

    async function register(payload: RegisterPayload): Promise<void> {
      await axiosInstance.get<void>('/sanctum/csrf-cookie')
      try {
        await axiosInstance.post<ApiActionResponse>('/api/register', payload)
        errorsStore.clear()
        await getAuthUser()
        router.push({ name: 'app.prompts.index' })
      } catch (e) {
        // Handle Laravel validation errors (HTTP 422)
        if (handleLaravelValidationError(e)) return
        // If unexpected API response:
        console.error('Unexpected API response for register:', e)
        $toast.error('Something went wrong. Please try again.')
      }
    }

    async function login(payload: LoginPayload): Promise<void> {
      await axiosInstance.get<void>('/sanctum/csrf-cookie')
      try {
        await axiosInstance.post<AuthLoginResponse>('/api/login', payload)
        errorsStore.clear()
        await getAuthUser()

        // redirect to the correct route
        const redirect = router.currentRoute.value.query.redirect
        if (
          typeof redirect === 'string'
          // check if the redirect-path is safe and is a path on this site
          && redirect.startsWith('/app')
          && !redirect.includes('//')
        ) {
          await router.push(redirect)
        } else {
          await router.push({ name: 'app.prompts.index' })
        }
      } catch (e) {
        // Handle Laravel validation errors (HTTP 422)
        if (handleLaravelValidationError(e)) return
        // Handle "Already authenticated" error (HTTP 409)
        if (axios.isAxiosError(e) && e.response?.status === 409) {
          console.error('Login failed - already authenticated:', e)
          await logout({
            redirectTo: { name: 'auth.login' },
            toastMessage: 'Something went wrong. Please sign in again.',
            toastType: 'error',
          })
          return
        }
        // If unexpected API response:
        console.error('Unexpected API response for login:', e)
        $toast.error('Something went wrong. Please try again.')
      }
    }

    async function logout(options?: {
      redirectTo?: RouteLocationRaw | null
      toastMessage?: string | null
      toastType?: 'success' | 'info' | 'error'
    }): Promise<void> {
      try {
        await axiosInstance.post<void>('/api/logout')
      } catch (e) {
        console.error('Logout request failed:', e)
      } finally {
        clearAuthState()
        const message = options?.toastMessage ?? 'You signed out'
        const toastType = options?.toastType ?? 'success'
        if (message) {
          if (toastType === 'success') $toast.success(message)
          if (toastType === 'info') $toast.info(message)
          if (toastType === 'error') $toast.error(message)
        }
        if (options?.redirectTo === null) return
        await router.push(options?.redirectTo ?? { name: 'guest.guest-pages.home' })
      }
    }

    function clearAuthState(): void {
      user.value = null
    }

    async function getAuthUser(): Promise<void> {
      try {
        const response = await axiosInstance.get<LaravelResourceResponse<AuthUser>>('/api/user')
        const responseData = response.data?.data
        if (!responseData) {
          // Expected a Laravel Resource response (data wrapped in `data`)
          throw new Error('Unexpected API response format.')
        }
        user.value = responseData
      } catch (e) {
        console.error('Failed to fetch authenticated user:', e)
        clearAuthState()
      }
    }

    return { user, isLoggedIn, register, login, logout, clearAuthState, getAuthUser }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ['user'],
    },
  }
)