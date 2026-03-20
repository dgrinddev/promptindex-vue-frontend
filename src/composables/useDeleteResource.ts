import { ref } from 'vue'
import axiosInstance from '@/services/axios'

const resourceEndpoints = {
	image: '/api/app/images',
	prompt: '/api/app/prompts',
} as const satisfies Record<string, string>

type Resource = keyof typeof resourceEndpoints

export function useDeleteResource(resource: Resource) {
	const deleteResource_isLoading = ref<boolean>(false)

	async function deleteResource(id: number): Promise<boolean> {
		deleteResource_isLoading.value = true
		try {
			const response = await axiosInstance.delete<void>(`${resourceEndpoints[resource]}/${id}`)
			if (response.status !== 204) {
				console.warn(`useDeleteResource(${resource}): unexpected success status code`, response.status)
			}
			return true
		} catch (e) {
			console.error(`Unexpected API response for useDeleteResource(${resource}):`, e)
			return false
		} finally {
			deleteResource_isLoading.value = false
		}
	}

	return { deleteResource_isLoading, deleteResource }
}