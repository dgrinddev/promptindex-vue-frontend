<script setup lang="ts">
	import type { ClassProp } from '@/types/vue.types'
	import type { Component } from 'vue'

	defineProps<{
		icon: Component
		iconClass?: ClassProp
	}>()
</script>

<template>
	<button
		type="button"
		class="absolute -top-3 -right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 transition-colors text-white cursor-pointer"
	>
		<component :is="icon" :class="iconClass" />
	</button>
</template>