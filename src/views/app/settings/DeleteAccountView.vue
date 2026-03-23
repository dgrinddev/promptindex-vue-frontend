<script setup lang="ts">
	import { useErrorsStore } from '@/stores/errorsStore'
	import StringInput from '@/components/inputs/StringInput.vue'
	import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
	import type { DeleteAccountPayload } from '@/types/settings.types'
	import { onMounted, ref } from 'vue'
	import { useDeleteUser } from '@/composables/useDeleteUser'

	const errorsStore = useErrorsStore()
	const { deleteUser_isLoading, deleteUser } = useDeleteUser()

	const form = ref<DeleteAccountPayload>({
		current_password: '',
	})

	onMounted(() => {
		errorsStore.clear()
	})
</script>

<template>
	<form @submit.prevent="deleteUser(form)" class="space-y-6 max-w-lg mt-10">
		<h2 class="mt-1 text-base text-gray-400">
			This will permanently delete your account and all associated data. To continue, please confirm by entering your password.
		</h2>

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

		<PrimaryButton
			type="submit"
			class="w-full bg-red-500 hover:bg-red-400 disabled:bg-red-400"
			id="submit_btn"
			:disabled="deleteUser_isLoading"
		>
			Delete my account
		</PrimaryButton>
	</form>
</template>