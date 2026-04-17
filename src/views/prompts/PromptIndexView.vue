<script setup lang="ts">
	import { computed, inject, watch, ref, type Component } from 'vue'
	import { useRoute } from 'vue-router'
	import { toast } from '@/services/toast'
	import { router } from '@/router'
	import PromptIndexCopyButton from '@/components/buttons/PromptIndexCopyButton.vue'
	import { pageTitleSuffix_key } from '@/utils/injection-keys'
	import { useGetAllPrompts } from '@/composables/useGetAllPrompts'
	import { useDeleteResource } from '@/composables/useDeleteResource'
	import PaginationBar from '@/components/pagination/PaginationBar.vue'
	import type { PromptIndexContext, PromptType } from '@/types/prompts/prompt.types'

	import { DocumentTextIcon as DocumentTextIconOutline } from '@heroicons/vue/24/outline'
	import { PhotoIcon as PhotoIconOutline } from '@heroicons/vue/24/outline'
	import { RectangleGroupIcon as RectangleGroupIconOutline } from '@heroicons/vue/24/outline'
	import { PencilIcon as PencilIconSolid } from '@heroicons/vue/24/solid'
	import { TrashIcon as TrashIconSolid } from '@heroicons/vue/24/solid'
	import { UserIcon as UserIconOutline } from '@heroicons/vue/24/outline'
	import { ArrowRightIcon as ArrowRightIconSolid } from '@heroicons/vue/16/solid'
	import { RectangleStackIcon as RectangleStackIconOutline } from '@heroicons/vue/24/outline'

	const route = useRoute()
	const { getAllPrompts_isLoading, paginatedResponse, prompts, getAllPrompts } = useGetAllPrompts()

	const {
		deleteResource_isLoading: deletePrompt_isLoading,
		deleteResource: deletePrompt,
	} = useDeleteResource('prompt')

	const props = defineProps<{
		context: PromptIndexContext
	}>()

	const pageTitleSuffix = inject(pageTitleSuffix_key)
	if (!pageTitleSuffix) throw new Error('pageTitleSuffix_key is not provided.')

	watch(() => route.query.page, (rawPage) => {
			if (typeof rawPage !== 'string') return redirectToPageNumber(1)
			const page = Number(rawPage)
			if (!Number.isInteger(page) || page < 1) return redirectToPageNumber(1)
			getAllPrompts(page, props.context)
		},
		{ immediate: true }
	)

	function redirectToPageNumber(page_number: number): void {
		router.replace({
			query: { ...route.query, page: page_number }
		})
	}

	watch(paginatedResponse, (new_paginatedResponse) => {
		if (!new_paginatedResponse) return
		if (!new_paginatedResponse.meta.from && new_paginatedResponse.meta.current_page > 1) {
			// if there is no items on the current page and we are not on the first page then go to the last page
			return redirectToPageNumber(new_paginatedResponse.meta.last_page)
		}

		/*
		if (new_paginatedResponse.meta.last_page === 1) {
			pageTitleSuffix.value = null
		} else {
			pageTitleSuffix.value = `page ${new_paginatedResponse.meta.current_page} of ${new_paginatedResponse.meta.last_page}`
		}
		*/
	})

	const promptsView = computed(() =>
		prompts.value.map(p => ({
			...p,
			ui: {
				coverimage_path:
					p.images.find(img => img.id === p.coverimage_id)?.path ??
					'/images/views/prompts/PromptIndexView/prompt-cover-placeholder.png',
				created_at_formatted: new Date(p.created_at).toLocaleDateString()
			}
		}))
	)

	async function handleRemovePrompt(id: number): Promise<void> {
		const success = await deletePrompt(id)
		if (!success) {
			console.error('handleRemovePrompt - deleting prompt failed:', id)
			toast.error('Failed to delete the prompt. Please reload the page.')
			return
		}
		toast.success('Prompt deleted!')
		if (!paginatedResponse.value) return
		getAllPrompts(paginatedResponse.value.meta.current_page, props.context)
	}

	const prompt_type_icons: Record<PromptType, Component> = {
		text: DocumentTextIconOutline,
		image: PhotoIconOutline,
		other: RectangleGroupIconOutline,
	}

	const actionButtonsClasses = 'inline-flex items-center justify-center aspect-square whitespace-nowrap rounded-radius bg-on-surface-alt border border-on-surface-alt p-1 text-xs font-medium tracking-wide text-on-on-surface-strong transition hover:opacity-75 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:opacity-100 active:outline-offset-0 disabled:opacity-75 disabled:cursor-not-allowed dark:bg-on-surface-dark-alt dark:border-on-surface-dark-alt dark:text-on-on-surface-dark-strong dark:focus-visible:outline-primary-dark cursor-pointer hover:!bg-on-primary dark:hover:!bg-surface-dark-alt border-none text-on-surface-strong/60 hover:text-on-surface-strong dark:text-on-surface-dark-strong/60 dark:hover:text-on-surface-dark-strong'

	const copiedPromptIds = ref(new Set<number>())

	function handleCopiedStateChange(promptId: number, isCopied: boolean): void {
		const newCopiedPromptIds = new Set(copiedPromptIds.value)
		if (isCopied) {
			newCopiedPromptIds.add(promptId)
		} else {
			newCopiedPromptIds.delete(promptId)
		}
		copiedPromptIds.value = newCopiedPromptIds
	}
</script>

