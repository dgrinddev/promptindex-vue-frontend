import type { RouteRecordRaw } from 'vue-router'
import ProfileSettingsView from '@/views/app/settings/ProfileSettingsView.vue'
import PasswordSettingsView from '@/views/app/settings/PasswordSettingsView.vue'
import DeleteAccountView from '@/views/app/settings/DeleteAccountView.vue'

export const appRoutes: RouteRecordRaw[] = [
	{
		path: 'profile-settings',
		name: 'app.app-pages.profile-settings',
		component: ProfileSettingsView,
		meta: {
			// Navigation (used by useGetNavItemsFromRoutes composable)
			navLabel: 'Profile settings',
			navPlacement: {
				'AppLayout:topbar:1-userMenu.1': 1,
			}
		}
	},
	{
		path: 'password-settings',
		name: 'app.app-pages.password-settings',
		component: PasswordSettingsView,
		meta: {
			// Navigation (used by useGetNavItemsFromRoutes composable)
			navLabel: 'Password',
			navPlacement: {
				'AppLayout:topbar:1-userMenu.1': 2,
			}
		}
	},
	{
		path: 'delete-account',
		name: 'app.app-pages.delete-account',
		component: DeleteAccountView,
		meta: {
			// Navigation (used by useGetNavItemsFromRoutes composable)
			navLabel: 'Delete Account',
			navPlacement: {
				'AppLayout:topbar:1-userMenu.1': 3,
			}
		}
	},
]