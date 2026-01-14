<template>
  <div>
    <h1 class="text-h4 font-weight-medium">Set new Password</h1>

    <p class="text-subtitle-1 mt-7">
      Your new password must be different from previously used passwords
    </p>

    <v-form ref="resetFormElement" class="mt-5" @submit.prevent="resetPassword">
      <template #default="{ isValid }">
        <v-text-field
          v-model="resetPasswordForm.new_password"
          label="New Password"
          placeholder="Create your password"
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="
            showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
          "
          :rules="passwordRules"
          :error-messages="resetPasswordFormErrors.new_password"
          @click:append-inner="showPassword = !showPassword"
        />
        <v-text-field
          v-model="resetPasswordForm.new_password_confirm"
          label="Confirm Password"
          placeholder="Repeat your password"
          :type="showConfirmPassword ? 'text' : 'password'"
          :append-inner-icon="
            showConfirmPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
          "
          :rules="[
            required,
            mustMatch(() => resetPasswordForm.new_password, 'passwords'),
          ]"
          :error-messages="resetPasswordFormErrors.new_password_confirm"
          @click:append-inner="showConfirmPassword = !showConfirmPassword"
        />

        <v-btn
          text="Reset Password"
          class="text-subtitle-2 mt-7"
          size="large"
          type="submit"
          block
          :loading="authStore.isLoading"
          :disabled="!isValid.value"
        />
      </template>
    </v-form>

    <!-- <p class="text-subtitle-1 mt-7">
      Didn't receive the email?
      <NuxtLink class="text-error">Click to resend</NuxtLink>
    </p> -->

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

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const appStore = useAppStore();
const authStore = useAuthStore();
const route = useRoute();

const {
  form: resetPasswordForm,
  errors: resetPasswordFormErrors,
  reset,
  setErrors,
  clearErrors,
} = useForm({
  token: route.query.token as string,
  uid: route.query.uid as string,
  new_password: "",
  new_password_confirm: "",
});

// watch password and revalidate confirm password
/* Solves bug: When the user changes password value so as to match the confirm password value */
const resetFormElement = useTemplateRef("resetFormElement");
watch(
  () => resetPasswordForm.new_password,
  () => {
    if (resetPasswordForm.new_password_confirm) resetFormElement.value?.validate();
  }
);

async function resetPassword() {
  clearErrors();

  try {
    await authStore.confirmPasswordReset(resetPasswordForm);
    reset(["new_password", "new_password_confirm"]);
    navigateTo("/auth/password-reset-success");
  } catch (error: any) {
    const backendErrors = error.response?._data;

    if (backendErrors) {
      setErrors(backendErrors);

      const generalErrorMessage =
        backendErrors.detail ||
        backendErrors.non_field_errors?.[0] ||
        "Failed. Please try again later.";
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
