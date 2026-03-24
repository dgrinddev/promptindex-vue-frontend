import { useToast } from 'vue-toast-notification'
import { useErrorsStore } from '@/stores/errorsStore'
import { ref } from 'vue'
import axiosInstance from '@/services/axios'
import { router } from '@/router'
import { handleLaravelValidationError } from '@/services/handleLaravelValidationError'
import type { PromptPayload } from '@/types/prompts/prompt.types'
import type { ApiActionResponse } from '@/types/api/responses.types'

export function useSavePrompt() {
	const $toast = useToast()
	const errorsStore = useErrorsStore()
	
	const savePrompt_isLoading = ref<boolean>(false)

	async function savePrompt(payload: PromptPayload, promptId: number | null): Promise<void> {
		savePrompt_isLoading.value = true
		try {
			if (promptId) {
				await axiosInstance.put<ApiActionResponse>(`/api/app/prompts/${promptId}`, payload)
			} else {
				await axiosInstance.post<ApiActionResponse>('/api/app/prompts', payload)
			}
			errorsStore.clear()
			$toast.success(`Prompt ${promptId ? 'updated' : 'created and published'}!`)
			router.push({ name: 'app.prompts.index' })
		} catch (e) {
			// Handle Laravel validation errors (HTTP 422)
			if (handleLaravelValidationError(e)) return
			// If unexpected API response:
			console.error('Unexpected API response for savePrompt:', e)
			$toast.error('Something went wrong. Please try again.')
		} finally {
			savePrompt_isLoading.value = false
		}
	}

	return { savePrompt_isLoading, savePrompt }
}