<template>
	<template v-if="getAllPrompts_isLoading">
		<p class="mt-1 text-base text-gray-400">Loading...</p>
	</template>
	<template v-else-if="promptsView.length">
		<div
			class="w-full max-w-5xl gap-2 md:gap-3 xl:gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 mb-6"
			:class="{
				'xl:grid-cols-2': props.context === 'app',
				'lg:grid-cols-2': props.context === 'guest',
			}"
		>
			<article
				v-for="prompt in promptsView"
				:key="`prompt-${prompt.id}`"
				class="group grid rounded-radius max-w-2xl grid-cols-1 md:grid-cols-8 overflow-hidden border border-outline bg-surface-alt text-on-surface dark:border-outline-dark dark:bg-surface-dark-alt dark:text-on-surface-dark sm:auto-rows-fr"
			>
				<!-- image -->
				<div class="col-span-3 overflow-hidden sm:h-full">
						<img
							:src="prompt.ui.coverimage_path"
							alt="cover image"
							class="min-h-52 sm:h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
						/>
				</div>
				<!-- body -->
				<div class="flex flex-col gap-5 justify-between sm:h-full p-4 col-span-5">
					<div class="flex flex-col gap-1.5">
						<div class="">
							<div class="flex items-center gap-3 justify-between min-h-7.5">
								<div class="flex items-center gap-2 min-w-0">
									<component
										:is="prompt_type_icons[prompt.type]"
										class="size-4 text-on-surface/50 dark:text-on-surface-dark/50 flex-none"
									></component>
									<h3
										class="text-xl font-bold text-on-surface-strong lg:text-2xl dark:text-on-surface-dark-strong truncate"
										:aria-describedby="`prompt-${prompt.id}-articleDescription`"
										:title="prompt.title"
									>
										{{ prompt.title }}
									</h3>
								</div>
								<div
									class="items-center gap-2"
									:class="{
										'pointer-coarse:flex pointer-fine:hidden pointer-fine:group-hover:flex': !copiedPromptIds.has(prompt.id),
										'flex': copiedPromptIds.has(prompt.id)
									}"
								>
									<PromptIndexCopyButton
										:prompt-content="prompt.content"
										:class="actionButtonsClasses"
										@copied-state-change="handleCopiedStateChange(prompt.id, $event)"
									/>
									<RouterLink
										v-if="props.context === 'app'"
										:to="{ name: 'app.prompts.edit', params: { prompt: prompt.id } }"
									>
										<button
											type="button"
											aria-label="Edit prompt"
											:class="actionButtonsClasses"
											:disabled="deletePrompt_isLoading"
										>
											<PencilIconSolid class="size-5" />
										</button>
									</RouterLink>
									<button
										v-if="props.context === 'app'"
										@click="handleRemovePrompt(prompt.id)"
										type="button"
										aria-label="Delete prompt"
										:class="actionButtonsClasses"
										:disabled="deletePrompt_isLoading"
									>
										<TrashIconSolid class="size-5" />
									</button>
								</div>
							</div>
							<div>
								<span class="w-fit inline-flex overflow-hidden text-xs font-medium dark:border-outline-dark text-on-surface/75 dark:text-on-surface-dark/75 border-0">
									<span class="py-1 flex items-center gap-1 min-w-0">
										<UserIconOutline class="size-3.5" />
										<span class="truncate">{{ prompt.user.name }}</span>
									</span>
								</span>
							</div>
						</div>
						<div class="flex flex-col gap-0.5">
							<p
								:id="`prompt-${prompt.id}-articleDescription`"
								class="max-w-lg text-pretty text-sm"
							>
								{{ prompt.excerpt }}
							</p>
							<RouterLink
								:to="{
									name: props.context === 'app' ? 'app.prompts.show' : 'guest.prompts.show',
									params: { prompt: prompt.id }
								}"
								class="w-fit font-medium text-primary underline-offset-2 hover:underline focus:underline focus:outline-hidden dark:text-primary-dark"
								:class="{
									'pointer-events-none': deletePrompt_isLoading
								}"
							>
								<span>Read full prompt</span>
								<ArrowRightIconSolid aria-hidden="true" class="inline size-4" />
							</RouterLink>
						</div>
					</div>
					<div class="flex items-center gap-2 justify-between min-h-6">
						<template v-if="prompt.category">
							<span class="rounded-radius w-fit inline-flex overflow-hidden border-outline bg-surface-alt text-xs font-medium dark:border-outline-dark dark:bg-surface-dark-alt text-on-surface/75 dark:text-on-surface-dark/75 border-0">
								<span class="px-2 py-1 flex items-center gap-1 bg-surface-alt/10 dark:bg-surface-dark-alt/10 min-w-0">
									<RectangleStackIconOutline class="size-3.5" />
									<span class="truncate">{{ prompt.category.name }}</span>
								</span>
							</span>
						</template>
						<template v-else>
							<span class="invisible"></span>
						</template>
						<span class="text-xs text-on-surface/50 dark:text-on-surface-dark/50 text-nowrap">
							{{ prompt.ui.created_at_formatted }}
						</span>
					</div>
				</div>
			</article>
		</div>
		<PaginationBar
			v-if="paginatedResponse"
			:current-page="paginatedResponse.meta.current_page"
			:last-page="paginatedResponse.meta.last_page"
			:from="paginatedResponse.meta.from"
			:to="paginatedResponse.meta.to"
			:total="paginatedResponse.meta.total"
			@page-change="redirectToPageNumber"
		/>
	</template>
	<p v-else class="text-sm text-on-surface dark:text-on-surface-dark text-pretty">You haven't created any prompts yet. Click "Create Prompt" in the sidebar to get started.</p>
</template>