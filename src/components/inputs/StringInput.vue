<script setup lang="ts">
  import InputError from '@/components/inputs/InputError.vue'
  import type { TextSinglelineInputTypes } from '@/types/ui/inputs/text-singleline.types'
  import type { ClassProp } from '@/types/vue.types'

  defineProps<{
    id: string
    name: string
    label?: string
    type: TextSinglelineInputTypes
    rootClass?: ClassProp
    labelClass?: ClassProp
  }>()

  defineOptions({
    inheritAttrs: false
  })

  const model = defineModel<string>({ required: true })
</script>

<template>
	<div :class="rootClass">
    <label
      v-if="label"
      :for="id"
      class="block text-sm/6 font-medium text-gray-100"
      :class="labelClass"
    >
      {{ label }}
    </label>
		<div class="mt-2">
      <input
        :type="type"
        :name="name"
        :id="id"
        v-model="model"
        class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
        v-bind="$attrs"
      />
		</div>
    <InputError :name="name" />
	</div>
</template>