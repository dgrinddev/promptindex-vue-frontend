<script setup lang="ts">
  import {
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'
  import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
  //import { BellIcon } from '@heroicons/vue/24/outline'
  import { ChevronDownIcon } from '@heroicons/vue/20/solid'
  //import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
  import NavigationSidebar from '@/components/sidebar/NavigationSidebar.vue'
  import { useAuthStore } from '@/stores/authStore'
  import { ref } from 'vue'
  import { useGetNavItemsFromRoutes } from '@/composables/useGetNavItemsFromRoutes'
  import { useLayoutPageTitle } from '@/composables/useLayoutPageTitle'

  const authStore = useAuthStore()
  const { getNavItemsFromRoutes } = useGetNavItemsFromRoutes()
  const { fullPageTitle } = useLayoutPageTitle()

  const navigationSidebar_1primaryNav = getNavItemsFromRoutes('AppLayout:navigationSidebar:1-primaryNav')
  const navigationSidebar_2items = getNavItemsFromRoutes('AppLayout:navigationSidebar:2-items')
  const navigationSidebar_3 = getNavItemsFromRoutes('AppLayout:navigationSidebar:3')
  const topbar_1userMenu_1 = getNavItemsFromRoutes('AppLayout:topbar:1-userMenu.1')

  const navigationSidebarOpen = ref(false)

  function handleUserMenuClick(
    isExactActive: boolean,
    navigate: () => void,
    close: () => void
  ) {
    if (!isExactActive) {
      navigate()
      close()
    }
  }

  // Bootstrap auth state on app load.
  // This syncs client state with server truth (e.g. expired session on refresh).
  authStore.getAuthUser()
</script>

<template>
  <div class="bg-gray-900 dark min-h-dvh">
    <!-- Mobile navigationSidebar -->
    <TransitionRoot as="template" :show="navigationSidebarOpen">
      <Dialog class="relative z-50 lg:hidden" @close="navigationSidebarOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-950/80 backdrop-blur-xs"></div>
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="navigationSidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="size-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>

              <!-- navigationSidebar component for mobile -->
              <NavigationSidebar
                class="bg-gray-900 ring-1 ring-white/10"
                :navigationSidebar_1primaryNav="navigationSidebar_1primaryNav"
                :navigationSidebar_2items="navigationSidebar_2items"
                :navigationSidebar_3="navigationSidebar_3"
                :navigationSidebar_2items_Title="navigationSidebar_2items.length ? 'Section Title' : undefined"
                @navigated="navigationSidebarOpen = false"
              />
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static navigationSidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <!-- navigationSidebar component -->
      <NavigationSidebar
        class="bg-black/10 border-r border-white/10"
        :navigationSidebar_1primaryNav="navigationSidebar_1primaryNav"
        :navigationSidebar_2items="navigationSidebar_2items"
        :navigationSidebar_3="navigationSidebar_3"
        :navigationSidebar_2items_Title="navigationSidebar_2items.length ? 'Section Title' : undefined"
      />
    </div>

    <!-- Main content area -->
    <div class="lg:pl-72">
      <!-- Top bar -->
      <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-white/10 bg-gray-900 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
        <button type="button" class="-m-2.5 p-2.5 text-gray-400 lg:hidden" @click="navigationSidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>

        <!-- Separator -->
        <!--
        <div class="h-6 w-px bg-gray-600 lg:hidden" aria-hidden="true"></div>
        -->

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <!--
          <form class="grid flex-1 grid-cols-1" action="#" method="GET">
            <input
              type="search"
              name="search"
              placeholder="Search"
              aria-label="Search"
              class="col-start-1 row-start-1 block size-full bg-gray-900 pl-8 text-base text-white outline-none placeholder:text-gray-500 sm:text-sm/6"
            />
            <MagnifyingGlassIcon class="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400" aria-hidden="true" />
          </form>
          -->
          <div class="grid flex-1 grid-cols-1"></div>
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <!--
            <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-white">
              <span class="sr-only">View notifications</span>
              <BellIcon class="size-6" aria-hidden="true" />
            </button>
            -->

            <!-- Separator -->
            <!--
            <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-white/10" aria-hidden="true" />
            -->

            <!-- Profile dropdown -->
            <Menu as="div" class="relative">
              <MenuButton class="relative flex items-center">
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">Open user menu</span>
                <img class="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" src="/images/layouts/AppLayout/profile-icon.png" alt="profile image" />
                <span class="hidden lg:flex lg:items-center">
                  <span class="ml-4 text-sm/6 font-semibold text-white" aria-hidden="true">{{ authStore.user?.name }}</span>
                  <ChevronDownIcon class="ml-2 size-5 text-gray-400" aria-hidden="true" />
                </span>
              </MenuButton>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-white/10 focus:outline-none divide-y divide-gray-700">
                  <ul class="py-1.5">
                    <li
                      v-for="item in topbar_1userMenu_1"
                      :key="item.id"
                    >
                      <MenuItem v-slot="{ active, close }">
                        <RouterLink
                          :to="item.to"
                          custom
                          v-slot="{ isExactActive, href, navigate }"
                        >
                          <a
                            :href="href"
                            @click.prevent="handleUserMenuClick(isExactActive, navigate, close)"
                            class="block px-3 py-1 text-sm/6 text-white"
                            :class="{
                              'bg-gray-700': active || isExactActive,
                              'cursor-default': isExactActive,
                            }"
                            :aria-current="isExactActive ? 'page' : undefined"
                          >
                            {{ item.label }}
                          </a>
                        </RouterLink>
                      </MenuItem>
                    </li>
                  </ul>
                  <ul class="py-1.5">
                    <li>
                      <MenuItem v-slot="{ active }">
                        <button
                          class="w-full text-start cursor-pointer block px-3 py-1 text-sm/6 text-white"
                          :class="{ 'bg-gray-700': active }"
                          @click="authStore.logout()"
                          :disabled="authStore.logout_isLoading"
                        >
                          Sign out
                        </button>
                      </MenuItem>
                    </li>
                  </ul>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <!-- Main content -->
      <main class="py-10">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1
            v-if="fullPageTitle"
            class="text-3xl font-bold tracking-tight text-white mb-5"
          >
            {{ fullPageTitle }}
          </h1>
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>