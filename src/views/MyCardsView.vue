<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserCardsStore } from '@/stores/userCardsStore'
import CardGrid from '@/components/CardGrid.vue'
import AddCardsForm from '@/components/AddCardsForm.vue'
import AppLoader from '@/components/AppLoader.vue'

const userCardsStore = useUserCardsStore()

onMounted(() => {
  userCardsStore.fetchCards().catch(() => {})
})
</script>

<template>
  <div class="my-cards">
    <h1>Minhas cartas</h1>
    <AddCardsForm class="add-form" />
    <p v-if="userCardsStore.error" class="error">{{ userCardsStore.error }}</p>
    <AppLoader v-if="userCardsStore.loading" message="Carregando suas cartas..." />
    <CardGrid v-else :cards="userCardsStore.cards" empty-message="Você ainda não tem cartas." />
  </div>
</template>

<style scoped>
.my-cards {
  max-width: 900px;
  margin: 0 auto;
}
h1 {
  margin-bottom: 1rem;
}
.add-form {
  margin-bottom: 1.5rem;
}
.error {
  color: #f88;
  margin-bottom: 1rem;
}
</style>
