import { ref } from 'vue'
import axiosInstance from '@/services/axios'
import { toast } from '@/services/toast'
import { router } from '@/router'
import type { DeleteAccountPayload } from '@/types/settings.types'
import { handleLaravelValidationError } from '@/services/handleLaravelValidationError'
import { useErrorsStore } from '@/stores/errorsStore'
import { useAuthStore } from '@/stores/authStore'

export function useDeleteUser() {
	const errorsStore = useErrorsStore()
	const authStore = useAuthStore()
	
	const deleteUser_isLoading = ref<boolean>(false)

	async function deleteUser(payload: DeleteAccountPayload): Promise<void> {
		deleteUser_isLoading.value = true
		try {
			const response = await axiosInstance.delete<void>('/api/app/user/delete-account', { data: payload })
			if (response.status !== 204) {
				console.warn(`useDeleteUser: unexpected success status code`, response.status)
			}
			errorsStore.clear()
			authStore.clearAuthState()
			toast.success('User deleted!')
			router.push({ name: 'guest.guest-pages.home' })
		} catch (e) {
			// Handle Laravel validation errors (HTTP 422)
			if (handleLaravelValidationError(e)) return
			// If unexpected API response:
			console.error('Unexpected API response for deleteUser:', e)
			toast.error('Failed to delete the user. Please reload the page.')
		} finally {
			deleteUser_isLoading.value = false
		}
	}

	return { deleteUser_isLoading, deleteUser }
}