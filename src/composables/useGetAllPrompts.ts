import { useToast } from 'vue-toast-notification'
import { computed, ref } from 'vue'
import axiosInstance from '@/services/axios'
import type { GetPrompt, PromptIndexContext } from '@/types/prompts/prompt.types'
import type { LaravelPaginatedResponse } from '@/types/api/responses.types'

const paths: Record<PromptIndexContext, string> = {
  guest: '/api/guest/prompts',
  app: '/api/app/prompts/my-prompts',
}

export function useGetAllPrompts() {
	const $toast = useToast()

	const getAllPrompts_isLoading = ref<boolean>(false)
	const paginatedResponse = ref<LaravelPaginatedResponse<GetPrompt> | null>(null)
	const prompts = computed<GetPrompt[]>(() => paginatedResponse.value?.data ?? [])

	async function getAllPrompts(page: number, context: PromptIndexContext): Promise<void> {
		getAllPrompts_isLoading.value = true
		try {
			const response = await axiosInstance.get<LaravelPaginatedResponse<GetPrompt>>(`${paths[context]}?page=${page}`)
			const data = response.data
			if (
				!data ||
				typeof data !== 'object' ||
				!Array.isArray(data.data) ||
				!('links' in data) ||
				!('meta' in data)
			) {
				// Expected a Laravel Paginated response ( `{ data: [...], links: {...}, meta: {...} }` )
				throw new Error('Unexpected API response format.')
			}
			paginatedResponse.value = data
		} catch (e) {
			console.error(`Failed to fetch ${context} prompts in getAllPrompts:`, e)
			$toast.error('Something went wrong. Please reload the page.')
		} finally {
			getAllPrompts_isLoading.value = false
		}
	}

	return { getAllPrompts_isLoading, paginatedResponse, prompts, getAllPrompts }
}