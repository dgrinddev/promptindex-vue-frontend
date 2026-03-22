<script setup lang="ts">
	import StringInput from '@/components/inputs/StringInput.vue'
	import RadioInput from '@/components/inputs/RadioInput.vue'
	import SelectInput from '@/components/inputs/SelectInput.vue'
	import TextareaInput from '@/components/inputs/TextareaInput.vue'
	import ImageUploadInput from '@/components/inputs/ImageUploadInput.vue'
	import { ref, inject, watch, computed } from 'vue'
	import { useErrorsStore } from '@/stores/errorsStore'
	import { useRoute } from 'vue-router'
	import { useGetPromptForEdit } from '@/composables/useGetPromptForEdit'
	import { useSavePrompt } from '@/composables/useSavePrompt'
	import { v4 as uuidv4 } from 'uuid'
	import type { PromptPayload } from '@/types/prompts/prompt.types'
	import type { Image } from '@/types/prompts/image.types'
	import { pageTitleSuffix_key } from '@/utils/injection-keys'
	import { categories_key, getCategories_isLoading_key } from '@/utils/injection-keys'

	const route = useRoute()
	const errorsStore = useErrorsStore()
	const { getPromptForEdit_isLoading, prompt, getPromptForEdit } = useGetPromptForEdit()
	const { savePrompt_isLoading, savePrompt } = useSavePrompt()

	defineProps<{
		submitBtn: string
	}>()

	const pageTitleSuffix = inject(pageTitleSuffix_key)
	if (!pageTitleSuffix) throw new Error('pageTitleSuffix_key is not provided.')

	const categories = inject(categories_key)
	if (!categories) throw new Error('categories_key is not provided.')

	const getCategories_isLoading = inject(getCategories_isLoading_key)
	if (!getCategories_isLoading) throw new Error('getCategories_isLoading_key is not provided.')

	const prompt_id = ref<number | null>(null)
	const images = ref<Image[]>([])
	const form = ref<PromptPayload>({
		title: '',
		type: 'text',
		category_id: null,
		content: '',
		coverimage_id: null,
		upload_image_token: null,
	})

	const resetFormForCreate = () => {
		pageTitleSuffix.value = null
		prompt_id.value = null
		images.value = []
		form.value = {
			title: '',
			type: 'text',
			category_id: null,
			content: '',
			coverimage_id: null,
			upload_image_token: uuidv4(),
		}
	}

	watch(() => route.params.prompt, (new_prompt_param) => {
			errorsStore.clear()

			// This view is used by both 'create' and ':prompt(\\d+)/edit' routes.
			// The `:prompt(\\d+)` constraint guarantees a digit string when the parameter is present, so the actual runtime type of the parameter here is `string | undefined`.
			const param = new_prompt_param as string | undefined

			if (param !== undefined) {
				getPromptForEdit(Number(param))
			} else {
				resetFormForCreate()
			}
		},
		{ immediate: true }
	)

	watch(prompt, (new_prompt) => {
			if (!new_prompt) return
			pageTitleSuffix.value = new_prompt.title
			prompt_id.value = new_prompt.id
			images.value = new_prompt.images
			form.value = {
				title: new_prompt.title,
				type: new_prompt.type,
				category_id: new_prompt.category_id,
				content: new_prompt.content,
				coverimage_id: new_prompt.coverimage_id,
				upload_image_token: null,
			}
		}
	)

	const categoryOptions = computed(() => {
		return [
			{
				value: null,
				label: 'Choose category',
			},
			...categories.value.map(category => ({
				value: category.id,
				label: category.name,
			})),
		]
	})

	const isUploadingImages = ref(false)
</script>

<template>
	<div v-if="getPromptForEdit_isLoading">
		<p class="mt-1 text-base text-gray-400">Loading...</p>
	</div>
	<form v-else @submit.prevent="savePrompt(form, prompt_id)">
		<div class="space-y-12">
			<div class="border-b border-white/10 pb-12">
				<h2 class="mt-1 text-base text-gray-400">
					<span v-if="prompt_id">Edit your prompt below.</span>
					<span v-else>
						<span>Create your prompt below.</span>
						<br>
						<span><span class="font-bold text-white">IMPORTANT:</span> It will be published instantly and <span class="font-bold text-white">visible to everyone</span>.</span>
					</span>
				</h2>

				<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
					<StringInput
						id="title"
						name="title"
						type="text"
						v-model="form.title"
						label="Title"
						required
						autofocus
						root-class="sm:col-span-4"
						label-class="!text-white"
					/>

					<RadioInput
						v-model="form.type"
						name="type"
						group-label="Choose prompt-type"
						:options="[
							{ value: 'text', label: 'Text generation' },
							{ value: 'image', label: 'Image generation' },
							{ value: 'other', label: 'Other' },
						]"
						required
						root-class="col-span-full"
						v-slot="slotProps"
					>
						{{
						({
							text: 'Selected: Text generation. Used for generating written content.',
							image: 'Selected: Image generation. Used for generating images.',
							other: 'Selected: Other. Used for non-text and non-image prompts.',
						})[slotProps.chosen] || ''
						}}
					</RadioInput>

					<SelectInput
						id="category_id"
						name="category_id"
						v-model="form.category_id"
						label="Prompt Category"
						root-class="sm:col-span-3"
						:options="categoryOptions"
						:disabled="getCategories_isLoading"
					/>

					<TextareaInput
						id="content"
						name="content"
						v-model="form.content"
						label="Content"
						required
						root-class="col-span-full"
					/>
					
					<ImageUploadInput
						id="image"
						name="image"
						name-gallery="coverimage_id"
						label="Upload images"
						v-model:images="images"
						v-model:coverImageId="form.coverimage_id"
						v-model:isProcessing="isUploadingImages"
						:prompt-id="prompt_id"
						:upload-image-token="form.upload_image_token"
						enable-radio
						root-class="col-span-full"
						gallery-group-label="Choose cover image"
					/>
				</div>
			</div>
		</div>

		<div class="mt-6 flex items-center justify-end gap-x-6">
			<!--
				<button type="button" class="text-sm/6 font-semibold text-white">Cancel</button>
			-->
			<button
				type="submit"
				:disabled="isUploadingImages || savePrompt_isLoading"
				class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{{ submitBtn }}
			</button>
		</div>
	</form>
</template>