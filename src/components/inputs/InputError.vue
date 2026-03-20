<script setup lang="ts">
	import { computed } from 'vue'
	import { useErrorsStore } from '@/stores/errorsStore'

	const props = defineProps<{
		name: string
	}>()

	const errorsStore = useErrorsStore()

	const fieldErrors = computed(() =>
		errorsStore.fieldErrors(props.name)
	)
</script>

<template>
	<div
		v-if="fieldErrors.length"
		class="text-danger text-xs mt-2.5"
	>
		<ul>
			<li
				v-for="error in fieldErrors"
				:key="`${props.name}-${error}`"
			>
				{{ error }}
			</li>
		</ul>
	</div>
</template>