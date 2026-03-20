import type { Category } from '@/types/prompts/category.types'
import type { Image } from '@/types/prompts/image.types'
import type { PublicUser } from '@/types/public-user.types'

export type PromptType = 'text' | 'image' | 'other'

export interface GetPrompt {
  id: number
  title: string
  type: PromptType
  category: Category | null
  content: string
  excerpt: string
  images: Image[]
  coverimage_id: number | null
  user: PublicUser
  created_at: string
}

export interface GetPromptForEdit {
  id: number
  title: string
  type: PromptType
  category_id: number | null
  content: string
  images: Image[]
  coverimage_id: number | null
}

export interface PromptPayload {
  title: string
  type: PromptType
  category_id: number | null
  content: string
  coverimage_id: number | null
  upload_image_token: string | null // store=string, update=null
}

// =================================================================
// PROMPT UI CONTEXTS
// =================================================================

import type {
  ResourceIndexContext,
  ResourceShowContext,
  // ResourceFormContext
} from '@/types/ui/resource-context.types'
import type { StrictSubset } from '@/types/utility.types'

// Allowed index contexts for Prompts.
export type PromptIndexContext = StrictSubset<
  ResourceIndexContext,
  | 'guest'
  | 'app'
>


// Allowed show contexts for Prompts.
export type PromptShowContext = StrictSubset<
  ResourceShowContext,
  | 'guest'
  | 'app'
>

/*

// Allowed form contexts for Prompts.
export type PromptFormContext = StrictSubset<
  ResourceFormContext,
  | 'app'
>

*/