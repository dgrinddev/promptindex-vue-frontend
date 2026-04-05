<script setup lang="ts">
	import IconSpinner from '@/components/icons/other/IconSpinner.vue'

	defineProps<{
		isProcessing?: boolean
	}>()
</script>

<template>
	<button
		class="justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 disabled:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed"
		:class="{
			'flex': !isProcessing,
			'inline-flex items-center gap-2': isProcessing,
		}"
	>
		<IconSpinner
			v-if="isProcessing"
			aria-hidden="true"
			class="size-5 animate-spin motion-reduce:animate-none"
		/>
		<slot></slot>
	</button>
</template>