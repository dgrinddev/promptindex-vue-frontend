import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ValidationErrors } from '@/types/api/errors.types'

export const useErrorsStore = defineStore('errors', () => {
  const errors = ref<ValidationErrors>({})

  function setErrors(newErrors: ValidationErrors): void {
    errors.value = newErrors
  }

  function clear(): void {
    errors.value = {}
  }

  function fieldErrors(field: string): string[] {
    return errors.value[field] ?? []
  }

  return {
    errors,
    setErrors,
    clear,
    fieldErrors,
  }
})