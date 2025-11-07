<template>
  <div>
    <h1 class="text-h4 font-weight-medium">Create an account</h1>

    <v-form class="mt-5" @submit.prevent="createAccount">
      <template #default>
        <v-text-field
          v-model="createForm.user.username"
          label="Username"
          placeholder="Enter your username"
          :rules="[required]"
          :error-messages="createFormErrors.user?.username"
        />
        <v-text-field
          v-model="createForm.user.email"
          label="Email Address"
          placeholder="Enter your email address"
          type="email"
          :rules="[required, emailFormat]"
          :error-messages="createFormErrors.user?.email"
        />
        <div class="d-flex ga-sm-2 flex-column flex-sm-row">
          <v-text-field
            v-model="createForm.user.first_name"
            label="First Name"
            placeholder="Enter your first name"
            type="text"
            :rules="[required]"
            :error-messages="createFormErrors.user?.first_name"
          />
          <v-text-field
            v-model="createForm.user.last_name"
            label="Last Name"
            placeholder="Enter your last name"
            type="text"
            :rules="[required]"
            :error-messages="createFormErrors.user?.last_name"
          />
        </div>
        <v-text-field
          v-model="createForm.password"
          label="Password"
          placeholder="Enter your password"
          :type="showPassword ? 'text' : 'password'"
          :rules="passwordRules"
          :append-inner-icon="
            showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-eye-outline'
          "
          :error-messages="createFormErrors.password"
          @click:append-inner="showPassword = !showPassword"
        />
        <v-text-field
          v-model="createForm.password_confirmation"
          label="Confirm Password"
          placeholder="Re-nter your password"
          :type="showPassword ? 'text' : 'password'"
          :rules="[mustMatch(() => createForm.password, 'Passwords')]"
          :append-inner-icon="
            showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
          "
          :error-messages="createFormErrors.password_confirmation"
          @click:append-inner="showPassword = !showPassword"
        />

        <v-btn
          text="Create Account"
          class="mt-5 text-subtitle-2"
          size="large"
          type="submit"
          block
          :loading="authStore.isLoading"
        />
      </template>
    </v-form>

    <!-- social auth -->
    <v-row no-gutters class="mt-7">
      <div class="d-flex w-100 align-center ga-3">
        <v-divider />
        <p>Or</p>
        <v-divider />
      </div>
    </v-row>

    <div class="mt-5" id="googleBtn" style="width: 100%;"></div>


    <p class="text-subtitle-1 mt-5">
      Already have an account?
      <NuxtLink to="/auth/login" class="font-weight-medium">Login</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "~/store/auth";
import { useAppStore } from "~/store/app";
import type { IRegisterPayload } from "~/types/auth";
import { useGoogleAuth } from "~/composables/useGoogleAuth"

const { accountType } = defineProps<{
  accountType: "client" | "freelancer";
}>();

const showPassword = ref(false);
const authStore = useAuthStore();
const appStore = useAppStore();
const { renderGoogleButton } = useGoogleAuth("register", accountType);

// form helpers (unchanged)
const {
  form: createForm,
  reset: resetCreateForm,
  errors: createFormErrors,
  setErrors,
  clearErrors,
} = useForm<IRegisterPayload>({
  user: {
    username: "",
    email: "",
    first_name: "",
    last_name: "",
  },
  user_type: accountType,
  password: "",
  password_confirmation: "",
});

async function createAccount() {
  clearErrors();

  try {
    await authStore.register({ ...createForm });

    // On successful registration:
    appStore.showSnackBar({
      message: "Account created successfully!",
      type: "success",
    });
    resetCreateForm();
    navigateTo("/auth/login");
  } catch (error: any) {
    console.error("Account creation error:", error);

    const backendErrors = error.response?._data;

    if (backendErrors) {
      console.log(backendErrors);
      setErrors(backendErrors);

      const generalErrorMessage =
        backendErrors.detail ||
        backendErrors.non_field_errors?.[0] ||
        "Failed to create account. Please check your inputs.";
      appStore.showSnackBar({ message: generalErrorMessage, type: "error" });
    } else {
      appStore.showSnackBar({
        message: "An unexpected error occurred. Please try again.",
        type: "error",
      });
    }
  }
}

onMounted(() => {
  renderGoogleButton("googleBtn");
});

</script>

