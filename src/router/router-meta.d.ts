// EVERYTHING IN THIS FILE IS FOLLOWING THIS GUIDE:
// https://router.vuejs.org/guide/advanced/meta.html#TypeScript

import 'vue-router'
import type { Component } from 'vue'
import type { Placement } from '@/types/ui/navigation.types'

export {}

declare module 'vue-router' {
	interface RouteMeta {
		// =================================================================
		// access policy
		// =================================================================
		requiresAuth?: boolean
		requiresGuest?: boolean

		// =================================================================
		// auth layout UI
		// =================================================================
		otherAuthRouteNav_ContextText?: string

		// =================================================================
		// Navigation (used by useGetNavItemsFromRoutes composable)
		// =================================================================
		navLabel?: string
		navIcon?: Component
		navPlacement?: Partial<Record<Placement, number>> // number must be positive integers starting from 1

		// =================================================================
		// PAGE UI (Layout-level page presentation)
		// =================================================================
		// Title rendered as page title (<h1>). Falls back to navLabel if undefined.
		pageTitle?: string
	}
}