import type { RouteRecordRaw } from 'vue-router'
import PromptIndexView from '@/views/prompts/PromptIndexView.vue'
import PromptShowView from '@/views/prompts/PromptShowView.vue'

export const guestPublicPromptsRoutes: RouteRecordRaw[] = [
	{
		path: 'prompt-library',
		name: 'guest.prompts.index',
		component: PromptIndexView,
		props: {
			context: 'guest'
		},
		meta: {
			pageTitle: '',

			// Navigation (used by useGetNavItemsFromRoutes composable)
			navLabel: 'Prompt Library',
			navPlacement: {
				'GuestLayout:header:2-mainNav.1-publicPages': 2,
			},
		},
	},
	{
		path: ':prompt(\\d+)',
		name: 'guest.prompts.show',
		component: PromptShowView,
		props: {
			context: 'guest'
		},
	},
]