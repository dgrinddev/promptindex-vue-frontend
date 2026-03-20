import type { RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'

export const authRoutes: RouteRecordRaw[] = [
	{
		path: 'login',
		name: 'auth.login',
		component: LoginView,
		meta: {
			otherAuthRouteNav_ContextText: "Don't have an account?",

			// Navigation (used by useGetNavItemsFromRoutes composable)
			navLabel: 'Sign in',
			navPlacement: {
				'GuestLayout:header:2-mainNav.2-accountPages.2-guest': 1,
				'AuthLayout:otherAuthRouteNav:2-onRegister': 1,
			},
		},
	},
	{
		path: 'register',
		name: 'auth.register',
		component: RegisterView,
		meta: {
			otherAuthRouteNav_ContextText: 'Already have an account?',

			// Navigation (used by useGetNavItemsFromRoutes composable)
			navLabel: 'Create account',
			navPlacement: {
				'GuestLayout:header:2-mainNav.2-accountPages.2-guest': 2,
				'AuthLayout:otherAuthRouteNav:1-onLogin': 1,
			},
		},
	},
]