import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { BASE_URL } from '@/config/env'

// =================================================================
// Guest
// =================================================================
import GuestLayout from '@/layouts/GuestLayout.vue'
import { guestLandingPagesRoutes } from '@/router/guest-landing-pages.routes'
import { guestPublicPromptsRoutes } from '@/router/guest-public-prompts.routes'

const guestParentRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: GuestLayout,
    children: [
      ...guestLandingPagesRoutes,

      // Prompts (nested under `/prompts`)
      {
        path: 'prompts',
        children: guestPublicPromptsRoutes,
      },
    ],
  },
]

// =================================================================
// Guest-docs
// =================================================================
/*
import GuestDocsLayout from '@/layouts/GuestDocsLayout.vue'
import { guestDocsRoutes } from '@/router/guest-docs.routes'

const guestDocsParentRoutes: RouteRecordRaw[] = [
  {
    path: '/docs',
    component: GuestDocsLayout,
    children: guestDocsRoutes,
  },
]
*/

// =================================================================
// Auth
// =================================================================
import AuthLayout from '@/layouts/AuthLayout.vue'
import { authRoutes } from '@/router/auth.routes'

const authParentRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: AuthLayout,
    meta: {
      requiresGuest: true,
    },
    children: authRoutes,
  },
]

// =================================================================
// App
// =================================================================
import AppLayout from '@/layouts/AppLayout.vue'
import { appRoutes } from '@/router/app.routes'
import { appPromptsRoutes } from '@/router/app-prompts.routes'

const appParentRoutes: RouteRecordRaw[] = [
  {
    path: '/app',
    component: AppLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      // Core app routes
      ...appRoutes,

      // Prompts (nested under `/app/prompts`)
      {
        path: 'prompts',
        children: appPromptsRoutes,
      },
    ],
  },
]

// =================================================================
// Errors
// Must be registered last because it contains a catch-all route.
// =================================================================
import ErrorsLayout from '@/layouts/ErrorsLayout.vue'
import { errorsRoutes } from '@/router/errors.routes'

const errorsParentRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: ErrorsLayout,
    children: errorsRoutes,
  },
]

// =================================================================

const routes: RouteRecordRaw[] = [
  ...guestParentRoutes,
  //...guestDocsParentRoutes,
  ...authParentRoutes,
  ...appParentRoutes,
  ...errorsParentRoutes,
]

export const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return {
      name: 'auth.login',
      query: { redirect: to.fullPath },
    }
  }
  if (to.meta.requiresGuest && authStore.isLoggedIn) {
    return {
      name: 'app.prompts.index',
    }
  }
  return true // in all other cases: allow navigation
})