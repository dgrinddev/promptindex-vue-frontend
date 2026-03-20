<script setup lang="ts">
	import SidebarNavPill from '@/components/sidebar/SidebarNavPill.vue'
	import { APP_NAME } from '@/config/env'
	import type { NavItem } from '@/types/ui/navigation.types'

	defineProps<{
		navigationSidebar_1primaryNav: NavItem[]
		navigationSidebar_2items?: NavItem[]
		navigationSidebar_3: NavItem[]
		navigationSidebar_2items_Title?: string
	}>()

	const emit = defineEmits<{
		(e: 'navigated'): void
	}>()
</script>

<template>
	<div class="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
		<div class="flex h-16 shrink-0 items-center">
			<img
				class="h-8 w-auto"
				:src="`/images/other/${APP_NAME.toLowerCase()}-logo.png`"
				:alt="`${APP_NAME}-logo`"
			/>
		</div>
		<nav class="flex flex-1 flex-col">
			<ul role="list" class="flex flex-1 flex-col gap-y-7">
				<li>
					<ul role="list" class="-mx-2 space-y-1">
						<li v-for="item in navigationSidebar_1primaryNav" :key="item.id">
							<SidebarNavPill
								:to="item.to"
								:icon="item.icon"
								@navigated="emit('navigated')"
							>
								{{ item.label }}
							</SidebarNavPill>
						</li>
					</ul>
				</li>
				<li v-if="navigationSidebar_2items?.length">
					<div
						v-if="navigationSidebar_2items_Title"
						class="text-xs/6 font-semibold text-gray-400"
					>
						{{ navigationSidebar_2items_Title }}
					</div>
					<ul role="list" class="-mx-2 mt-2 space-y-1">
						<li v-for="item in navigationSidebar_2items" :key="item.id">
							<SidebarNavPill
								:to="item.to"
								:icon="item.icon"
								@navigated="emit('navigated')"
							>
								<span class="flex size-6 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
									{{ item.label.charAt(0).toUpperCase() }}
								</span>
								<span class="truncate">{{ item.label }}</span>
							</SidebarNavPill>
						</li>
					</ul>
				</li>
				<li class="mt-auto">
					<ul role="list" class="-mx-2 space-y-1">
						<li v-for="item in navigationSidebar_3" :key="item.id">
							<SidebarNavPill
								:to="item.to"
								:icon="item.icon"
								@navigated="emit('navigated')"
							>
								<span v-if="item.id === 'guest.guest-pages.home'">
									<span aria-hidden="true">&larr; </span>
									<span>Back to homepage</span>
								</span>
								<span v-else>{{ item.label }}</span>
							</SidebarNavPill>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
	</div>
</template>