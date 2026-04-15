/**
 * Types for inline selection inputs
 * (basic-radio, card-radio, segmented control, rating, etc.)
 */

//import type { Component } from 'vue'
//import type { Size } from '@/types/ui/ui-primitives.types'
//import type { BaseInputProps } from '@/types/ui/inputs/input-base.types'
import type { BaseInputOption } from '@/types/ui/inputs/input-base.types'

// =================================================================
// Options
// =================================================================

// Internal base type for options in inline selection inputs
// Extend this, not meant for direct use in features.
interface BaseInlineSelectionOption<TValue = string | number>
  extends BaseInputOption<TValue> {
    highlight?: boolean
  }

export type BasicRadioOption<TValue = string | number> =
  BaseInlineSelectionOption<TValue>

/*
export interface CardRadioOption<TValue = string | number>
  extends BaseInlineSelectionOption<TValue> {
    description: string // Description under label
    icon: Component // Vue component (for example SVG icon)
  }
*/

// =================================================================
// Properties
// =================================================================

/*

// Internal base props for inline selection inputs
// Adds nothing new now but allows adding radio-specific stuff later.
// Extend this, not meant for direct use in features.
type BaseInlineSelectionProps =
	BaseInputProps

export interface BasicRadioProps<TValue = string | number>
	extends BaseInlineSelectionProps {
		options: BasicRadioOption<TValue>[]
	}

export interface CardRadioProps<TValue = string | number>
	extends BaseInlineSelectionProps {
		options: CardRadioOption<TValue>[]
    size?: Size
	}

*/