<script setup lang="ts">
import { useRouter } from 'vue-router'
import CreateTradeForm from '@/components/domain/CreateTradeForm.vue'

const router = useRouter()

function onSuccess() {
  router.push('/')
}
</script>

<template>
  <div class="page">
    <h1 class="page-title">Criar solicitação de troca</h1>
    <CreateTradeForm @success="onSuccess" />
  </div>
</template>

<style scoped>
.page {
  max-width: 960px;
  margin: 0 auto;
  padding: var(--space-page-y) var(--space-page-x);
}
.page-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-5);
  line-height: var(--line-height-tight);
}
</style>
