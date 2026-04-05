<script setup lang="ts">
	import { Dialog, DialogPanel } from '@headlessui/vue'
	import { computed, ref } from 'vue'
	import { useAuthStore } from '@/stores/authStore'
	import IconFacebook from '@/components/icons/bootstrap/IconFacebook.vue'
	import { Bars3Icon as Bars3IconOutline } from '@heroicons/vue/24/outline'
	import { XMarkIcon as XMarkIconOutline } from '@heroicons/vue/24/outline'
	import { APP_NAME } from '@/config/env'
	import { useGetNavItemsFromRoutes } from '@/composables/useGetNavItemsFromRoutes'
	import { useLayoutPageTitle } from '@/composables/useLayoutPageTitle'

	const authStore = useAuthStore()
	const { getNavItemsFromRoutes } = useGetNavItemsFromRoutes()
	const { fullPageTitle } = useLayoutPageTitle()

	const header_1logo = getNavItemsFromRoutes('GuestLayout:header:1-logo')
	const header_2mainNav_1publicPages = getNavItemsFromRoutes('GuestLayout:header:2-mainNav.1-publicPages')
	const header_2mainNav_2accountPages_1user = getNavItemsFromRoutes('GuestLayout:header:2-mainNav.2-accountPages.1-user')
	const header_2mainNav_2accountPages_2guest = getNavItemsFromRoutes('GuestLayout:header:2-mainNav.2-accountPages.2-guest')
	const footer_2_1legal = getNavItemsFromRoutes('GuestLayout:footer:2.1-legal')

	const mobileMenuOpen = ref(false)
	const currentYear = new Date().getFullYear()
	const headerLogoNavItem = computed(() => header_1logo[0] ?? null)

	const accountNav = computed(() =>
		authStore.isLoggedIn ? header_2mainNav_2accountPages_1user : header_2mainNav_2accountPages_2guest
	)

	function handleNavigate(
		isExactActive: boolean,
		navigate: () => void,
		closeMobileMenu = false
	) {
		if (!isExactActive) {
			navigate()
			if (closeMobileMenu) mobileMenuOpen.value = false
		}
	}
</script>

