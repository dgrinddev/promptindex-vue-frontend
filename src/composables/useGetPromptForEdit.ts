import { ref } from 'vue'
import axiosInstance from '@/services/axios'
import { router } from '@/router'
import type { GetPromptForEdit } from '@/types/prompts/prompt.types'
import type { LaravelResourceResponse } from '@/types/api/responses.types'

export function useGetPromptForEdit() {
	const getPromptForEdit_isLoading = ref<boolean>(false)
	const prompt = ref<GetPromptForEdit | null>(null)

	async function getPromptForEdit(id: number): Promise<void> {
		getPromptForEdit_isLoading.value = true
		try {
			const response = await axiosInstance.get<LaravelResourceResponse<GetPromptForEdit>>(`/api/app/prompts/${id}/edit`)
			const responseData = response.data?.data
			if (!responseData) {
				// Expected a Laravel Resource response (data wrapped in `data`)
				throw new Error('Unexpected API response format.')
			}
			prompt.value = responseData
		} catch (e) {
			console.error(`Failed to fetch prompt in getPromptForEdit(id=${id}):`, e)
			router.push({ name: 'errors.not-found' })
		} finally {
			getPromptForEdit_isLoading.value = false
		}
	}

	return { getPromptForEdit_isLoading, prompt, getPromptForEdit }
}