import type { RouteRecordRaw } from 'vue-router'
import PromptIndexView from '@/views/prompts/PromptIndexView.vue'
import PromptFormView from '@/views/prompts/PromptFormView.vue'
import PromptShowView from '@/views/prompts/PromptShowView.vue'
import {
	FolderIcon,
	PlusIcon,
} from '@heroicons/vue/24/outline'

export const appPromptsRoutes: RouteRecordRaw[] = [
	{
		path: 'index',
		name: 'app.prompts.index',
		component: PromptIndexView,
		props: {
			context: 'app',
		},
		meta: {
			pageTitle: 'All my prompts',

			// Navigation (used by useGetNavItemsFromRoutes composable)
			navLabel: 'My Prompts',
			navIcon: FolderIcon,
			navPlacement: {
				'AppLayout:navigationSidebar:1-primaryNav': 2,
				'GuestLayout:header:2-mainNav.2-accountPages.1-user': 1,
			},
		},
	},
	{
		path: 'create',
		name: 'app.prompts.create',
		component: PromptFormView,
		props: {
			submitBtn: 'Create & Publish',
		},
		meta: {
			// Navigation (used by useGetNavItemsFromRoutes composable)
			navLabel: 'Create Prompt',
			navIcon: PlusIcon,
			navPlacement: {
				'AppLayout:navigationSidebar:1-primaryNav': 1,
			},
		},
	},
	{
		path: ':prompt(\\d+)',
		name: 'app.prompts.show',
		component: PromptShowView,
		props: {
			context: 'app',
		},
	},
	{
		path: ':prompt(\\d+)/edit',
		name: 'app.prompts.edit',
		component: PromptFormView,
		props: {
			submitBtn: 'Save',
		},
		meta: {
			pageTitle: 'Edit prompt'
		},
	},
]