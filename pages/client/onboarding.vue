<template>
  <v-row v-if="!showSuccess" justify="center" class="h-screen">
    <v-col cols="12" md="10" align-self="center">
      <v-img src="/logo.png" width="100" height="80" />
      <h1 class="text-h5">Welcome to Nill Tech</h1>
      <p class="text-subtitle-2">
        Tell us about your business and you'll be on your way to connect with
        talent.
      </p>

      <v-carousel
        v-model="carousel"
        :show-arrows="false"
        hide-delimiter-background
      >
        <v-carousel-item>
          <v-form class="ma-1">
            <template #default="{ isValid }">
              <v-radio-group :rules="[required]" color="primary">
                <v-radio
                  v-for="item in radioItems"
                  :key="item"
                  :value="item"
                  :label="item"
                />
              </v-radio-group>

              <v-text-field
                v-model="profileForm.company_name"
                label="Company Name"
                placeholder="Name"
                :rules="[required]"
                :error-messages="profileFormErrors.company_name"
              />
              <v-text-field
                v-model="profileForm.company_website"
                label="Website"
                placeholder="work.com"
                :rules="[required, urlFormat]"
                :error-messages="profileFormErrors.company_website"
              />

              <v-btn
                size="large"
                text="Next"
                append-icon="mdi-chevron-right"
                :disabled="!isValid.value"
                @click="carousel += 1"
              />
            </template>
          </v-form>
        </v-carousel-item>
        <v-carousel-item>
          <v-form class="ma-1">
            <template #default="{ isValid }">
              <v-select
                v-model="profileForm.industry"
                label="Industry"
                :items="industryItems"
                :error-messages="profileFormErrors.industry"
              />
              <v-text-field
                v-model="profileForm.project_budget"
                label="Budget"
                :error-messages="profileFormErrors.project_budget"
              />
              <!-- <v-select
                v-model="profileForm.languages"
                label="Language"
                :items="languageItems"
                multiple
                chips
                closable-chips
                :rules="[required, atLeastOne]"
                :error-messages="profileFormErrors.languages"
              /> -->

              <v-radio-group
                v-model="profileForm.preferred_freelancer_level"
                :error-messages="profileFormErrors.preferred_freelancer_level"
              >
                <p class="text-subtitle-1">Freelancer skill level</p>
                <v-radio
                  v-for="item in freelancerLevels"
                  :key="item.value"
                  :label="item.title"
                  :value="item.value"
                  color="primary"
                />
              </v-radio-group>

              <div class="d-flex ga-2">
                <v-btn
                  size="large"
                  text="Previous Step"
                  variant="outlined"
                  @click="carousel -= 1"
                />
                <v-btn
                  size="large"
                  text="Save"
                  append-icon="mdi-arrow-right"
                  :disabled="!isValid.value"
                  :loading="profileStore.isLoading"
                  @click="createClientProfile"
                />
              </div>
            </template>
          </v-form>
        </v-carousel-item>
      </v-carousel>
    </v-col>
  </v-row>

  <v-row v-else justify="center" class="h-screen">
    <v-col align-self="center">
      <div class="d-flex align-center flex-column">
        <v-avatar
          icon="mdi-check-all"
          size="x-large"
          color="primary"
          variant="tonal"
        />
        <p class="mt-3 text-h6">
          🎉 Congratulations, Your profile is 100% complete!
        </p>

        <p class="text-center text-subtitle-1 w-50 mt-1 font-weight-medium">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro
          corporis ex velit dolor ullam veniam, perspiciatis incidunt quibusdam
          unde accusamus. Quas ducimus asperiores aut quam necessitatibus totam
          modi, aliquam voluptatum?
        </p>

        <div class="d-flex ga-2 mt-3">
          <v-btn
            size="large"
            text="View Dashboard"
            variant="tonal"
            to="/client/dashboard"
          />
          <v-btn
            size="large"
            text="Post Job"
            append-icon="mdi-arrow-right"
            to="/client/new-job"
          />
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app";
import { useAuthStore } from "~/store/auth";
import { useClientProfileStore } from "~/store/client/profile";
import type { IClientProfile } from "~/types/client";

