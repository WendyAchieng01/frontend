<template>
  <div>
    <p class="text-h5">Account Settings</p>

    <!-- Account Visibility -->
    <div class="pa-4 d-flex justify-space-between align-center border mt-5 rounded">
      <div>
        <p class="text-subtitle-1 text-sm-h6">Make Account Visible</p>
        <p class="text-subtitle-2 text-sm-subtitle-1">
          Your account will be disabled and not be seen in public.
        </p>
      </div>

      <v-switch
        v-model="form.is_visible"
        color="primary"
        inset
        :loading="isTogglingVisibility"
        @update:model-value="toggleVisibility"
      />
    </div>

    <!-- Change Name -->
    <div class="pa-4 d-flex justify-space-between align-center border mt-2 rounded">
      <div>
        <p class="text-subtitle-1 text-sm-h6">Full Name</p>
        <p class="text-subtitle-2 text-sm-subtitle-1">
          {{ profileStore.profile?.full_name }}
        </p>
      </div>

      <div>
        <div class="d-flex justify-end">
          <v-btn text="Change" size="large" disabled />
        </div>
        <p class="text-caption mt-1">Reach us via mail to change your name.</p>
      </div>
    </div>

    <!-- Change Email Address -->
    <div class="pa-4 d-flex justify-space-between align-center border mt-2 rounded">
      <div>
        <p class="text-subtitle-1 text-sm-h6">Email Address</p>
        <p class="text-subtitle-2 text-sm-subtitle-1">
          {{ profileStore.profile?.profile?.user?.email }}
        </p>
      </div>

      <v-btn text="Change" size="large" @click="changeEmailDialog = true" />
    </div>

    <!-- Change password -->
    <div class="pa-4 d-flex justify-space-between align-center border mt-2 rounded">
      <div>
        <p class="text-subtitle-1 text-sm-h6">Password</p>
        <p class="text-subtitle-2 text-sm-subtitle-1">Change your password.</p>
      </div>

      <v-btn text="Change" size="large" @click="changePasswordDialog = true" />
    </div>

    <!-- Delete account -->
    <div class="pa-4 d-flex justify-space-between align-center border mt-2 rounded">
      <div>
        <p class="text-subtitle-1 text-sm-h6">Account Deletion</p>
        <p class="text-subtitle-2 text-sm-subtitle-1">
          Permanently delete your account, posts and comments.
        </p>
      </div>

      <v-btn
        text="Delete"
        size="large"
        color="error"
        @click="deleteAccountDialog = true"
      />
    </div>

    <!-- Change Email Dialog -->
    <AppDialog
      v-model="changeEmailDialog"
      title="Change Email"
      subtitle="Enter a new email address to update your account."
      action-button-text="Save"
      :loading="profileStore.isLoading"
      @action-button-click="saveDetails"
    >
      <p class="text-subtitle-1">Enter New Email</p>
      <v-text-field
        v-model="form.email"
        placeholder="Email"
        type="email"
        :error-messages="errors.email"
      />
    </AppDialog>

    <!-- Change Password Dialog -->
    <AppDialog
      v-model="changePasswordDialog"
      title="Change Password"
      subtitle="Enter and confirm your new password to change your account password."
      action-button-text="Save"
      :loading="isChangingPassword"
      @action-button-click="changePassword"
    >
      <v-form>
        <!-- <p class="text-subtitle-1">Old Password</p>
        <v-text-field
          v-model="changePasswordForm.old_password"
          type="password"
          placeholder="Old Password"
          :error-messages="changePasswordErrors.old_password"
        /> -->
        <p class="text-subtitle-1">New Password</p>
        <v-text-field
          v-model="changePasswordForm.new_password"
          type="password"
          placeholder="New Password"
          :error-messages="changePasswordErrors.new_password"
        />
        <p class="text-subtitle-1">Confirm New Password</p>
        <v-text-field
          v-model="changePasswordForm.confirm_new_password"
          type="password"
          placeholder="Confirm New Password"
          :error-messages="changePasswordErrors.confirm_new_password"
        />
      </v-form>
    </AppDialog>

    <!-- Delete Account Dialog -->
    <AppDialog
      v-model="deleteAccountDialog"
      title="Delete your Account"
      subtitle="Deleting your account is permanent and you cannot get it back. Are you sure?"
      action-button-text="Delete"
      action-button-color="error"
      :loading="isDeletingAccount"
      @action-button-click="deleteProfile"
    >
      <v-alert
        type="error"
        text="You will not be able to recover your account"
        variant="tonal"
      />

      <v-form class="mt-3">
        <p class="text-subtitle-1">Enter Password to delete your Account</p>
        <v-text-field
          v-model="deleteAccountForm.password"
          type="password"
          placeholder="Password"
          :error-messages="deleteAccountErrors.password"
        />
        <p class="text-subtitle-1">Confirm Password</p>
        <v-text-field
          v-model="deleteAccountForm.confirm_password"
          type="password"
          placeholder="Confirm Password"
          :error-messages="deleteAccountErrors.confirm_password"
        />
      </v-form>
    </AppDialog>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app";
