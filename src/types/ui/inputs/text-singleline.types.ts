/**
 * Types for single-line text entry inputs
 * (basic text field, email-field, etc.)
 */

//import type { BaseInputProps } from '@/types/ui/inputs/input-base.types'

// =================================================================
// Input Types
// =================================================================

export type TextSinglelineInputTypes =
  | 'text'
  | 'email'
  | 'password'

// =================================================================
// Properties
// =================================================================

/*

// Internal base props for text-singleline inputs
// Extend this, not meant for direct use in features.
interface BaseTextSinglelineProps
	extends BaseInputProps {
		placeholder?: string
		minlength?: number
		maxlength?: number
	}

export interface BasicTextFieldProps
	extends BaseTextSinglelineProps {
		type: 'text'
	}

export interface BasicEmailFieldProps
	extends BaseTextSinglelineProps {
		type: 'email'
	}

*/