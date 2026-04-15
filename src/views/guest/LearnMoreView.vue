<script setup lang="ts">
  import { UserPlusIcon as UserPlusIconSolid } from '@heroicons/vue/20/solid'
  import { MagnifyingGlassCircleIcon as MagnifyingGlassCircleIconSolid } from '@heroicons/vue/20/solid'
  import { ClipboardDocumentCheckIcon as ClipboardDocumentCheckIconSolid } from '@heroicons/vue/20/solid'

  import { APP_NAME } from '@/config/env'
</script>

<template>
  <div class="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <svg class="absolute top-0 left-[max(50%,25rem)] h-256 w-512 -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-gray-800" aria-hidden="true">
        <defs>
          <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-1" class="overflow-visible fill-gray-800/50">
          <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" stroke-width="0" />
        </svg>
        <rect width="100%" height="100%" stroke-width="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
      </svg>
    </div>
    <div class="mx-auto max-w-2xl gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:items-start lg:gap-y-10">
      <div class="lg:mx-auto lg:w-full lg:max-w-7xl lg:gap-x-8 lg:px-8">
        <div class="lg:pr-4">
          <div class="lg:max-w-lg">
            <p class="text-base/7 font-semibold text-indigo-400">Get started</p>
            <h1 class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">From zero to prompting in minutes</h1>
            <p class="mt-6 text-xl/8 text-gray-300 text-pretty">{{ APP_NAME }} is the easiest way to discover, copy and share AI prompts for ChatGPT, Midjourney, Claude and more.</p>
          </div>
        </div>
      </div>
      <div class="lg:mx-auto lg:w-full lg:max-w-7xl lg:gap-x-8 lg:px-8">
        <div class="lg:pr-4">
          <div class="max-w-xl text-base/7 text-gray-400 lg:max-w-lg">
            <p class="text-pretty">No setup required. Just create a free account and start exploring prompts shared by creators around the world. When you find something you love, copy it with one click and use it straight away.</p>
            <ul role="list" class="mt-8 space-y-8 text-gray-400">
              <li class="flex gap-x-3">
                <UserPlusIconSolid class="mt-1 size-5 flex-none text-indigo-400" aria-hidden="true" />
                <span><strong class="font-semibold text-white">Create a free account.</strong> Sign up in seconds. Free forever.</span>
              </li>
              <li class="flex gap-x-3">
                <MagnifyingGlassCircleIconSolid class="mt-1 size-5 flex-none text-indigo-400" aria-hidden="true" />
                <span><strong class="font-semibold text-white">Explore the prompt library.</strong> Discover prompts for ChatGPT, Midjourney, Claude and more, all in one place.</span>
              </li>
              <li class="flex gap-x-3">
                <ClipboardDocumentCheckIconSolid class="mt-1 size-5 flex-none text-indigo-400" aria-hidden="true" />
                <span><strong class="font-semibold text-white">Copy, use and share.</strong> Copy any prompt instantly or publish your own for the community to discover.</span>
              </li>
            </ul>
            <p class="mt-8">Whether you're a seasoned AI user or just getting started, {{ APP_NAME }} is built to help you get more out of every AI tool you use.</p>
            <h2 class="mt-16 text-2xl font-bold tracking-tight text-white">Frequently asked questions</h2>
            <dl class="mt-6 space-y-5">
              <div>
                <dt class="font-semibold text-white">Is {{ APP_NAME }} free?</dt>
                <dd class="mt-1">Yes, completely free to use. Create an account and start exploring or publishing prompts right away.</dd>
              </div>
              <div>
                <dt class="font-semibold text-white">Is everything I create on {{ APP_NAME }} public?</dt>
                <dd class="mt-1">{{ APP_NAME }} is built around sharing, that's the whole point. Everything you create on {{ APP_NAME }} is public and visible to everyone. This includes the prompt itself, any images you upload to it, and your username. The only things that stay private are your email address and password, those are never exposed to anyone.</dd>
              </div>
              <div>
                <dt class="font-semibold text-white">Which AI tools are supported?</dt>
                <dd class="mt-1">{{ APP_NAME }} is tool-agnostic. Any AI tool that uses prompts is supported, including ChatGPT, Claude, Midjourney, DALL-E, Stable Diffusion and more, whether you're generating text, images or anything else.</dd>
              </div>
              <div>
                <dt class="font-semibold text-white">Can I control what happens to my prompts after adding them?</dt>
                <dd class="mt-1">You can edit or delete any prompt you have added at any time from your prompt dashboard. However, keep in mind that once a prompt is added, anyone can copy and do whatever they like with it, including republishing it (or any modified versions of it) on {{ APP_NAME }} or elsewhere. Once a prompt has been seen, it is potentially out there forever. By adding a prompt to {{ APP_NAME }}, you effectively give up all ownership and control of it.</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>