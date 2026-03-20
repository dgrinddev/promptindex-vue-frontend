<script setup lang="ts">
  import InputError from '@/components/inputs/InputError.vue'
  import type { ClassProp } from '@/types/vue.types'

  const {
    rows = 3,
  } = defineProps<{
    id: string
    name: string
    label?: string
    description?: string
    rootClass?: ClassProp
    labelClass?: ClassProp
    rows?: number
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
      class="block text-sm/6 font-medium text-white"
      :class="labelClass"
    >
      {{ label }}
    </label>
		<div class="mt-2">
			<textarea
        :name="name"
        :id="id"
        v-model="model"
        :rows="rows"
        class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
        v-bind="$attrs"
      >
      </textarea>
		</div>
    <p
      v-if="description"
      class="mt-3 text-sm/6 text-gray-400"
    >
      {{ description }}
    </p>
    <InputError :name="name" />
	</div>
</template>