import { computed, type Ref } from 'vue'

export type PaginationItem = number | 'ellipsis'

export function usePaginationRange(
	currentPage: Ref<number>,
	lastPage: Ref<number>,
	siblingCount: Ref<number>,
	boundaryCount: Ref<number>,
) {
	const range = computed<PaginationItem[]>(() => {
		const current = currentPage.value
		const last = lastPage.value
		const siblings = siblingCount.value
		const boundary = boundaryCount.value

		if (last <= 0) return []
		if (last === 1) return [1]

		const pages = new Set<number>()

		// Start boundary: always show first `boundary` pages
		for (let i = 1; i <= Math.min(boundary, last); i++) {
			pages.add(i)
		}

		// End boundary: always show last `boundary` pages
		for (let i = Math.max(1, last - boundary + 1); i <= last; i++) {
			pages.add(i)
		}

		// Siblings around current page (including current page itself)
		const siblingStart = Math.max(1, current - siblings)
		const siblingEnd = Math.min(last, current + siblings)
		for (let i = siblingStart; i <= siblingEnd; i++) {
			pages.add(i)
		}

		// Sort ascending and insert ellipsis where there are gaps
		const sorted = Array.from(pages).sort((a, b) => a - b)
		const result: PaginationItem[] = []

		for (let i = 0; i < sorted.length; i++) {
			const current = sorted[i]
			const prev = sorted[i - 1]

			if (i > 0 && current !== undefined && prev !== undefined && current - prev > 1) {
				result.push('ellipsis')
			}

			if (current !== undefined) {
				result.push(current)
			}
		}

		return result
	})

	return { range }
}