<template>
	<div id="topnavbar-and-maincontent-wrapper" class="min-h-dvh bg-gray-900 flex flex-col grow">
		
		<header id="header" class="z-20">
			<nav class="flex items-center justify-between p-6 md:px-8 gap-17" aria-label="top navigation bar">
				<div class="flex md:flex-1">
					<RouterLink
						v-if="headerLogoNavItem"
						:to="headerLogoNavItem.to"
						class="-m-1.5 p-1.5"
						exact-active-class="cursor-default"
					>
						<span class="sr-only">{{ APP_NAME }}</span>
						<img
							class="h-8 w-auto"
							:src="`/images/other/${APP_NAME.toLowerCase()}-logo.png`"
							:alt="`${APP_NAME}-logo`"
						/>
					</RouterLink>
				</div>
				<div class="flex md:hidden">
					<button
						type="button"
						class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
						@click="mobileMenuOpen = true"
					>
						<span class="sr-only">Open main menu</span>
						<Bars3IconOutline class="size-6" />
					</button>
				</div>
				<ul class="hidden md:flex md:gap-x-5">
					<li
						v-for="item in header_2mainNav_1publicPages"
						:key="item.id"
					>
						<RouterLink
							:to="item.to"
							custom
							v-slot="{ isExactActive, href, navigate }"
						>
							<a
								:href="href"
								@click.prevent="handleNavigate(isExactActive, navigate)"
								class="text-nowrap text-sm/6 font-semibold text-white focus:outline-hidden focus:underline hover:underline underline-offset-2 transition"
								:class="{
									'underline cursor-default': isExactActive,
								}"
								:aria-current="isExactActive ? 'page' : undefined"
							>
								{{ item.label }}
							</a>
						</RouterLink>
					</li>
				</ul>
				<ul class="hidden md:flex md:gap-x-5 md:flex-1 md:justify-end items-center">
					<li
						v-for="item in accountNav"
						:key="item.id"
					>
						<RouterLink
							:to="item.to"
							class="text-nowrap font-semibold text-white transition"
							:class="{
								'rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500': item.id === 'auth.register',
								'text-sm/6 focus:outline-hidden focus:underline hover:underline underline-offset-2': item.id !== 'auth.register'
							}"
						>
							<span>{{ item.label }}</span>
							<span v-if="item.id === 'app.prompts.index'" aria-hidden="true"> &rarr;</span>
						</RouterLink>
					</li>
				</ul>
			</nav>

			<Dialog
				class="lg:hidden"
				@close="mobileMenuOpen = false"
				:open="mobileMenuOpen"
			>
				<div class="fixed inset-0 z-50"></div>
				<DialogPanel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
					<div class="flex items-center justify-between">
						<span></span>
						<button
							type="button"
							class="-m-2.5 rounded-md p-2.5 text-gray-200"
							@click="mobileMenuOpen = false"
						>
							<span class="sr-only">Close menu</span>
							<XMarkIconOutline class="size-6" aria-hidden="true" />
						</button>
					</div>
					<div class="mt-6 flow-root">
						<div class="-my-6 divide-y divide-white/10">
							<div class="space-y-2 py-6">
								<ul class="flex flex-col gap-2">
									<li
										v-for="item in header_2mainNav_1publicPages"
										:key="item.id"
									>
										<RouterLink
											:to="item.to"
											custom
											v-slot="{ isExactActive, href, navigate }"
										>
											<a
												:href="href"
												@click.prevent="handleNavigate(isExactActive, navigate, true)"
												class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
												:class="{
													'bg-white/5 cursor-default': isExactActive,
												}"
												:aria-current="isExactActive ? 'page' : undefined"
											>
												{{ item.label }}
											</a>
										</RouterLink>
									</li>
								</ul>
							</div>
							<ul class="py-6 flex flex-col gap-2">
								<li
									v-for="item in accountNav"
									:key="item.id"
								>
									<RouterLink
										:to="item.to"
										class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white"
										:class="{
											'bg-indigo-500 hover:bg-indigo-400': item.id === 'auth.register',
											'hover:bg-white/5': item.id !== 'auth.register'
										}"
									>
										<span>{{ item.label }}</span>
										<span v-if="item.id === 'app.prompts.index'" aria-hidden="true"> &rarr;</span>
									</RouterLink>
								</li>
							</ul>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</header>

		<main id="main-content" class="grow container mx-auto px-4 py-6 sm:px-6 lg:px-8">
			<h1 v-if="fullPageTitle" class="text-3xl font-bold tracking-tight text-white mb-5">
				{{ fullPageTitle }}
			</h1>
			<RouterView />
		</main>

		<footer id="footer" class="border-t border-outline dark:border-outline-dark">
			<div id="footer-container" class="container mx-auto px-4 sm:px-6 lg:px-8">
				<div class="py-6 flex flex-col md:flex-row justify-between items-center gap-x-4 gap-y-4">
					<div class="flex flex-col items-center md:items-start order-last md:order-first">
						<p class="font-light text-on-surface/50 dark:text-on-surface-dark/50 text-xs">
							© {{ currentYear }} {{ APP_NAME }}. All Rights Reserved.
						</p>
						<p class="font-light text-on-surface/90 dark:text-on-surface-dark/90 text-xs">
							<span>Developed by </span>
							<a
								href="https://dgrind.dev/"
								rel="noopener"
								target="_blank"
								class="font-light text-on-surface/90 dark:text-on-surface-dark/90 underline-offset-2 hover:text-on-surface-strong/90 focus:outline-hidden focus:underline dark:hover:text-primary-dark/90 transition text-xs"
							>
								Dgrind.Dev
							</a>
						</p>
					</div>
					<div class="flex sm:flex-row flex-wrap items-center gap-x-2.5 md:gap-x-4 gap-y-3">
						<ul class="flex gap-3 md:gap-5">
							<li v-for="item in footer_2_1legal" :key="item.id">
								<RouterLink
									:to="item.to"
									custom
									v-slot="{ isExactActive, href, navigate }"
								>
									<a
										:href="href"
										@click.prevent="handleNavigate(isExactActive, navigate)"
										class="font-medium text-on-surface dark:text-on-surface-dark underline-offset-2 hover:text-on-surface-strong focus:outline-hidden focus:underline hover:underline dark:hover:text-primary-dark transition text-sm"
										:class="{
											'text-on-surface-strong dark:text-primary-dark underline cursor-default': isExactActive,
										}"
										:aria-current="isExactActive ? 'page' : undefined"
									>
										{{ item.label }}
									</a>
								</RouterLink>
							</li>
						</ul>
						<span class="h-4 w-px bg-outline dark:bg-outline-dark mx-1 block"></span>
						<ul class="flex gap-3 md:gap-5">
							<li>
								<a
									href="https://www.facebook.com/"
									rel="nofollow noopener"
									target="_blank"
									aria-label="Visit us on Facebook (opens in new tab)"
									class="text-on-surface dark:text-on-surface-dark underline-offset-2 hover:text-on-surface-strong focus:outline-hidden focus:underline dark:hover:text-primary-dark transition"
								>
									<IconFacebook aria-hidden="true" class="w-4 h-4" />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>

	</div>
</template>