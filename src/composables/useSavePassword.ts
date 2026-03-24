import { useToast } from 'vue-toast-notification'
import { useErrorsStore } from '@/stores/errorsStore'
import { ref } from 'vue'
import axiosInstance from '@/services/axios'
import { handleLaravelValidationError } from '@/services/handleLaravelValidationError'
import type { PasswordSettings } from '@/types/settings.types'
import { useAuthStore } from '@/stores/authStore'

export function useSavePassword() {
	const $toast = useToast()
	const errorsStore = useErrorsStore()
	const authStore = useAuthStore()
	
	const savePassword_isLoading = ref<boolean>(false)

	async function savePassword(payload: PasswordSettings): Promise<void> {
		savePassword_isLoading.value = true
		try {
			await axiosInstance.put<void>(`/api/user/password`, payload)
			errorsStore.clear()
			await authStore.logout({
				redirectTo: { name: 'auth.login' },
				toastMessage: 'Password updated. Please sign in again.'
			})
		} catch (e) {
			// Handle Laravel validation errors (HTTP 422)
			if (handleLaravelValidationError(e)) return
			// If unexpected API response:
			console.error('Unexpected API response for savePassword:', e)
			$toast.error('Something went wrong. Please try again.')
		} finally {
			savePassword_isLoading.value = false
		}
	}

	return { savePassword_isLoading, savePassword }
}