<script setup lang="ts">
	import { useErrorsStore } from '@/stores/errorsStore'
	import { useGetProfileForEdit } from '@/composables/useGetProfileForEdit'
	import { useSaveProfile } from '@/composables/useSaveProfile'
	import StringInput from '@/components/inputs/StringInput.vue'
	import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
	import type { ProfileSettings } from '@/types/settings.types'
	import { onMounted, ref, watch } from 'vue'

	const errorsStore = useErrorsStore()
	const { getProfileForEdit_isLoading, profile, getProfileForEdit } = useGetProfileForEdit()
	const { saveProfile } = useSaveProfile()

	const form = ref<ProfileSettings>({
		name: '',
		email: '',
	})

	watch(profile, (loaded_profile) => {
			if (!loaded_profile) return
			form.value = {
				name: loaded_profile.name,
				email: loaded_profile.email,
			}
		}
	)

	onMounted(() => {
		errorsStore.clear()
		getProfileForEdit()
	})
</script>

<template>
	<div v-if="getProfileForEdit_isLoading">
		<p class="mt-1 text-base text-gray-400">Loading...</p>
	</div>
	<form v-else @submit.prevent="saveProfile(form)" class="space-y-6 max-w-lg">
		<StringInput
			id="name"
			name="name"
			v-model="form.name"
			label="Username (lowercase letters, numbers, underscores)"
			type="text"
			autofocus
			required
			placeholder="my_example_user123"
		/>

		<StringInput
			id="email"
			name="email"
			v-model="form.email"
			label="Email address"
			type="email"
			required
			autocomplete="email"
		/>

		<PrimaryButton
			type="submit"
			class="w-full"
			id="submit_btn"
		>
			Save
		</PrimaryButton>
	</form>
</template>