<script setup lang="ts">
	import { ClipboardIcon as ClipboardIconSolid } from '@heroicons/vue/24/solid'
	import { ClipboardDocumentCheckIcon as ClipboardDocumentCheckIconSolid } from '@heroicons/vue/24/solid'
	import { onUnmounted, ref } from 'vue'

	const props = defineProps<{
		promptContent: string
	}>()

	const copied = ref(false)
	let timer: ReturnType<typeof setTimeout> | null = null

	async function copy() {
		try {
			await navigator.clipboard.writeText(props.promptContent)
			copied.value = true
			if (timer) clearTimeout(timer)
			timer = setTimeout(() => {
				copied.value = false
			}, 2000)
		} catch (e) {
			console.error(e)
		}
	}

	onUnmounted(() => {
		if (timer) clearTimeout(timer)
	})
</script>

<template>
	<button
		type="button"
		:title="copied ? 'Copied' : 'Copy'"
		:aria-label="copied ? 'Copied to clipboard' : 'Copy to clipboard'"
		:disabled="copied"
		@click="copy"
		:class="{
			'focus-visible:outline-success dark:focus-visible:outline-success cursor-default!': copied,
			'cursor-pointer': !copied
		}"
	>
		<span class="sr-only" aria-live="polite">
			{{ copied ? 'Copied to clipboard' : '' }}
		</span>
		<Transition
			mode="out-in"
			enter-active-class="transition ease-out duration-300"
			enter-from-class="opacity-0 scale-90"
			enter-to-class="opacity-100 scale-100"
		>
			<component
				:is="
					copied
					? ClipboardDocumentCheckIconSolid
					: ClipboardIconSolid
				"
				:key="String(copied)"
				class="size-5"
				:class="{
					'fill-success dark:fill-success': copied,
					'fill-on-surface-strong dark:fill-on-surface-dark-strong': !copied
				}"
			/>
		</Transition>
	</button>
</template>