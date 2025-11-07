<template>
  <div>
    <p class="text-h5">Set Up MPESA Number</p>
    <p class="text-subtitle-1 text-medium-emphasis mt-2">
      Ensure to cross check mpesa number for appropriate disbursment of funds
    </p>

    <v-divider class="my-4" />

    <v-container style="background-color: #f9f9f9">
      <v-row justify="center" class="py-10">
        <v-col cols="12" md="8">
          <v-card flat class="py-5 w-75 mx-auto">
            <template #text>
              <p class="text-h6 text-center">Enter your MPESA number</p>
              <v-form class="mt-10">
                <v-text-field
                  v-model="detailsForm.phone"
                  label="MPESA Phone Number"
                  placeholder="Enter"
                  type="tel"
                  :rules="[required]"
                  :error-messages="detailsFormErrors.pay_id_no"
                />
                <!-- <v-text-field
                  label="Password"
                  type="password"
                  placeholder="Password"
                  :rules="[required]"
                /> -->
                <v-btn
                  text="Set Up MPESA"
                  size="large"
                  class="text-subtitle-1"
                  block
                  :loading="profileStore.isLoading"
                  :disabled="!detailsFormDirty"
                  @click="saveDetails"
                />
                <v-btn
                  text="Cancel"
                  variant="text"
                  size="large"
                  class="text-subtitle-1 mt-3"
                  block
                  :to="{ path: '/freelancer/wallet' }"
                />
              </v-form>
            </template>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useFreelancerProfileStore } from "~/store/freelancer/profile";
import { useAppStore } from "~/store/app";

definePageMeta({
  layout: "freelancer",
});

const profileStore = useFreelancerProfileStore();
const appStore = useAppStore();

const {
  form: detailsForm,
  errors: detailsFormErrors,
  isDirty: detailsFormDirty,
  clearErrors: clearDetailsFormErrors,
  setErrors: setDetailsFormErrors,
} = useForm({
  phone: profileStore.profile?.profile.phone,
});

async function saveDetails() {
  clearDetailsFormErrors();

  try {
    await profileStore.updateFreelancerProfile(detailsForm);
    appStore.showSnackBar({
      message: "MPESA phone number saved successfully!",
      type: "success",
    });
    navigateTo("/freelancer/wallet");
  } catch (error: any) {
    const backendErrors = error.response?._data;

    if (backendErrors) {
      setDetailsFormErrors(backendErrors);

      const generalErrorMessage =
        backendErrors.detail ||
        backendErrors.non_field_errors?.[0] ||
        "Unable to save. Please try again";
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
