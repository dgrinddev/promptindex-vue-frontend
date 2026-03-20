<script setup lang="ts">
  import { APP_NAME } from '@/config/env'
</script>

<template>
  <div class="relative isolate px-6 pt-14 lg:px-8">
    <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div class="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
    </div>
    <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div class="hidden sm:mb-8 sm:flex sm:justify-center">
        <div class="relative rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
          <span>🚀 Discover and share the best AI prompts on {{ APP_NAME + '. ' }}</span>
          <RouterLink
            :to="{ name: 'guest.guest-pages.learn-more' }"
            class="font-semibold text-indigo-400"
          >
            <span class="absolute inset-0" aria-hidden="true"></span>
            <span>Read more </span>
            <span aria-hidden="true">&rarr;</span>
          </RouterLink>
        </div>
      </div>
      <div class="text-center">
        <h1 class="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">Where great AI prompts are shared</h1>
        <!--
        <p class="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.</p>
        -->
        <p class="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">{{ APP_NAME }} is a community-driven platform where creators share powerful prompts for ChatGPT, Midjourney, Claude and more.</p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <RouterLink
            :to="{ name: 'auth.register' }"
            class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Start publishing prompts
          </RouterLink>
          <RouterLink
            :to="{ name: 'guest.prompts.index' }"
            class="text-sm/6 font-semibold text-white"
          >
            Explore prompts <span aria-hidden="true">→</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-gray-900 py-24 sm:py-32">
    <div class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
      <h2 class="text-center text-base/7 font-semibold text-indigo-400">Features</h2>
      <p class="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">Discover, share and use AI prompts</p>
      <div class="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
        <div class="relative lg:row-span-2">
          <div class="absolute inset-px rounded-lg bg-gray-800 lg:rounded-l-4xl"></div>
          <div class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
            <div class="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
              <p class="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Built for every device</p>
              <p class="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">Access {{ APP_NAME }} from any modern web browser. Fully responsive and designed for desktop, tablet and mobile.</p>
            </div>
            <div class="flex flex-1 items-end justify-center px-8 pt-10 sm:px-10">
              <img class="w-full max-lg:max-w-xs" src="/images/views/guest/GuestHomeView/mobile.png" alt="" />
            </div>
          </div>
          <div class="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 lg:rounded-l-4xl"></div>
        </div>
        <div class="relative max-lg:row-start-1">
          <div class="absolute inset-px rounded-lg bg-gray-800 max-lg:rounded-t-4xl"></div>
          <div class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
            <div class="px-8 pt-8 sm:px-10 sm:pt-10 max-lg:pb-12 lg:pb-2">
              <p class="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Explore prompts</p>
              <p class="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">Browse a growing library of prompts shared by creators around the world.</p>
            </div>
          </div>
          <div class="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-t-4xl"></div>
        </div>
        <div class="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
          <div class="absolute inset-px rounded-lg bg-gray-800"></div>
          <div class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
            <div class="px-8 pt-8 sm:px-10 sm:pt-10 max-lg:pb-6 lg:pb-2">
              <p class="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">One-click prompt copy</p>
              <p class="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">Copy any prompt with a single click and start using it in your favorite AI tools.</p>
            </div>
          </div>
          <div class="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15"></div>
        </div>
        <div class="relative lg:row-span-2">
          <div class="absolute inset-px rounded-lg bg-gray-800 max-lg:rounded-b-4xl lg:rounded-r-4xl"></div>
          <div class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
            <div class="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
              <p class="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Share your own prompts</p>
              <p class="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">Create prompts to share them with the community.</p>
            </div>
            <div class="flex flex-1 items-end justify-end pl-8 pt-10 sm:pl-10">
              <img class="w-full max-lg:max-w-xs" src="/images/views/guest/GuestHomeView/tablet.png" alt="" />
            </div>
          </div>
          <div class="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-b-4xl lg:rounded-r-4xl"></div>
        </div>
      </div>
    </div>
  </div>
</template>