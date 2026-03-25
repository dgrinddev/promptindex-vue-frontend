import { toast } from '@/services/toast'
import axios from 'axios'
import type { LaravelValidationErrorResponse } from '@/types/api/errors.types'
import { useErrorsStore } from '@/stores/errorsStore'

export function handleLaravelValidationError(error: unknown, showToast: boolean = false): boolean {
	if (
		axios.isAxiosError(error)
		&& error.response?.status === 422
		&& typeof error.response.data === 'object'
		&& error.response.data !== null
		&& 'errors' in error.response.data
	) {
		const errorData = error.response.data as LaravelValidationErrorResponse
		const errorsStore = useErrorsStore()
		errorsStore.setErrors(errorData.errors)
		if (showToast) toast.error(errorData.message)
		return true
	}
	
	return false
}