import { ref } from 'vue'
import axiosInstance from '@/services/axios'
import type { ProfileSettings } from '@/types/settings.types'
import type { LaravelResourceResponse } from '@/types/api/responses.types'

export function useGetProfileForEdit() {
	const getProfileForEdit_isLoading = ref<boolean>(false)
	const profile = ref<ProfileSettings | null>(null)

	async function getProfileForEdit(): Promise<void> {
		getProfileForEdit_isLoading.value = true
		try {
			const response = await axiosInstance.get<LaravelResourceResponse<ProfileSettings>>(`/api/app/user/edit-profile`)
			const responseData = response.data?.data
			if (!responseData) {
				// Expected a Laravel Resource response (data wrapped in `data`)
				throw new Error('Unexpected API response format.')
			}
			profile.value = responseData
		} catch (e) {
			console.error(`Failed to fetch profile in getProfileForEdit:`, e)
		} finally {
			getProfileForEdit_isLoading.value = false
		}
	}

	return { getProfileForEdit_isLoading, profile, getProfileForEdit }
}