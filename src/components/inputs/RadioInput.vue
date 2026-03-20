<script setup lang="ts" generic="TValue extends string | number">
	import InputError from '@/components/inputs/InputError.vue'
	import type { BasicRadioOption } from '@/types/ui/inputs/selection-inline.types'
	import type { ClassProp } from '@/types/vue.types'

	defineProps<{
		name: string
		groupLabel?: string
		description?: string
		options: BasicRadioOption<TValue>[]
		rootClass?: ClassProp
		labelClass?: ClassProp
	}>()

	defineOptions({
		inheritAttrs: false
	})

	const model = defineModel<TValue>({ required: true })
</script>

<template>
	<div :class="rootClass">
		<fieldset
			:aria-describedby="description ? `${name}-description` : undefined"
		>
			<legend
				v-if="groupLabel"
				class="text-sm/6 font-semibold text-white"
			>
				{{ groupLabel }}
			</legend>
			<p
				v-if="description"
				:id="`${name}-description`"
				class="mt-1 text-sm/6 text-gray-400"
			>
				{{ description }}
			</p>
			<p v-if="$slots.default" class="mt-1 text-sm/6 text-gray-400">
				<slot :chosen="model"></slot>
			</p>
			<div class="mt-6 space-y-6">
				<div
					v-for="option in options"
					:key="`${name}-${String(option.value)}`"
					class="flex items-center gap-x-3"
				>
					<input
						:id="`${name}-${String(option.value)}`"
						:name="name"
						type="radio"
						:value="option.value"
						class="relative size-4 appearance-none rounded-full border border-white/10 bg-white/5 before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-500 checked:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:border-white/5 disabled:bg-white/10 disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
						:disabled="option.disabled"
						v-model="model"
						v-bind="$attrs"
					/>
					<label
						:for="`${name}-${String(option.value)}`"
						class="block text-sm/6 font-medium text-white"
						:class="labelClass"
					>
						<span
							:class="{
								'font-black': option.highlight,
								'font-thin': option.disabled,
							}"
						>
							{{ option.label }}
						</span>
					</label>
				</div>
			</div>
		</fieldset>
    <InputError :name="name" />
	</div>
</template>