import type { InjectionKey, Ref } from 'vue'
import type { Category } from '@/types/prompts/category.types'

export const pageTitleSuffix_key: InjectionKey<Ref<string | null>> = Symbol('pageTitleSuffix_key')
export const categories_key: InjectionKey<Ref<Category[]>> = Symbol('categories_key')
export const getCategories_isLoading_key: InjectionKey<Ref<boolean>> = Symbol('getCategories_isLoading_key')