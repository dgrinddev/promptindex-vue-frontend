<script setup lang="ts">
	import { useErrorsStore } from '@/stores/errorsStore'
	import { useSavePassword } from '@/composables/useSavePassword'
	import StringInput from '@/components/inputs/StringInput.vue'
	import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
	import type { PasswordSettings } from '@/types/settings.types'
	import { onMounted, ref } from 'vue'

	const errorsStore = useErrorsStore()
	const { savePassword_isLoading, savePassword } = useSavePassword()

	const form = ref<PasswordSettings>({
		current_password: '',
		password: '',
		password_confirmation: '',
	})

	onMounted(() => {
		errorsStore.clear()
	})
</script>

<template>
	<form @submit.prevent="savePassword(form)" class="space-y-6 max-w-lg">
		<StringInput
			id="current_password"
			name="current_password"
			v-model="form.current_password"
			label="Current password"
			type="password"
			autofocus
			required
			autocomplete="current-password"
		/>

		<StringInput
			id="password"
			name="password"
			v-model="form.password"
			label="New password"
			type="password"
			required
			autocomplete="new-password"
		/>

		<StringInput
			id="password_confirmation"
			name="password_confirmation"
			v-model="form.password_confirmation"
			label="Confirm new password"
			type="password"
			required
			autocomplete="new-password"
		/>

		<PrimaryButton
			type="submit"
			class="w-full"
			id="submit_btn"
			:disabled="savePassword_isLoading"
			:is-processing="savePassword_isLoading"
		>
			Save
		</PrimaryButton>
	</form>
</template>