<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Analytics } from '@vercel/analytics/vue';
import AppLayout from '@/components/AppLayout.vue'
</script>

<template>
  <Analytics />
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>
