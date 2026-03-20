import { computed, inject } from 'vue'
import { useRoute } from 'vue-router'
import { pageTitleSuffix_key } from '@/utils/injection-keys'

export function useLayoutPageTitle(separator: string = ': ') {
	const route = useRoute()

	const pageTitleSuffix = inject(pageTitleSuffix_key)
	if (!pageTitleSuffix) throw new Error('pageTitleSuffix_key is not provided.')

	const fullPageTitle = computed<string | null>(() => {
		const base = route.meta.pageTitle ?? route.meta.navLabel ?? null
		const suffix = pageTitleSuffix.value
		if (base && suffix) return `${base}${separator}${suffix}`
		if (base) return base
		if (suffix) return suffix
		return null
	})

	return { fullPageTitle }
}