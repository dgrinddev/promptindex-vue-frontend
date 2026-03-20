<script setup lang="ts">
  import { ref, provide, onMounted, watch } from 'vue'
  import { useGetCategories } from '@/composables/useGetCategories'
  import {
    pageTitleSuffix_key,
    categories_key,
    getCategories_isLoading_key
  } from '@/utils/injection-keys'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const { getCategories_isLoading, categories, getCategories } = useGetCategories()
  
  const pageTitleSuffix = ref<string | null>(null)

  provide(pageTitleSuffix_key, pageTitleSuffix)
  provide(categories_key, categories)
  provide(getCategories_isLoading_key, getCategories_isLoading)

  watch(
    () => route.fullPath,
    () => {
      pageTitleSuffix.value = null
    }
  )

  onMounted(() => {
    getCategories()
  })
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>