<script setup lang="ts">
	import ObfuscatedEmail from '@/components/other/ObfuscatedEmail.vue'

	const emailChars = [
		108, 101, 103, 97, 108, 46, 112, 114, 111, 109, 112, 116, 105, 110, 100, 101, 120, 64, 112, 114, 111, 116, 111, 110, 109, 97, 105, 108, 46, 99, 111, 109,
	]
</script>

<template>
	<div class="rounded-2xl border border-white/10 bg-gray-800/60 p-6">
		<p class="font-semibold text-white">Contact Information</p>
		<p class="mt-3">
			Email:
			<ObfuscatedEmail :email-chars="emailChars" />
		</p>
		<p class="mt-3 text-sm text-gray-500">We aim to respond within 30 days.</p>
	</div>
</template>