import { useAuthStore } from "~/store/auth";
import { useFreelancerProfileStore } from "~/store/freelancer/profile";
import type { IFreelancerProfileUpdatePayload } from "~/types/freelancer";
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: "freelancer",
});

const authStore = useAuthStore();
const profileStore = useFreelancerProfileStore();
const appStore = useAppStore();

// get user profile
onMounted(async () => {
  await profileStore.fetchFreelancerProfile();
  if (profileStore.profile) {
    // Map data from the API response to the new flat form structure
    form.phone = profileStore.profile.profile.phone;
    form.location = profileStore.profile.profile.location;
    form.bio = profileStore.profile.profile.bio;
    form.experience_years = profileStore.profile.experience_years ?? 0;
    form.hourly_rate = parseFloat(profileStore.profile.hourly_rate) ?? 0;
    form.availability = profileStore.profile.availability ?? "full_time";
    form.is_visible = !!profileStore.profile.is_visible;
    form.languages = profileStore.profile.languages || [];
    form.skills = profileStore.profile.skills || [];
    form.portfolio_link = profileStore.profile.portfolio_link || "";
  }
});

const { form, errors, clearErrors, setErrors } = useForm<Partial<IFreelancerProfileUpdatePayload>>({
  phone: "",
  location: "",
  bio: "",
  experience_years: 0,
  availability: "full_time",
  skills: [],
  languages: [],
  is_visible: false,
  hourly_rate: 0,
});

// toggle visibility
const isTogglingVisibility = ref(false);
async function toggleVisibility() {
  isTogglingVisibility.value = true;
  await saveDetails().finally(() => (isTogglingVisibility.value = false));
}

// change email
const changeEmailDialog = ref(false);

// change password
const changePasswordDialog = ref(false);
const isChangingPassword = ref(false);
const { form: changePasswordForm, errors: changePasswordErrors, clearErrors: clearPasswordErrors, setErrors: setPasswordErrors } = useForm({
  old_password: "",
  new_password: "",
  confirm_new_password: "",
});
async function changePassword() {
  clearPasswordErrors();
  // Basic front-end validation
  if (changePasswordForm.new_password !== changePasswordForm.confirm_new_password) {
    setPasswordErrors({ new_password: "Passwords do not match.", confirm_new_password: "Passwords do not match." });
    appStore.showSnackBar({ message: "New passwords do not match.", type: "error" });
    return;
  }
  isChangingPassword.value = true;
  // Assuming a changePassword method on the authStore
  try {
    await authStore.changePassword(changePasswordForm);
    appStore.showSnackBar({ message: "Password changed successfully.", type: "success" });
    changePasswordDialog.value = false;
  } catch (error: any) {
    const backendErrors = error.response?._data;
    if (backendErrors) {
      setPasswordErrors(backendErrors);
      const generalErrorMessage = backendErrors.detail || "Unable to change password. Please try again";
      appStore.showSnackBar({ message: generalErrorMessage, type: "error" });
    } else {
      appStore.showSnackBar({ message: "An unexpected error occurred. Please try again.", type: "error" });
    }
  } finally {
    isChangingPassword.value = false;
  }
}

// delete account
const deleteAccountDialog = ref(false);
const isDeletingAccount = ref(false);
const { form: deleteAccountForm, errors: deleteAccountErrors, clearErrors: clearDeleteErrors, setErrors: setDeleteErrors } = useForm({
  password: "",
  confirm_password: "",
});
async function deleteProfile() {
  clearDeleteErrors();
  // Basic front-end validation
  if (deleteAccountForm.password !== deleteAccountForm.confirm_password) {
    setDeleteErrors({ password: "Passwords do not match.", confirm_password: "Passwords do not match." });
    appStore.showSnackBar({ message: "Passwords do not match.", type: "error" });
    return;
  }
  if (!authStore.user) return;
  isDeletingAccount.value = true;
  // Assuming a deleteUser method that takes the password for re-authentication
  try {
    await authStore.deleteUser(deleteAccountForm.password);
    appStore.showSnackBar({ message: "Account deleted successfully.", type: "success" });
  } catch (error: any) {
    const backendErrors = error.response?._data;
    if (backendErrors) {
      setDeleteErrors(backendErrors);
      const generalErrorMessage = backendErrors.detail || "Unable to delete account. Please try again";
      appStore.showSnackBar({ message: generalErrorMessage, type: "error" });
    } else {
      appStore.showSnackBar({ message: "An unexpected error occurred. Please try again.", type: "error" });
    }
  } finally {
    isDeletingAccount.value = false;
  }
}

// Save details
async function saveDetails() {
  clearErrors();
  if (!authStore.user) return;
  try {
    await profileStore.updateFreelancerProfile(form);
    appStore.showSnackBar({ message: "Details saved successfully.", type: "success" });
    changeEmailDialog.value = false;
  } catch (error: any) {
    const backendErrors = error.response?._data;
    if (backendErrors) {
      setErrors(backendErrors);
      const generalErrorMessage =
        backendErrors.detail ||
        backendErrors.non_field_errors?.[0] ||
        "Unable to save details. Please try again";
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
