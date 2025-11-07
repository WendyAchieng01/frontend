<template>
  <div>
    <h1 class="text-h4 font-weight-medium">Check your email</h1>

    <p class="text-subtitle-1 mt-7">Open mail app to verify</p>

    <!-- <v-btn
      text="Open email app"
      class="text-subtitle-2 mt-7"
      size="large"
      type="submit"
      block
      :to="{ path: '/auth/password-reset-confirm' }"
    /> -->

    <p v-if="showResendButton" class="text-subtitle-1 mt-7">
      Didn't receive the email?
      <NuxtLink class="text-error" @click="resendEmailResetLink"
        >Click to resend</NuxtLink
      >
    </p>

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

const showResendButton = ref(true);
const route = useRoute();
async function resendEmailResetLink() {
  showResendButton.value = false;
  try {
    await authStore.requestPasswordReset({
      email: route.query.email as string,
    });
    navigateTo("/auth/reset-link-success");
  } catch (error: any) {
    const backendErrors = error.response?._data;

    if (backendErrors) {
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
