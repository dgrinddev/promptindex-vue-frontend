import type { NavItem, Placement } from '@/types/ui/navigation.types'
import { useRouter, type RouteRecordNormalized } from 'vue-router'

/**
 * RouteRecordNormalized has `name: RouteRecordNameGeneric`.
 * RouteRecordNameGeneric is `string | symbol | undefined`.
 * We only support string route names, so we narrow `name` to string.
 *
 * `meta` is normally a generic object.
 * Adding `& { navLabel: string }` guarantees that `meta.navLabel` exists and is a string.
 *
 * navPlacement: see the comment under `.sort()`
 */
type RouteRecordWithNavigationMeta = RouteRecordNormalized & {
	name: string
	meta: RouteRecordNormalized['meta'] & {
		navLabel: string
		navPlacement: Partial<Record<Placement, number>>
	}
}

export function useGetNavItemsFromRoutes() {
	const router = useRouter()
	// Cached once since routes are static and `router.getRoutes()` is stable after creation.
	// If dynamic route injection is introduced in the future (`router.addRoute()` or `router.removeRoute()`), then call `router.getRoutes()` inside getNavItemsFromRoutes instead.
	const allRoutes = router.getRoutes()

	// Returns sorted NavItems for every route that has the given placement in its meta.
	function getNavItemsFromRoutes(placement: Placement): NavItem[] {
		return allRoutes.filter((r): r is RouteRecordWithNavigationMeta => {
				const navPlacement = r.meta.navPlacement
				if (!navPlacement || !(placement in navPlacement)) {
					return false // Ignore route if it doesn't have placement assigned to the requested nav-area
				}
				if (typeof r.name !== 'string') {
					throw new Error(`getNavItemsFromRoutes('${placement}'): Route name must be a string (symbol and undefined not allowed).`)
				}
				if (typeof r.meta.navLabel !== 'string' || r.meta.navLabel.trim().length === 0) {
					throw new Error(`getNavItemsFromRoutes('${placement}'): navLabel must be a non-empty string for route "${r.name}".`)
				}
				const order = navPlacement[placement]
				if (typeof order !== 'number' || !Number.isInteger(order) || order <= 0) {
					throw new Error(`getNavItemsFromRoutes('${placement}'): Invalid navPlacement order (${order}) for route "${r.name}". Must be a positive integer starting from 1.`)
				}
				return true // If all checks pass, include the route
			})
			.sort((a, b) => {
				// In `RouteRecordWithNavigationMeta`, `navPlacement` is typed as `navPlacement: Partial<Record<Placement, number>>`.
				// The `Partial<>` makes each `Placement` key optional, so TypeScript treats the `placement` parameter in `getNavItemsFromRoutes()` as a key that may or may not exist on `a.meta.navPlacement`.
				// If that specific key does not exist, `a.meta.navPlacement[placement]` is typed as `undefined`, and if it does exist, its value is typed as `number`, which is why the overall type becomes `number | undefined`.
				// Since filter() has already guaranteed at runtime that this placement key exists (by checking `placement in navPlacement`), we can safely tell TypeScript to remove `undefined` from the type using `!`, leaving `number` as the remaining type.
				return a.meta.navPlacement[placement]! - b.meta.navPlacement[placement]!
			})
			.map((r) => ({
				id: r.name,
				label: r.meta.navLabel,
				to: { name: r.name },
				icon: r.meta.navIcon,
			}))
	}

	return { getNavItemsFromRoutes }
}