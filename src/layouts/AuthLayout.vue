<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { APP_NAME } from '@/config/env'
  import { useGetNavItemsFromRoutes } from '@/composables/useGetNavItemsFromRoutes'
  import { useLayoutPageTitle } from '@/composables/useLayoutPageTitle'

  const route = useRoute()
  const { getNavItemsFromRoutes } = useGetNavItemsFromRoutes()
  const { fullPageTitle } = useLayoutPageTitle()

  const otherAuthRouteNav_1onLogin = getNavItemsFromRoutes('AuthLayout:otherAuthRouteNav:1-onLogin')
  const otherAuthRouteNav_2onRegister = getNavItemsFromRoutes('AuthLayout:otherAuthRouteNav:2-onRegister')
  const leaveAuthNav_1 = getNavItemsFromRoutes('AuthLayout:leaveAuthNav:1')

  const otherAuthRouteNavItem = computed(() => {
    if (route.name === 'auth.login') return otherAuthRouteNav_1onLogin[0] ?? null
    if (route.name === 'auth.register') return otherAuthRouteNav_2onRegister[0] ?? null
    return null
  })

  const leaveAuthNavItem = computed(() => leaveAuthNav_1[0] ?? null)
</script>

<template>
  <main id="main-content" class="flex min-h-dvh flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        :src="`/images/other/${APP_NAME.toLowerCase()}-logo.png`"
        :alt="`${APP_NAME}-logo`"
      />
      <h2 v-if="fullPageTitle" class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
        {{ fullPageTitle }}
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <RouterView />
      <p class="mt-10 text-center text-sm/6 text-gray-400">
        <span v-if="route.meta.otherAuthRouteNav_ContextText">
          {{ route.meta.otherAuthRouteNav_ContextText + ' ' }}
        </span>
        <RouterLink
          v-if="otherAuthRouteNavItem"
          :to="otherAuthRouteNavItem.to"
          class="font-semibold text-indigo-400 hover:text-indigo-300"
        >
          {{ otherAuthRouteNavItem.label }}
        </RouterLink>
      </p>
      <p class="mt-10 text-center text-sm/6 text-gray-400">
        <RouterLink
          v-if="leaveAuthNavItem"
          :to="leaveAuthNavItem.to"
          class="font-semibold text-indigo-400 hover:text-indigo-300"
        >
          Go back to home
        </RouterLink>
      </p>
    </div>
  </main>
</template>