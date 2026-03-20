<script setup lang="ts">
  import InputError from '@/components/inputs/InputError.vue'
  import { IS_DEV } from '@/config/env'
  import type { ClassProp } from '@/types/vue.types'

  const props = defineProps<{
    id: string
    name: string
    label?: string
    rootClass?: ClassProp
    labelClass?: ClassProp
  }>()

  const slots = defineSlots<{
    default(): unknown
  }>()

  if (IS_DEV) {
    const hasLabelProp = !!props.label
    const hasDefaultSlot = !!slots.default
    if (!hasLabelProp && !hasDefaultSlot) throw new Error('[CheckboxInput] Either provide `label`-prop or fill in slot.')
    if (hasLabelProp && hasDefaultSlot) throw new Error("[CheckboxInput] Don't use `label`-prop and slot simultaneously.")
  }

  defineOptions({
    inheritAttrs: false
  })

  const model = defineModel<boolean>({ required: true })
</script>

<template>
	<div :class="rootClass">
		<div class="flex gap-3">
			<div class="flex h-6 shrink-0 items-center">
				<div class="group grid size-4 grid-cols-1">
					<input
            :id="id"
            :name="name"
            v-model="model"
            type="checkbox"
            class="col-start-1 row-start-1 appearance-none rounded-sm border border-white/10 bg-white/5 checked:border-indigo-500 checked:bg-indigo-500 indeterminate:border-indigo-500 indeterminate:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:border-white/5 disabled:bg-white/10 disabled:checked:bg-white/10 forced-colors:appearance-auto"
            v-bind="$attrs"
          />
					<svg class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-white/25" viewBox="0 0 14 14" fill="none">
						<path class="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						<path class="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</div>
			</div>
			<div class="text-sm/6">
				<label :for="id" class="font-medium text-white" :class="labelClass">
          <slot>
            {{ label }}
          </slot>
        </label>
			</div>
		</div>
    <InputError :name="name" />
	</div>
</template>