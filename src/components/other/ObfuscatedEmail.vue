<script setup lang="ts">
	import { computed, ref } from 'vue'

	const props = defineProps<{
		emailChars: number[]
	}>()

	const revealed = ref(false)

	const email = computed(() =>
		props.emailChars.map((charCode) => String.fromCharCode(charCode)).join('')
	)
</script>

<template>
	<span v-if="revealed" class="font-medium text-indigo-400 underline underline-offset-4">{{ email }}</span>
  <button
    v-else
    type="button"
    @click="revealed = true"
    class="font-medium text-indigo-400 hover:text-indigo-300 underline underline-offset-4 cursor-pointer"
  >
    Show email address
  </button>
</template>