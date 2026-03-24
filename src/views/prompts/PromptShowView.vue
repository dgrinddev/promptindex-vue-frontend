<script setup lang="ts">
	import { DocumentTextIcon as DocumentTextIconSolid } from '@heroicons/vue/24/solid'
	import { PhotoIcon as PhotoIconSolid } from '@heroicons/vue/24/solid'
	import { RectangleGroupIcon as RectangleGroupIconSolid } from '@heroicons/vue/24/solid'
	import { TrashIcon as TrashIconSolid } from '@heroicons/vue/24/solid'
	import { PencilIcon as PencilIconSolid } from '@heroicons/vue/24/solid'
	import { RectangleStackIcon as RectangleStackIconSolid } from '@heroicons/vue/24/solid'
	import { UserCircleIcon as UserCircleIconSolid } from '@heroicons/vue/24/solid'
	import { CalendarDaysIcon as CalendarDaysIconSolid } from '@heroicons/vue/24/solid'

	import { useRoute } from 'vue-router'
	import { router } from '@/router'
	import { toast } from '@/services/toast'
	import { useGetPrompt } from '@/composables/useGetPrompt'
	import ImageUploadGallery from '@/components/inputs/ImageUploadGallery.vue'
	import { watch, computed, type Component } from 'vue'
	import type { PromptShowContext, PromptType } from '@/types/prompts/prompt.types'
	import PromptIndexCopyButton from '@/components/buttons/PromptIndexCopyButton.vue'
	import { useDeleteResource } from '@/composables/useDeleteResource'

	const route = useRoute()
	const { getPrompt_isLoading, prompt, getPrompt } = useGetPrompt()

	const {
		deleteResource_isLoading: deletePrompt_isLoading,
		deleteResource: deletePrompt,
	} = useDeleteResource('prompt')

	const props = defineProps<{
		context: PromptShowContext
	}>()

	watch(() => route.params.prompt, (new_prompt_param) => {
			// The route path ':prompt(\\d+)' ensures the "prompt" parameter is always a digit string, so we can safely assert it as a string
			const id = Number(new_prompt_param as string)
			getPrompt(id)
		},
		{ immediate: true }
	)

	const coverimage_path = computed(() =>
		prompt.value?.images.find(img => img.id === prompt.value?.coverimage_id)?.path ?? '/images/views/prompts/PromptIndexView/prompt-cover-placeholder.png'
	)

	const created_at_formatted = computed(() => {
		return prompt.value?.created_at ? new Date(prompt.value.created_at).toLocaleDateString() : null
	})

	async function handleRemovePrompt(id: number): Promise<void> {
		const success = await deletePrompt(id)
		if (!success) {
			console.error('handleRemovePrompt - deleting prompt failed:', id)
			toast.error('Failed to delete the prompt. Please reload the page.')
			return
		}
		toast.success('Prompt deleted!')
		router.push({ name: 'app.prompts.index' })
	}

	const prompt_type_icons: Record<PromptType, Component> = {
		text: DocumentTextIconSolid,
		image: PhotoIconSolid,
		other: RectangleGroupIconSolid,
	}
</script>

<template>
	<p
		v-if="getPrompt_isLoading"
		class="text-white"
	>
		Loading...
	</p>
	<div
		v-else-if="prompt"
		class="rounded-radius border border-outline bg-surface-alt text-on-surface dark:border-outline-dark dark:bg-surface-dark-alt dark:text-on-surface-dark overflow-hidden"
	>
		<!-- image -->
		<img
			:src="coverimage_path"
			alt="cover image"
			class="w-full object-cover h-40 sm:h-48 md:h-56 lg:h-64"
		/>
		<!-- body -->
		<div class="p-4 sm:p-6">
			<h1 class="text-3xl font-bold tracking-tight text-white mb-5">
				{{ prompt.title }}
			</h1>
			
			<div
				class="sm:items-center lg:justify-between pb-6"
				:class="{
					'lg:flex': props.context === 'app',
					'flex-row': props.context === 'guest',
				}"
			>
				<div class="min-w-0 flex-1">
					<div class="flex flex-col gap-y-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
						<div class="flex items-center text-sm text-gray-400">
							<component
								:is="prompt_type_icons[prompt.type]"
								class="mr-1.5 size-5 shrink-0 text-gray-500" aria-hidden="true"
							></component>
							<span class="capitalize">{{ prompt.type }}</span>
						</div>
						<div v-if="prompt.category" class="flex items-center text-sm text-gray-400">
							<RectangleStackIconSolid class="mr-1.5 size-5 shrink-0 text-gray-500" aria-hidden="true" />
							<span>{{ prompt.category.name }}</span>
						</div>
						<div class="flex items-center text-sm text-gray-400">
							<UserCircleIconSolid class="mr-1.5 size-5 shrink-0 text-gray-500" aria-hidden="true" />
							<span class="truncate">{{ prompt.user.name }}</span>
						</div>
						<div class="flex items-center text-sm text-gray-400">
							<CalendarDaysIconSolid class="mr-1.5 size-5 shrink-0 text-gray-500" aria-hidden="true" />
							<span>{{ created_at_formatted }}</span>
						</div>
					</div>
				</div>
		
				<div
					class="flex lg:mt-0 lg:ml-4"
					:class="{
						'mt-5': props.context === 'app',
					}"
				>
					<span
						class="block"
						:class="{
							'mt-auto': props.context === 'guest',
						}"
					>
						<PromptIndexCopyButton
							:prompt-content="prompt.content"
							class="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 cursor-default!"
							:class="{
								'max-sm:mt-3': props.context === 'guest',
							}"
						/>
					</span>
		
					<span v-if="props.context === 'app'" class="ml-3 block">
						<RouterLink
							:to="{ name: 'app.prompts.edit', params: { prompt: prompt.id } }"
							:class="{
								'pointer-events-none': deletePrompt_isLoading
							}"
						>
							<button
								type="button"
								class="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
								:disabled="deletePrompt_isLoading"
							>
								<PencilIconSolid class="mr-1.5 -ml-0.5 size-5 text-white" aria-hidden="true" />
								Edit
							</button>
						</RouterLink>
					</span>
		
					<span v-if="props.context === 'app'" class="ml-3">
						<button
							type="button"
							class="inline-flex items-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:bg-red-400"
							@click="handleRemovePrompt(prompt.id)"
							:disabled="deletePrompt_isLoading"
						>
							<TrashIconSolid class="mr-1.5 -ml-0.5 size-5" aria-hidden="true" />
							Delete
						</button>
					</span>
				</div>
			</div>

			<p
				class="pt-5 sm:pt-5 text-sm whitespace-pre-wrap wrap-break-word border-t border-white/10"
				:class="{
					'border-b pb-5': prompt.images.length,
				}"
			>
				{{ prompt.content }}
			</p>

			<ImageUploadGallery
				v-if="prompt.images.length"
				name="prompt_images"
				:images="prompt.images"
				root-class="pt-2"
			/>
		</div>
	</div>
</template>