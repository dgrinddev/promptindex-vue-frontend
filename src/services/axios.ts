import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { router } from '@/router'
import { toast } from '@/services/toast'
import { API_BASE_URL } from '@/config/env'

const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	// used for session-based authentication
	withCredentials: true,
	withXSRFToken: true,
})

// used if API token based authentication is used
// axiosInstance.interceptors.request.use(config => {
// 	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
// })

axiosInstance.interceptors.response.use(
	(response) => {
		return response
	},
	async (error) => {
		const authStore = useAuthStore()

		if (axios.isAxiosError(error)) {
			if (error.response) {
				switch (error.response.status) {
					case 401:
					case 403:
					case 419:
						authStore.clearAuthState()
						toast.error('Unauthorized')
						router.push({ name: 'auth.login' })
						break
					case 404:
						toast.error('Resource not found')
						router.push({ name: 'errors.not-found' })
						break
					case 500:
						toast.error('Internal Server Error')
						router.push({ name: 'errors.internal-server-error' })
						break
				}
			} else {
				// Network error / timeout
				toast.error('Network error — please try again')
			}
		} else {
			// Not an Axios error
			console.error('HTTP / transport error:', error)
			toast.error('Something went wrong while connecting. Please try again.')
		}

		return Promise.reject(error)
	}
)

export default axiosInstance