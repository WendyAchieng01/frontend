<template>
  <div>
    <h1 class="text-h4 font-weight-medium">Forgot Password</h1>

    <p class="text-subtitle-1 mt-7">
      No worries, we'll send you reset instructions.
    </p>

    <v-form class="mt-5" @submit.prevent="sendEmailResetLink">
      <template #default="{ isValid }">
        <v-text-field
          v-model="form.email"
          label="Email Address"
          placeholder="Enter your email address"
          type="email"
          :rules="[required, emailFormat]"
          :error-messages="errors.email"
        />

        <v-btn
          text="Reset Password"
          class="text-subtitle-2"
          size="large"
          type="submit"
          block
          :loading="authStore.isLoading"
          :disabled="!isValid.value"
        />
      </template>
    </v-form>

    <!-- go back -->
    <v-btn
      class="mt-5"
      text="Back to log in"
      size="small"
      variant="text"
      prepend-icon="mdi-arrow-left"
      :to="{ path: '/auth/login' }"
    />
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app";
import { useAuthStore } from "~/store/auth";

definePageMeta({
  layout: "auth",
});

const appStore = useAppStore();
const authStore = useAuthStore();
const { form, errors, reset, setErrors, clearErrors } = useForm({
  email: "",
});

async function sendEmailResetLink() {
  clearErrors();
  try {
    await authStore.requestPasswordReset(form);
    navigateTo({
      path: "/auth/reset-link-success",
      query: {
        email: form.email,
      },
    });
    reset();
  } catch (error: any) {
    const backendErrors = error.response?._data;

    if (backendErrors) {
      setErrors(backendErrors);

      const generalErrorMessage =
        backendErrors.detail ||
        backendErrors.non_field_errors?.[0] ||
        "Failed. Please try again.";
      appStore.showSnackBar({ message: generalErrorMessage, type: "error" });
    } else {
      appStore.showSnackBar({
        message: "An unexpected error occurred. Please try again.",
        type: "error",
      });
    }
  }
}
</script>
