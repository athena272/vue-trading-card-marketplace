<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { user, isAuthenticated } = storeToRefs(authStore)
</script>

<template>
  <div class="layout">
    <header class="header">
      <RouterLink :to="{ name: 'Home' }" class="logo">Marketplace Cartas</RouterLink>
      <nav class="nav">
        <RouterLink :to="{ name: 'Home' }">Início</RouterLink>
        <template v-if="isAuthenticated">
          <RouterLink :to="{ name: 'MyCards' }">Minhas cartas</RouterLink>
          <RouterLink :to="{ name: 'CreateTrade' }">Criar troca</RouterLink>
          <span class="user">{{ user?.name }}</span>
          <button type="button" class="btn-logout" @click="authStore.logout">Sair</button>
        </template>
        <template v-else>
          <RouterLink :to="{ name: 'Login' }">Entrar</RouterLink>
          <RouterLink :to="{ name: 'Register' }">Registrar</RouterLink>
        </template>
      </nav>
    </header>
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: #1a1a1a;
  border-bottom: 1px solid #333;
}
.logo {
  font-weight: 700;
  font-size: 1.25rem;
}
.nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.nav a.router-link-active {
  text-decoration: underline;
}
.user {
  color: #888;
  font-size: 0.9rem;
}
.btn-logout {
  padding: 0.35rem 0.75rem;
  background: #444;
  border: 1px solid #555;
  border-radius: 4px;
  color: inherit;
}
.btn-logout:hover {
  background: #555;
}
.main {
  flex: 1;
  padding: 1.5rem;
}
</style>
