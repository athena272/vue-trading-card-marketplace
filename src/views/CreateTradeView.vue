<script setup lang="ts">
import { useRouter } from 'vue-router'
import CreateTradeForm from '@/components/CreateTradeForm.vue'

const router = useRouter()

function onSuccess() {
  router.push('/')
}
</script>

<template>
  <div class="create-trade">
    <h1>Criar solicitação de troca</h1>
    <CreateTradeForm @success="onSuccess" />
  </div>
</template>

<style scoped>
.create-trade {
  max-width: 700px;
  margin: 0 auto;
}
h1 {
  margin-bottom: 1.5rem;
}
</style>
