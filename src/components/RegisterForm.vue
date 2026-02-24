<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useAuthStore } from "@/stores/authStore";
import { ref } from "vue";
import { Eye, EyeOff } from "lucide-vue-next";

const emit = defineEmits<{ success: [] }>();
const authStore = useAuthStore();
const serverError = ref<string | null>(null);
const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const schema = yup.object({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .min(2, "Nome deve ter ao menos 2 caracteres"),
  email: yup.string().required("E-mail é obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "Senha deve ter ao menos 6 caracteres"),
});

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");

const onSubmit = handleSubmit(async (values) => {
  serverError.value = null;
  try {
    await authStore.register({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    emit("success");
  } catch (e: unknown) {
    serverError.value = e instanceof Error ? e.message : "Falha ao registrar";
  }
});
</script>

<template>
  <form class="form" @submit="onSubmit">
    <p v-if="serverError" class="error">{{ serverError }}</p>
    <div class="field">
      <label for="reg-name">Nome</label>
      <input
        id="reg-name"
        v-model="name"
        v-bind="nameAttrs"
        type="text"
        autocomplete="name"
      />
      <span v-if="errors.name" class="field-error">{{ errors.name }}</span>
    </div>
    <div class="field">
      <label for="reg-email">E-mail</label>
      <input
        id="reg-email"
        v-model="email"
        v-bind="emailAttrs"
        type="email"
        autocomplete="email"
      />
      <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
    </div>
    <div class="field">
      <label for="reg-password">Senha</label>

      <div class="password-wrapper">
        <input
          id="reg-password"
          v-model="password"
          v-bind="passwordAttrs"
          :type="showPassword ? 'text' : 'password'"
          autocomplete="current-password"
          :aria-invalid="Boolean(errors.password)"
          :aria-describedby="
            errors.password ? 'reg-password-error' : undefined
          "
        />

        <button
          type="button"
          class="toggle-password"
          :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
          :aria-pressed="showPassword"
          @click="togglePassword"
        >
          <Eye v-if="!showPassword" class="icon" />
          <EyeOff v-else class="icon" />
        </button>
      </div>

      <span
        v-if="errors.password"
        :id="'reg-password-error'"
        class="field-error"
      >
        {{ errors.password }}
      </span>
    </div>
    <button type="submit" class="btn-submit">Registrar</button>
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

.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-wrapper input {
  width: 100%;
  padding-right: 2.5rem;
}

.toggle-password {
  position: absolute;
  right: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #0a7;
  padding: 0;
}

.toggle-password:hover {
  color: #aaa;
}

.toggle-password:focus-visible {
  outline: 2px solid #0a7;
  border-radius: 4px;
}

.icon {
  width: 20px;
  height: 20px;
}
</style>
