import { ref } from 'vue'
import axiosInstance from '@/services/axios'
import { router } from '@/router'
import type { GetPrompt } from '@/types/prompts/prompt.types'
import type { LaravelResourceResponse } from '@/types/api/responses.types'

export function useGetPrompt() {
	const getPrompt_isLoading = ref<boolean>(false)
	const prompt = ref<GetPrompt | null>(null)

	async function getPrompt(id: number): Promise<void> {
		getPrompt_isLoading.value = true
		try {
			const response = await axiosInstance.get<LaravelResourceResponse<GetPrompt>>(`/api/prompts/${id}`)
			const responseData = response.data?.data
			if (!responseData) {
				// Expected a Laravel Resource response (data wrapped in `data`)
				throw new Error('Unexpected API response format.')
			}
			prompt.value = responseData
		} catch (e) {
			console.error(`Failed to fetch prompt in getPrompt(id=${id}):`, e)
			router.push({ name: 'errors.not-found' })
		} finally {
			getPrompt_isLoading.value = false
		}
	}

	return { getPrompt_isLoading, prompt, getPrompt }
}