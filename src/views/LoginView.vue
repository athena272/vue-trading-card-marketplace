<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import LoginForm from '@/components/LoginForm.vue'

const router = useRouter()
const route = useRoute()

async function onSuccess() {
  const redirect = (route.query.redirect as string) || '/'
  await router.push(redirect)
}
</script>

<template>
  <div class="auth-page">
    <h1>Entrar</h1>
    <LoginForm @success="onSuccess" />
  </div>
</template>

<style scoped>
.auth-page {
  max-width: 400px;
  margin: 0 auto;
}
h1 {
  margin-bottom: 1.5rem;
}
</style>
