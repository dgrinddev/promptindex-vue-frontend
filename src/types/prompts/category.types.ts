export interface Category {
	id: number
  name: string
}

// =================================================================
// CATEGORY UI CONTEXTS
// =================================================================

/*

import type {
  ResourceIndexContext,
  ResourceShowContext,
  ResourceFormContext
} from '@/types/ui/resource-context.types'
import type { StrictSubset } from '@/types/utility.types'

// Allowed index contexts for Categories.
export type CategoryIndexContext = StrictSubset<
  ResourceIndexContext,
  | 'admin'
>

// Allowed show contexts for Categories.
export type CategoryShowContext = StrictSubset<
  ResourceShowContext,
  | 'guest'
>

// Allowed form contexts for Categories.
export type CategoryFormContext = StrictSubset<
  ResourceFormContext,
  | 'admin'
>

*/