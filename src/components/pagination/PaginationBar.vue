<script setup lang="ts">
	import PaginationBarInner from '@/components/pagination/PaginationBarInner.vue'
	import type { PaginationInfoTextMode, PaginationNavButtonsMode, PaginationCenterMode } from '@/types/pagination.types'
	import { onMounted } from 'vue'

	const props = withDefaults(defineProps<{
		// Data (required)
		currentPage: number
		lastPage: number
		from: number | null
		to: number | null
		total: number

		// Global
		boundaryCount?: number

		// Mobile (< md)
		mobileInfoText?: PaginationInfoTextMode
		mobileNavButtons?: PaginationNavButtonsMode
		mobileCenter?: PaginationCenterMode
		mobileSiblingCount?: number

		// Tablet (md – lg)
		tabletInfoText?: PaginationInfoTextMode
		tabletNavButtons?: PaginationNavButtonsMode
		tabletCenter?: PaginationCenterMode
		tabletSiblingCount?: number

		// Desktop (≥ lg)
		desktopInfoText?: PaginationInfoTextMode
		desktopNavButtons?: PaginationNavButtonsMode
		desktopCenter?: PaginationCenterMode
		desktopSiblingCount?: number
	}>(), {
		boundaryCount: 1,

		mobileInfoText: 'hidden',
		mobileNavButtons: 'icon',
		mobileCenter: 'simple',
		mobileSiblingCount: 1,

		tabletInfoText: 'full',
		tabletNavButtons: 'icon',
		tabletCenter: 'pages',
		tabletSiblingCount: 2,

		desktopInfoText: 'full',
		desktopNavButtons: 'icon',
		desktopCenter: 'pages',
		desktopSiblingCount: 2,
	})

	const emit = defineEmits<{
		pageChange: [page: number]
	}>()

	function onPageChange(page: number): void {
		emit('pageChange', page)
	}

	onMounted(() => {
		if (!props.currentPage || !props.lastPage || !props.from || !props.to || !props.total) {
			console.error('there are missing some props in PaginationBar.')
		}
	})
</script>

<template>
	<div v-if="lastPage > 1" class="w-full">
		<!-- Mobile (< md) -->
		<div class="md:hidden">
			<PaginationBarInner
				:current-page="currentPage"
				:last-page="lastPage"
				:from="from"
				:to="to"
				:total="total"
				:info-text="mobileInfoText"
				:nav-buttons="mobileNavButtons"
				:center="mobileCenter"
				:sibling-count="mobileSiblingCount"
				:boundary-count="boundaryCount"
				@page-change="onPageChange"
			/>
		</div>

		<!-- Tablet (md – lg) -->
		<div class="hidden md:flex lg:hidden">
			<PaginationBarInner
				:current-page="currentPage"
				:last-page="lastPage"
				:from="from"
				:to="to"
				:total="total"
				:info-text="tabletInfoText"
				:nav-buttons="tabletNavButtons"
				:center="tabletCenter"
				:sibling-count="tabletSiblingCount"
				:boundary-count="boundaryCount"
				@page-change="onPageChange"
			/>
		</div>

		<!-- Desktop (≥ lg) -->
		<div class="hidden lg:flex">
			<PaginationBarInner
				:current-page="currentPage"
				:last-page="lastPage"
				:from="from"
				:to="to"
				:total="total"
				:info-text="desktopInfoText"
				:nav-buttons="desktopNavButtons"
				:center="desktopCenter"
				:sibling-count="desktopSiblingCount"
				:boundary-count="boundaryCount"
				@page-change="onPageChange"
			/>
		</div>
	</div>
</template>
