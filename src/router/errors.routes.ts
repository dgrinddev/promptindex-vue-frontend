import type { RouteRecordRaw } from 'vue-router'
import ServerErrorView from '@/views/errors/ServerErrorView.vue'
import NotFoundView from '@/views/errors/NotFoundView.vue'

export const errorsRoutes: RouteRecordRaw[] = [
	{
		path: '500',
		name: 'errors.internal-server-error',
		component: ServerErrorView,
	},
	{
		// Catch-all route, must remain the last registered route
		path: ':pathMatch(.*)*',
		name: 'errors.not-found',
		component: NotFoundView,
	},
]