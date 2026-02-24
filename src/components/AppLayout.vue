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
  padding: var(--space-4) var(--space-5);
  background: var(--color-bg-elevated);
  border-bottom: 1px solid var(--color-border);
}
.logo {
  font-weight: var(--font-weight-bold);
  font-size: var(--text-xl);
}
.nav {
  display: flex;
  align-items: center;
  gap: var(--space-5);
}
.nav a.router-link-active {
  text-decoration: underline;
}
.user {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}
.btn-logout {
  padding: var(--space-2) var(--space-3);
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: background-color var(--transition-fast), border-color var(--transition-fast);
}
.btn-logout:hover {
  background: var(--color-border);
  border-color: var(--color-border-strong);
}
.main {
  flex: 1;
  padding: var(--space-5);
}
</style>
