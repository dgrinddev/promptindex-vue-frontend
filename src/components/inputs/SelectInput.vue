<script setup lang="ts" generic="TValue extends string | number | null">
  import InputError from '@/components/inputs/InputError.vue'
  import { ChevronDownIcon as ChevronDownIconSolid } from '@heroicons/vue/24/solid'
  import type { ClassProp } from '@/types/vue.types'
  import type { BasicSelectOption } from '@/types/ui/inputs/selection-dropdown.types'

  defineProps<{
    id: string
    name: string
    label?: string
    options: BasicSelectOption<TValue>[]
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
    <label
      v-if="label"
      :for="id"
      class="block text-sm/6 font-medium text-white"
      :class="labelClass"
    >
      {{ label }}
    </label>
		<div class="mt-2 grid grid-cols-1">
      <select
        :id="id"
        :name="name"
        v-model="model"
        class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-1.5 pr-8 pl-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 *:bg-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
        v-bind="$attrs"
      >
        <option
          v-for="(option, index) in options"
          :key="String(option.value) + '-' + index"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>
			<ChevronDownIconSolid
        class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
        aria-hidden="true"
      />
		</div>
    <InputError :name="name" />
	</div>
</template>