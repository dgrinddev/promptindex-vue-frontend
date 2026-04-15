/**
 * Shared internal base types for all input components.
 *
 * Contains common input-related interfaces used by
 * text inputs, selects, radios, ratings, textarea, fileupload, checkbox, etc.
 *
 * Extend these, not meant for direct use in features.
 */

//import type { InputState } from '@/types/ui/ui-primitives.types'
//import type { ClassProp } from '@/types/vue.types'

// =================================================================
// Input Options
// =================================================================

// base type for options in option-based inputs (radio, select).
interface BaseInputOption<TValue = string | number | null> {
	value: TValue
	label: string
	disabled?: boolean
}

/*

// =================================================================
// Component Props
// =================================================================

// base properties for option-based inputs (radio, select).
interface BaseInputProps {
	id: string
	name: string
	rootClass?: ClassProp
}

// =================================================================
// Utility Value Types
// =================================================================

type SingleValue<T> = T
type MultipleValue<T> = T[]

*/

// =================================================================

/*
export type {
	BaseInputOption,
	BaseInputProps,
	SingleValue,
	MultipleValue,
}
*/

export type {
	BaseInputOption,
}