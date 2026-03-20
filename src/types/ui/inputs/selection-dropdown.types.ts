/**
 * Types for dropdown-based selection inputs
 * (basic select input, multiselect, combobox, etc.)
 */

//import type { BaseInputProps } from '@/types/ui/inputs/input-base.types'
import type { BaseInputOption } from '@/types/ui/inputs/input-base.types'

// =================================================================
// Options
// =================================================================

// Internal base type for options in dropdown-based selection inputs
// Adds nothing new now but allows adding dropdown-specific stuff later.
// Extend this — not meant for direct use in features.
type BaseDropdownSelectionOption<TValue = string | number | null> =
	BaseInputOption<TValue>

export type BasicSelectOption<TValue = string | number | null> =
	BaseDropdownSelectionOption<TValue>

/*
export interface SelectOptionWithImageAndDescription<TValue = string | number | null>
	extends BaseDropdownSelectionOption<TValue> {
		description: string // Description under label
		image: string // url to the image
	}
*/

// =================================================================
// Properties
// =================================================================

/*

// Internal base props for dropdown-based selection inputs
// Adds nothing new now but allows adding dropdown-specific stuff later.
// Extend this — not meant for direct use in features.
type BaseDropdownSelectionProps =
	BaseInputProps

export interface BasicSelectProps<TValue = string | number | null>
	extends BaseDropdownSelectionProps {
		options: BasicSelectOption<TValue>[]
	}

export interface SelectWithImageAndDescriptionProps<TValue = string | number | null>
	extends BaseDropdownSelectionProps {
		options: SelectOptionWithImageAndDescription<TValue>[]
		multiple?: boolean
	}

*/