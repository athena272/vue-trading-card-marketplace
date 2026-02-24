<script setup lang="ts">
import { useRouter } from 'vue-router'
import RegisterForm from '@/components/RegisterForm.vue'

const router = useRouter()

async function onSuccess() {
  await router.push('/')
}
</script>

<template>
  <div class="auth-page">
    <h1>Registrar</h1>
    <RegisterForm @success="onSuccess" />
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
