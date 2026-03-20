import type { RouteRecordRaw } from 'vue-router'
import GuestDocsHomeView from '@/views/guest-docs/GuestDocsHomeView.vue'
import GettingStartedView from '@/views/guest-docs/GettingStartedView.vue'
import AuthenticationView from '@/views/guest-docs/AuthenticationView.vue'

export const guestDocsRoutes: RouteRecordRaw[] = [
	{
		path: '',
		name: 'guest.docs.home',
		component: GuestDocsHomeView,
		/*
		meta: {
			// Navigation (used by useGetNavItemsFromRoutes composable)
			navLabel: 'Docs',
			navPlacement: {
				'GuestLayout:header:2-mainNav.1-publicPages': 4
			},
		},
		*/
	},
	{
		path: 'getting-started',
		name: 'guest.docs.getting-started',
		component: GettingStartedView,
	},
	{
		path: 'authentication',
		name: 'guest.docs.authentication',
		component: AuthenticationView,
	},
]