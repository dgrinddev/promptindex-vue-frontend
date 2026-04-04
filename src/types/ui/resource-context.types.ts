/**
 * RESOURCE UI CONTEXT TYPES:
 * Generic UI contexts for resources.
 */

import type { ApplicationSurface } from '@/types/ui/application.types'
import type { StrictSubset } from '@/types/utility.types'

// =================================================================
// GENERIC RESOURCE CONTEXTS
// =================================================================

// Surfaces where a resource index (listing) may exist.
export type ResourceIndexContext = StrictSubset<
  ApplicationSurface,
  | 'guest'
//| 'guest-docs'
  | 'app'
//| 'admin'
>

// Surfaces where a resource show (single view) may exist.
export type ResourceShowContext = StrictSubset<
  ApplicationSurface,
  | 'guest'
//| 'guest-docs'
  | 'app'
//| 'admin'
>

/*

// Surfaces where a resource form (create/edit) may exist.
export type ResourceFormContext = StrictSubset<
  ApplicationSurface,
  | 'app'
//| 'admin'
>

*/