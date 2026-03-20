import type { RouteRecordRaw } from 'vue-router'
import GuestHomeView from '@/views/guest/GuestHomeView.vue'
import LearnMoreView from '@/views/guest/LearnMoreView.vue'
import CookiesAndPrivacyPolicyView from '@/views/guest/CookiesAndPrivacyPolicyView.vue'
import TermsOfUseView from '@/views/guest/TermsOfUseView.vue'

export const guestLandingPagesRoutes: RouteRecordRaw[] = [
	{
		path: '',
		name: 'guest.guest-pages.home',
		component: GuestHomeView,
		meta: {
			pageTitle: '',

			// Navigation (used by useGetNavItemsFromRoutes composable)
			navLabel: 'Home',
			navPlacement: {
				'GuestLayout:header:2-mainNav.1-publicPages': 1,
				'GuestLayout:header:1-logo': 1,
				'AuthLayout:leaveAuthNav:1': 1,
				'AppLayout:navigationSidebar:3': 1,
			},
		},
	},
	{
		path: 'learn-more',
		name: 'guest.guest-pages.learn-more',
		component: LearnMoreView,
		meta: {
			pageTitle: '',

			// Navigation (used by useGetNavItemsFromRoutes composable)
			navLabel: 'Learn More',
			navPlacement: {
				'GuestLayout:header:2-mainNav.1-publicPages': 3,
			},
		},
	},
	{
		path: 'cookies-and-privacy-policy',
		name: 'guest.guest-pages.cookies-and-privacy-policy',
		component: CookiesAndPrivacyPolicyView,
		meta: {
			pageTitle: '',

			// Navigation (used by useGetNavItemsFromRoutes composable)
			navLabel: 'Cookies & Privacy Policy',
			navPlacement: {
				'GuestLayout:footer:2.1-legal': 1,
			},
		},
	},
	{
		path: 'terms-of-use',
		name: 'guest.guest-pages.terms-of-use',
		component: TermsOfUseView,
		meta: {
			pageTitle: '',

			// Navigation (used by useGetNavItemsFromRoutes composable)
			navLabel: 'Terms of Use',
			navPlacement: {
				'GuestLayout:footer:2.1-legal': 2,
			},
		},
	},
]