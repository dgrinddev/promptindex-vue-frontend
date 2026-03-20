<script setup lang="ts">
  import StringInput from '@/components/inputs/StringInput.vue'
  import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
  import { onMounted, ref } from 'vue'
  import { useAuthStore } from '@/stores/authStore'
  import { useErrorsStore } from '@/stores/errorsStore'
  import type { LoginPayload } from '@/types/auth.types'

  const authStore = useAuthStore()
  const errorsStore = useErrorsStore()

  const data = ref<LoginPayload>({
    email: '',
    password: '',
  })

  onMounted(() => {
    errorsStore.clear()
  })
</script>

<template>
  <form @submit.prevent="authStore.login(data)" class="space-y-6">
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
      autocomplete="current-password"
    />

    <PrimaryButton
      type="submit"
      class="w-full"
      id="submit_btn"
    >
      Sign in
    </PrimaryButton>
  </form>
</template>