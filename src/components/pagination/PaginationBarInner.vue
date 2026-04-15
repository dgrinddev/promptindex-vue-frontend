<script setup lang="ts">
	import { computed, toRef } from 'vue'
	import { usePaginationRange } from '@/composables/usePaginationRange'
	import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
	import type { PaginationInfoTextMode, PaginationNavButtonsMode, PaginationCenterMode } from '@/types/pagination.types'

	const props = defineProps<{
		currentPage: number
		lastPage: number
		from: number | null
		to: number | null
		total: number
		infoText: PaginationInfoTextMode
		navButtons: PaginationNavButtonsMode
		center: PaginationCenterMode
		siblingCount: number
		boundaryCount: number
	}>()

	const emit = defineEmits<{
		pageChange: [page: number]
	}>()

	const { range } = usePaginationRange(
		toRef(props, 'currentPage'),
		toRef(props, 'lastPage'),
		toRef(props, 'siblingCount'),
		toRef(props, 'boundaryCount'),
	)

	const isFirstPage = computed(() => props.currentPage <= 1)
	const isLastPage = computed(() => props.currentPage >= props.lastPage)
	const isTextMode = computed(() => props.navButtons === 'text')
	const showNavButtons = computed(() => props.navButtons === 'icon' || props.navButtons === 'iconText')

	// In text mode, 'pages' center makes no visual sense, fall back to 'simple'
	const effectiveCenter = computed<PaginationCenterMode>(() => {
		if (isTextMode.value && props.center === 'pages') return 'simple'
		return props.center
	})

	function goToPage(page: number): void {
		if (page < 1 || page > props.lastPage || page === props.currentPage) return
		emit('pageChange', page)
	}
</script>

