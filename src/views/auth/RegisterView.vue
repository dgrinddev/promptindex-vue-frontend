<script setup lang="ts">
  import StringInput from '@/components/inputs/StringInput.vue'
  import CheckboxInput from '@/components/inputs/CheckboxInput.vue'
  import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
  import { onMounted, ref } from 'vue'
  import { useAuthStore } from '@/stores/authStore'
  import { useErrorsStore } from '@/stores/errorsStore'
  import type { RegisterPayload } from '@/types/auth.types'

  const authStore = useAuthStore()
  const errorsStore = useErrorsStore()

  const data = ref<RegisterPayload>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    accept_terms: false,
  })

  onMounted(() => {
    errorsStore.clear()
  })
</script>

<template>
  <form @submit.prevent="authStore.register(data)" class="space-y-6">
    <StringInput
      id="name"
      name="name"
      v-model="data.name"
      label="Username (lowercase letters, numbers, underscores)"
      type="text"
      autofocus
      required
      placeholder="my_example_user123"
    />

    <StringInput
      id="email"
      name="email"
      v-model="data.email"
      label="Email address"
      type="email"
      required
      autocomplete="email"
    />

    <StringInput
      id="password"
      name="password"
      v-model="data.password"
      label="Password"
      type="password"
      required
      autocomplete="new-password"
    />

    <StringInput
      id="password_confirmation"
      name="password_confirmation"
      v-model="data.password_confirmation"
      label="Confirm password"
      type="password"
      required
      autocomplete="new-password"
    />

    <CheckboxInput
      id="accept_terms"
      name="accept_terms"
      v-model="data.accept_terms"
      required
      root-class="mt-6 space-y-6"
    >
      <span>I accept the </span>
      <RouterLink
        :to="{ name: 'guest.guest-pages.cookies-and-privacy-policy' }"
        class="font-semibold text-indigo-400 hover:text-indigo-300"
        target="_blank"
      >
        Cookies &amp; Privacy Policy
      </RouterLink>
      <br>
      <span>and </span>
      <RouterLink
        :to="{ name: 'guest.guest-pages.terms-of-use' }"
        class="font-semibold text-indigo-400 hover:text-indigo-300"
        target="_blank"
      >
        Terms of Use
      </RouterLink>
    </CheckboxInput>

    <PrimaryButton
      type="submit"
      class="w-full"
      id="submit_btn"
    >
      Create account
    </PrimaryButton>
  </form>
</template>