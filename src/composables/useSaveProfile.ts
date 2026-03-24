import { useToast } from 'vue-toast-notification'
import { useErrorsStore } from '@/stores/errorsStore'
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'
import axiosInstance from '@/services/axios'
import { router } from '@/router'
import { handleLaravelValidationError } from '@/services/handleLaravelValidationError'
import type { ProfileSettings } from '@/types/settings.types'

export function useSaveProfile() {
	const $toast = useToast()
	const errorsStore = useErrorsStore()
	const authStore = useAuthStore()
	
	const saveProfile_isLoading = ref<boolean>(false)

	async function saveProfile(payload: ProfileSettings): Promise<void> {
		saveProfile_isLoading.value = true
		try {
			await axiosInstance.put<void>(`/api/user/profile-information`, payload)
			errorsStore.clear()
			$toast.success(`Profile updated!`)
			authStore.getAuthUser()
			router.push({ name: 'app.prompts.index' })
		} catch (e) {
			// Handle Laravel validation errors (HTTP 422)
			if (handleLaravelValidationError(e)) return
			// If unexpected API response:
			console.error('Unexpected API response for saveProfile:', e)
			$toast.error('Something went wrong. Please try again.')
		} finally {
			saveProfile_isLoading.value = false
		}
	}

	return { saveProfile_isLoading, saveProfile }
}