<template>
	<!--
		TEXT NAV BUTTON MODE
		Renders Previous/Next as standalone buttons with optional center text.
		Typically used for mobile.
	-->
	<div v-if="isTextMode" class="flex flex-col gap-3">
		<p
			v-if="infoText === 'full'"
			class="text-sm text-on-surface dark:text-on-surface-dark"
		>
			Showing
			<span class="font-medium text-on-surface-strong dark:text-on-surface-dark-strong">{{ from ?? 0 }}</span>
			to
			<span class="font-medium text-on-surface-strong dark:text-on-surface-dark-strong">{{ to ?? 0 }}</span>
			of
			<span class="font-medium text-on-surface-strong dark:text-on-surface-dark-strong">{{ total }}</span>
			results
		</p>
		<p
			v-else-if="infoText === 'short'"
			class="text-sm text-on-surface dark:text-on-surface-dark"
		>
			<span class="font-medium text-on-surface-strong dark:text-on-surface-dark-strong">{{ from ?? 0 }}</span>–<span class="font-medium text-on-surface-strong dark:text-on-surface-dark-strong">{{ to ?? 0 }}</span>
			of
			<span class="font-medium text-on-surface-strong dark:text-on-surface-dark-strong">{{ total }}</span>
		</p>

		<div class="flex items-center justify-between gap-3">
			<button
				type="button"
				:disabled="isFirstPage"
				class="inline-flex items-center rounded-radius border border-outline bg-surface-alt px-4 py-2 text-sm font-medium text-on-surface transition hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-outline-dark dark:bg-surface-dark-alt dark:text-on-surface-dark dark:hover:bg-surface-dark dark:focus-visible:outline-primary-dark"
				@click="goToPage(currentPage - 1)"
			>
				Previous
			</button>

			<p
				v-if="effectiveCenter === 'simple'"
				class="text-sm text-on-surface dark:text-on-surface-dark"
			>
				Page
				<span class="font-medium text-on-surface-strong dark:text-on-surface-dark-strong">{{ currentPage }}</span>
				of
				<span class="font-medium text-on-surface-strong dark:text-on-surface-dark-strong">{{ lastPage }}</span>
			</p>

			<button
				type="button"
				:disabled="isLastPage"
				class="inline-flex items-center rounded-radius border border-outline bg-surface-alt px-4 py-2 text-sm font-medium text-on-surface transition hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-outline-dark dark:bg-surface-dark-alt dark:text-on-surface-dark dark:hover:bg-surface-dark dark:focus-visible:outline-primary-dark"
				@click="goToPage(currentPage + 1)"
			>
				Next
			</button>
		</div>
	</div>

	<!--
		INLINE NAV MODE
		Renders a compact pagination bar with optional info text on the left
		and a connected button group on the right.
		Typically used for tablet and desktop.
	-->
	<div v-else class="flex flex-1 items-center justify-between gap-4">
		<!-- Info text (left side) -->
		<p
			v-if="infoText === 'full'"
			class="text-sm text-on-surface dark:text-on-surface-dark"
		>
			Showing
			<span class="font-medium text-on-surface-strong dark:text-on-surface-dark-strong">{{ from ?? 0 }}</span>
			to
			<span class="font-medium text-on-surface-strong dark:text-on-surface-dark-strong">{{ to ?? 0 }}</span>
			of
			<span class="font-medium text-on-surface-strong dark:text-on-surface-dark-strong">{{ total }}</span>
			results
		</p>
		<p
			v-else-if="infoText === 'short'"
			class="text-sm text-on-surface dark:text-on-surface-dark"
		>
			<span class="font-medium text-on-surface-strong dark:text-on-surface-dark-strong">{{ from ?? 0 }}</span>–<span class="font-medium text-on-surface-strong dark:text-on-surface-dark-strong">{{ to ?? 0 }}</span>
			of
			<span class="font-medium text-on-surface-strong dark:text-on-surface-dark-strong">{{ total }}</span>
		</p>

		<!-- Navigation (right side) -->
		<nav
			v-if="showNavButtons || effectiveCenter !== 'hidden'"
			class="isolate inline-flex -space-x-px"
			aria-label="Pagination"
		>
			<!-- Previous button -->
			<button
				v-if="showNavButtons"
				type="button"
				:disabled="isFirstPage"
				class="relative inline-flex items-center gap-1 rounded-l-radius px-2 py-2 text-on-surface/50 ring-1 ring-inset ring-outline transition hover:bg-surface focus:z-20 focus:outline-offset-0 focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 dark:text-on-surface-dark/50 dark:ring-outline-dark dark:hover:bg-surface-dark dark:focus-visible:outline-primary-dark"
				@click="goToPage(currentPage - 1)"
			>
				<span class="sr-only">Previous</span>
				<ChevronLeftIcon class="size-5" aria-hidden="true" />
				<span v-if="navButtons === 'iconText'" class="pr-1 text-sm font-medium" aria-hidden="true">Previous</span>
			</button>

			<!-- Center: Page number buttons -->
			<template v-if="effectiveCenter === 'pages'">
				<template v-for="(item, index) in range" :key="item === 'ellipsis' ? `ellipsis-${index}` : item">
					<!-- Ellipsis -->
					<span
						v-if="item === 'ellipsis'"
						class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-on-surface/50 ring-1 ring-inset ring-outline dark:text-on-surface-dark/50 dark:ring-outline-dark"
					>
						…
					</span>

					<!-- Page button -->
					<button
						v-else
						type="button"
						:aria-current="item === currentPage ? 'page' : undefined"
						:class="[
							'relative inline-flex items-center px-4 py-2 text-sm font-semibold transition',
							item === currentPage
								? 'z-10 bg-primary text-on-primary focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:bg-primary-dark dark:text-on-primary-dark dark:focus-visible:outline-primary-dark'
								: 'text-on-surface ring-1 ring-inset ring-outline hover:bg-surface focus:z-20 focus:outline-offset-0 dark:text-on-surface-dark dark:ring-outline-dark dark:hover:bg-surface-dark',
							// Rounding when nav buttons are hidden
							!showNavButtons && index === 0 ? 'rounded-l-radius' : '',
							!showNavButtons && index === range.length - 1 ? 'rounded-r-radius' : '',
						]"
						@click="goToPage(item)"
					>
						{{ item }}
					</button>
				</template>
			</template>

			<!-- Center: Simple text -->
			<span
				v-else-if="effectiveCenter === 'simple'"
				:class="[
					'relative inline-flex items-center px-4 py-2 text-sm font-medium text-on-surface ring-1 ring-inset ring-outline dark:text-on-surface-dark dark:ring-outline-dark',
					!showNavButtons ? 'rounded-radius' : '',
				]"
			>
				Page {{ currentPage }} of {{ lastPage }}
			</span>

			<!-- Next button -->
			<button
				v-if="showNavButtons"
				type="button"
				:disabled="isLastPage"
				class="relative inline-flex items-center gap-1 rounded-r-radius px-2 py-2 text-on-surface/50 ring-1 ring-inset ring-outline transition hover:bg-surface focus:z-20 focus:outline-offset-0 focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 dark:text-on-surface-dark/50 dark:ring-outline-dark dark:hover:bg-surface-dark dark:focus-visible:outline-primary-dark"
				@click="goToPage(currentPage + 1)"
			>
				<span v-if="navButtons === 'iconText'" class="pl-1 text-sm font-medium" aria-hidden="true">Next</span>
				<span class="sr-only">Next</span>
				<ChevronRightIcon class="size-5" aria-hidden="true" />
			</button>
		</nav>
	</div>
</template>
