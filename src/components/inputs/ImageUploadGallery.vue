<script setup lang="ts">
	import { useId } from 'vue'
	import { XCircleIcon as XCircleIconSolid } from '@heroicons/vue/24/solid'
	import { CheckIcon as CheckIconSolid } from '@heroicons/vue/24/solid'
	import ActionButton from '@/components/buttons/ActionButton.vue'
	import InputError from '@/components/inputs/InputError.vue'
	import type { Image } from '@/types/prompts/image.types'
	import type { ClassProp } from '@/types/vue.types'

	defineProps<{
		name: string
		groupLabel?: string
		description?: string
		images: Image[]
		rootClass?: ClassProp
		labelClass?: ClassProp
		showActionButton?: boolean
		enableRadio?: boolean
		noImagesMessage?: string
		isProcessing?: boolean
	}>()

	defineOptions({
		inheritAttrs: false
	})

	const coverImageId = defineModel<number | null>()

	const emit = defineEmits<{
		(e: 'remove-image', imageId: number): void
	}>()

	const groupLabelId = useId()
</script>

<template>
	<div :class="rootClass">
		<div
			:role="enableRadio ? 'radiogroup' : undefined"
			:aria-labelledby="enableRadio && groupLabel ? groupLabelId : undefined"
			:aria-describedby="enableRadio && description ? `${name}-description` : undefined"
		>
			<p
				v-if="groupLabel"
				:id="groupLabelId"
				class="text-sm/6 font-semibold text-white"
			>
				{{ groupLabel }}
			</p>
			<p
				v-if="description"
				:id="`${name}-description`"
				class="mt-1 text-sm/6 text-gray-400"
			>
				{{ description }}
			</p>
			<div
				v-if="images.length"
				class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 justify-evenly mt-4"
			>
				<div
					v-for="(image, index) in images"
					:key="`${name}-${String(image.id)}`"
					class="relative group"
				>

					<ActionButton
						v-if="showActionButton"
						:icon="XCircleIconSolid"
						:class="{
							'hover:bg-red-600/70': !isProcessing,
						}"
						icon-class="size-6"
						aria-label="Slet billede"
						:disabled="isProcessing"
						@click="emit('remove-image', image.id)"
					/>

					<img
						v-if="!enableRadio"
						:src="image.path"
						:alt="image.original_filename"
						:title="image.original_filename"
						class="object-cover rounded w-full h-40"
					>

					<label
						v-if="enableRadio"
						:for="`${name}-${String(image.id)}`"
						class="relative block rounded-lg overflow-hidden border transition has-checked:ring-2 has-checked:ring-indigo-500"
						:class="[
							labelClass,
							isProcessing
								? 'cursor-not-allowed'
								: 'cursor-pointer hover:ring-2 hover:ring-indigo-400',
						]"
					>
						<!-- Fallback: group name only on FIRST radio -->
						<span v-if="index === 0 && groupLabel" class="sr-only">
							{{ groupLabel }}:
						</span>
						<input
							:id="`${name}-${String(image.id)}`"
							:name="name"
							type="radio"
							:value="image.id"
							class="sr-only peer"
							v-model="coverImageId"
							:disabled="isProcessing"
							v-bind="$attrs"
						/>
						<img
							:src="image.path"
							:alt="image.original_filename"
							:title="image.original_filename"
							class="object-cover w-full h-40"
						/>
						<span class="sr-only">{{ image.original_filename }}</span>
						<!-- Badge -->
						<div
							class="absolute bottom-2 left-2 right-2 flex items-center justify-center
								rounded-md px-3 py-1 text-sm font-medium transition"
							:class="{
								'bg-indigo-600 text-white': coverImageId === image.id,
								'bg-black/60 text-white': coverImageId !== image.id,
								'group-hover:bg-black/80': coverImageId !== image.id && !isProcessing,
							}"
						>
							<CheckIconSolid
								v-if="coverImageId === image.id"
								class="size-4 mr-1"
							/>
							<span>
								{{ coverImageId === image.id ? 'Chosen cover' : 'Choose as cover' }}
							</span>
						</div>
					</label>

				</div>
			</div>
			<p
				v-else-if="noImagesMessage"
				class="mt-3 text-sm/6 text-gray-400"
			>
				{{ noImagesMessage }}
			</p>
		</div>
		<InputError :name="name" />
	</div>
</template>