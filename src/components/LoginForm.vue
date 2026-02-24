<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'

const emit = defineEmits<{ success: [] }>()
const authStore = useAuthStore()
const serverError = ref<string | null>(null)

const schema = yup.object({
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha é obrigatória'),
})

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schema,
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  serverError.value = null
  try {
    await authStore.login({ email: values.email, password: values.password })
    emit('success')
  } catch (e: unknown) {
    serverError.value = e instanceof Error ? e.message : 'Falha ao entrar'
  }
})
</script>

<template>
  <form class="form" @submit="onSubmit">
    <p v-if="serverError" class="error">{{ serverError }}</p>
    <div class="field">
      <label for="login-email">E-mail</label>
      <input
        id="login-email"
        v-model="email"
        v-bind="emailAttrs"
        type="email"
        autocomplete="email"
      />
      <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
    </div>
    <div class="field">
      <label for="login-password">Senha</label>
      <input
        id="login-password"
        v-model="password"
        v-bind="passwordAttrs"
        type="password"
        autocomplete="current-password"
      />
      <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
    </div>
    <button type="submit" class="btn-submit">Entrar</button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.error {
  color: #f88;
  font-size: 0.9rem;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.field label {
  font-size: 0.9rem;
}
.field input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #555;
  border-radius: 4px;
  background: #333;
  color: inherit;
}
.field-error {
  font-size: 0.85rem;
  color: #f88;
}
.btn-submit {
  padding: 0.6rem 1rem;
  background: #0a7;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-weight: 600;
}
.btn-submit:hover {
  background: #0b8;
}
</style>
