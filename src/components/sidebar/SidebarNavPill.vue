<script setup lang="ts">
	import type { Component } from 'vue'
	import type { RouteLocationRaw } from 'vue-router'

	defineProps<{
		to: RouteLocationRaw
		icon?: Component
	}>()

	defineOptions({
		inheritAttrs: false
	})

	const emit = defineEmits<{
		(e: 'navigated'): void
	}>()

	function handleClick(
		isExactActive: boolean,
		navigate: () => void
	) {
		if (!isExactActive) {
			navigate()
			emit('navigated')
		}
	}
</script>

<template>
	<RouterLink
		:to="to"
		custom
		v-slot="{ isExactActive, href, navigate }"
	>
		<a
			:href="href"
			@click.prevent="handleClick(isExactActive, navigate)"
			class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
			:class="{
				'bg-white/5 text-white cursor-default': isExactActive,
				'text-gray-400 hover:bg-white/5 hover:text-white': !isExactActive
			}"
			:aria-current="isExactActive ? 'page' : undefined"
			v-bind="$attrs"
		>
			<component
				v-if="icon"
				:is="icon"
				class="size-6 shrink-0"
				aria-hidden="true"
			/>
			<slot></slot>
		</a>
	</RouterLink>
</template>