import { toast } from '@/services/toast'
import { ref } from 'vue'
import axiosInstance from '@/services/axios'
import type { Category } from '@/types/prompts/category.types'
import type { LaravelResourceResponse } from '@/types/api/responses.types'

export function useGetCategories() {
	const getCategories_isLoading = ref<boolean>(false)
	const categories = ref<Category[]>([])

	async function getCategories(): Promise<void> {
		getCategories_isLoading.value = true
		try {
			const response = await axiosInstance.get<LaravelResourceResponse<Category[]>>('/api/categories')
			const responseData = response.data?.data
			if (!responseData) {
				// Expected a Laravel Resource response (data wrapped in `data`)
				throw new Error('Unexpected API response format.')
			}
			categories.value = responseData
		} catch (e) {
			console.error('Failed to fetch categories in getCategories:', e)
			toast.error('Something went wrong. Please reload the page.')
		} finally {
			getCategories_isLoading.value = false
		}
	}

	return { getCategories_isLoading, categories, getCategories }
}