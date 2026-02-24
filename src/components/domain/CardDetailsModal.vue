<script setup lang="ts">
import { computed } from "vue";
import type { Card } from "@/types";
import AppModal from "@/components/ui/AppModal.vue";
import AppButton from "@/components/ui/AppButton.vue";

const props = defineProps<{
  modelValue: Card | null;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: Card | null): void;
}>();

const isOpen = computed(() => props.modelValue !== null);
const card = computed(() => props.modelValue);

function close() {
  emit("update:modelValue", null);
}
</script>

<template>
  <AppModal :model-value="isOpen" @update:model-value="() => close()">
    <div v-if="card" class="card-details-modal">
      <!-- <button
        class="close-icon"
        type="button"
        aria-label="Fechar"
        @click="close"
      >
        ✕
      </button> -->

      <div class="card-details-image-wrap">
        <img
          v-if="card.imageUrl"
          :src="card.imageUrl"
          :alt="card.name"
          class="card-details-image"
        />
        <div v-else class="card-details-placeholder">Sem imagem</div>
      </div>

      <div class="card-details-body">
        <h2 class="card-details-name">{{ card.name }}</h2>

        <p v-if="card.description" class="card-details-desc">
          {{ card.description }}
        </p>

        <AppButton type="button" variant="danger" class="card-close-button" @click="close">
          Fechar
        </AppButton>
      </div>
    </div>
  </AppModal>
</template>

<style scoped>
.card-details-modal {
  position: relative;
  display: grid;
  gap: var(--space-6);
  width: 100%;
  max-width: 900px;
}

/* Desktop layout */
@media (min-width: 768px) {
  .card-details-modal {
    grid-template-columns: 360px 1fr;
    align-items: start;
  }
}

/* Botão X */
/* .close-icon {
  position: absolute;
  top: -10px;
  right: var(--space-4);

  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  border: 1px solid var(--color-border);

  background: var(--color-bg-subtle);
  color: var(--color-text);

  font-size: 1rem;
  line-height: 1;
  cursor: pointer;

  transition:
    background var(--transition-fast),
    transform var(--transition-fast),
    opacity var(--transition-fast);
}

.close-icon:hover {
  background: var(--color-bg-elevated);
  transform: scale(1.05);
}

.close-icon:active {
  transform: scale(0.95);
} */

/* Imagem */
.card-details-image-wrap {
  width: 100%;
  max-width: 360px;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 2px solid var(--color-border-strong);
}

.card-details-image {
  width: 100%;
  aspect-ratio: 421 / 614;
  object-fit: cover;
  display: block;
}

.card-details-placeholder {
  aspect-ratio: 421 / 614;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-subtle);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

/* Texto */
.card-details-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  justify-content: center;
  height: 100%;
}

.card-details-name {
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-text);
  margin: 0;
}

.card-details-desc {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  line-height: var(--line-height-normal);
  white-space: pre-wrap;
  word-break: break-word;
}

.card-close-button {
  margin-top: auto;
}
</style>