definePageMeta({
  layout: false,
});

const carousel = ref(0);
const radioItems = [
  "It's just me",
  "2-9 employees",
  "10-99 employees",
  "100-1,000 employees",
  "More than 1,000 employees",
];
const industryItems = [
  { title: "Technology", value: "technology" },
  { title: "Finance", value: "finance" },
  { title: "Healthcare", value: "healthcare" },
  { title: "Education", value: "education" },
  { title: "Retail", value: "retail" },
  { title: "Manufacturing", value: "manufacturing" },
  { title: "Entertainment", value: "entertainment" },
  { title: "Marketing", value: "marketing" },
  { title: "Consulting", value: "consulting" },
  { title: "Non-Profit", value: "non_profit" },
  { title: "Government", value: "government" },
  { title: "Legal", value: "legal" },
  { title: "Real Estate", value: "real_estate" },
  { title: "Hospitality", value: "hospitality" },
  { title: "Transportation", value: "transportation" },
  { title: "Agriculture", value: "agriculture" },
  { title: "Energy", value: "energy" },
  { title: "Telecom", value: "telecom" },
  { title: "Media", value: "media" },
  { title: "Other", value: "other" },
];
const languageItems = [
  { title: "English", value: 1 },
  { title: "Swahili", value: 2 },
  { title: "Spanish", value: 3 },
  { title: "French", value: 4 },
  { title: "German", value: 5 },
  { title: "Italian", value: 6 },
  { title: "Portuguese", value: 7 },
  { title: "Russian", value: 8 },
  { title: "Mandarin", value: 9 },
  { title: "Cantonese", value: 10 },
  { title: "Japanese", value: 11 },
  { title: "Korean", value: 12 },
  { title: "Arabic", value: 13 },
  { title: "Hindi", value: 14 },
  { title: "Bengali", value: 15 },
  { title: "Urdu", value: 16 },
  { title: "Dutch", value: 17 },
  { title: "Swedish", value: 18 },
  { title: "Norwegian", value: 19 },
  { title: "Danish", value: 20 },
  { title: "Finnish", value: 21 },
  { title: "Polish", value: 22 },
  { title: "Turkish", value: 23 },
  { title: "Hebrew", value: 24 },
  { title: "Greek", value: 25 },
  { title: "Thai", value: 26 },
  { title: "Vietnamese", value: 27 },
  { title: "Indonesian", value: 28 },
  { title: "Malay", value: 29 },
  { title: "Tagalog", value: 30 },
  { title: "Czech", value: 31 },
  { title: "Slovak", value: 32 },
  { title: "Hungarian", value: 33 },
  { title: "Romanian", value: 34 },
  { title: "Bulgarian", value: 35 },
  { title: "Ukrainian", value: 36 },
  { title: "Farsi", value: 37 },
  { title: "Afrikaans", value: 38 },
  { title: "Amharic", value: 39 },
  { title: "Other", value: 40 },
];
// entry, intermediate, expert
const freelancerLevels = [
  { title: "Entry Level", value: "entry" },
  { title: "Intermediate Level", value: "intermediate" },
  { title: "Expert Level", value: "expert" },
];
const showSuccess = ref(false);

const profileStore = useClientProfileStore();
const appStore = useAppStore();
const authStore = useAuthStore();

const {
  form: profileForm,
  errors: profileFormErrors,
  setErrors,
  clearErrors,
  reset,
} = useForm<Partial<IClientProfile>>({
  profile: {
    bio: "",
    location: "",
    phone: "",
    id_card: "",
  },
  company_name: "",
  company_website: "",
  industry: "",
  project_budget: "",
  preferred_freelancer_level: "",
  languages: [],
});

// create client profile
async function createClientProfile() {
  clearErrors();
  try {
    const userID = authStore.user?.id;
    if (userID) await profileStore.createClientProfile(profileForm);
    showSuccess.value = true;
    reset();
  } catch (error: any) {
    const backendErrors = error.response?._data;

    if (backendErrors) {
      setErrors(backendErrors);

      const generalErrorMessage =
        backendErrors.detail ||
        backendErrors.non_field_errors?.[0] ||
        "Failed to create profile. Please try again.";
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
