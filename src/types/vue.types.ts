/**
 * Vue internal contract types.
 *
 * This file contains TypeScript types that mirror Vue's
 * internal runtime behavior but are NOT exported by Vue.
 *
 * These are framework-level compatibility types —
 * not component API types, UI models, or domain structures.
 */


// Type for Vue `:class` bindings.
export type ClassProp =
  | string // Example: :class="'text-red-500'"
  | Record<string, boolean> // Example: :class="{ 'text-red-500': hasError }"
  | (string | Record<string, boolean>)[] // Example: :class="['text-lg', { 'text-red-500': hasError }]"