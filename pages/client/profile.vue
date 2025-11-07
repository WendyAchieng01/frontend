<template>
  <div>
    <v-row>
      <v-col cols="12" md="3" align-self="center">
        <p class="text-h6">Personal Information</p>

        <v-badge
          location="bottom end"
          color="primary"
          offset-x="15"
          offset-y="10"
          bordered
          icon="mdi-camera-outline"
          @click.stop="profileInput?.click()"
        >
          <v-avatar
            :image="profileURL"
            size="100"
            class="mt-4"
            @click.stop="profileInput?.click()"
          />
        </v-badge>

        <!-- change profile picture input -->
        <v-file-input
          ref="profileInput"
          v-model="personalInformationForm.profile_picture"
          class="d-none"
          accept="image/*"
        />
      </v-col>
      <v-col>
        <div class="pa-3 border">
          <!-- show personal information -->
          <div
            v-if="!toggleEditPersonalInformation"
            class="d-flex justify-space-between"
          >
            <div>
              <v-list-item title="Full Name" :subtitle="profile?.full_name" />
              <v-list-item
                title="Email"
                :subtitle="profile?.profile.user.email"
              />
              <v-list-item title="Password" subtitle="......" />
            </div>
            <v-icon
              icon="mdi-pencil-box-outline"
              size="x-large"
              class="mt-2"
              color="primary"
              @click="toggleEditPersonalInformation = true"
            />
          </div>

          <!-- edit personal information -->
          <div v-else class="pa-2">
            <v-text-field
              v-model="personalInformationForm.full_name"
              label="Full Name"
              :error-messages="personalInformationErrors.full_name"
            />
            <v-text-field
              v-model="personalInformationForm.email"
              label="Email"
              :error-messages="personalInformationErrors.email"
            />
            <v-text-field
              v-model="personalInformationForm.password"
              label="Password"
              type="password"
              :error-messages="personalInformationErrors.password"
            />

            <div class="d-flex mt-2">
              <v-btn
                text="Cancel"
                variant="text"
                @click="
                  resetProfileInformationForm,
                    (toggleEditPersonalInformation = false)
                "
              />
              <v-btn
                text="Save Changes"
                :disabled="!personalInformationFormIsDirty"
                :loading="profileStore.isLoading"
                @click="savePersonalInformation"
              />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3" align-self="center">
        <p class="text-h6">Company Details</p>

        <v-avatar
          icon="mdi-text-box-minus-outline"
          size="100"
          variant="tonal"
          color="primary"
          class="mt-4"
        />
      </v-col>
      <v-col>
        <div class="pa-3 border">
          <!-- show company info -->
          <div
            v-if="!toggleEditCompanyDetails"
            class="d-flex justify-space-between"
          >
            <div>
              <v-list-item
                title="Company Name"
                :subtitle="profile?.company_name"
              />
              <v-list-item
                title="Website"
                :subtitle="profile?.company_website"
              />
              <v-list-item title="Industry" :subtitle="profile?.industry" />
            </div>
            <v-icon
              icon="mdi-pencil-box-outline"
              size="x-large"
              class="mt-2"
              color="primary"
              @click="toggleEditCompanyDetails = true"
            />
          </div>
          <!-- edit company info -->
          <div v-else class="pa-2">
            <v-text-field
              v-model="companyDetailsForm.company_name"
              label="Company Name"
              :error-messages="companyDetailsErrors.company_name"
            />
            <v-text-field
              v-model="companyDetailsForm.company_website"
              label="Website"
              :error-messages="companyDetailsErrors.company_website"
            />
            <v-select
              v-model="companyDetailsForm.industry"
              label="Industry"
              :items="industryItems"
              :error-messages="companyDetailsErrors.industry"
            />
            <div class="d-flex mt-2">
              <v-btn
                text="Cancel"
                variant="text"
                @click="
                  resetCompanyDetailsForm, (toggleEditCompanyDetails = false)
                "
              />
              <v-btn
                text="Save Changes"
                :disabled="!companyDetailsFormIsDirty"
                :loading="profileStore.isLoading"
                @click="saveCompanyDetails"
              />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="3" align-self="center">
        <p class="text-h6">Additional Details</p>

        <v-avatar
          icon="mdi-text-box-minus-outline"
          size="100"
          variant="tonal"
          color="primary"
          class="mt-4"
        />
      </v-col>
      <v-col>
        <div class="pa-3 border">
          <div
            v-if="!toggleEditAdditionalDetails"
            class="d-flex justify-space-between"
          >
            <div>
              <v-list-item
                title="Budget"
                :subtitle="formatAmount(profile?.project_budget ?? 0)"
              />
              <v-list-item title="Language" subtitle="English" />
              <v-list-item
                title="Freelancer skill-level"
                :subtitle="profile?.preferred_freelancer_level"
              />
            </div>
            <v-icon
              icon="mdi-pencil-box-outline"
              size="x-large"
              class="mt-2"
              color="primary"
              @click="toggleEditAdditionalDetails = true"
            />
          </div>
          <div v-else class="pa-2">
            <v-text-field
              v-model="additionalDetailsForm.project_budget"
              label="Project Budget"
              :error-messages="additionalDetailsErrors.project_budget"
            />
            <v-select
              v-model="additionalDetailsForm.preferred_freelancer_level"
              label="Preferred Freelancer Level"
              :items="freelancerLevels"
              :error-messages="
                additionalDetailsErrors.preferred_freelancer_level
              "
            />
            <div class="d-flex mt-2">
              <v-btn
                text="Cancel"
                variant="text"
                @click="
                  resetAdditionalDetailsForm,
                    (toggleEditAdditionalDetails = false)
                "
              />
              <v-btn
                text="Save Changes"
                :disabled="!additionalDetailsFormIsDirty"
                :loading="profileStore.isLoading"
                @click="saveAdditionalDetails"
              />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth";
import { useClientProfileStore } from "~/store/client/profile";

definePageMeta({
  layout: "client",
});

const profileStore = useClientProfileStore();
const authStore = useAuthStore();
onMounted(async () => {
  await profileStore.fetchClientProfile();
  // set forms
  personalInformationForm.full_name = profile.value?.full_name;
  personalInformationForm.email = profile.value?.profile?.user?.email;
  companyDetailsForm.company_name = profile.value?.company_name ?? "";
  companyDetailsForm.company_website = profile.value?.company_website ?? "";
  companyDetailsForm.industry = profile.value?.industry ?? "";
  additionalDetailsForm.preferred_freelancer_level =
    profile.value?.preferred_freelancer_level ?? "";
  additionalDetailsForm.project_budget = profile.value?.project_budget ?? "";
});

const profile = computed(() => profileStore.clientProfile);
const user = computed(() => authStore.user);
const profileInput = useTemplateRef("profileInput");
const config = useRuntimeConfig();
// watch the file input and replace the profile with the added one
const profileURL = computed(() => {
  // 1. If user selected a new file, show it as an Object URL
  if (personalInformationForm.profile_picture instanceof File) {
    return URL.createObjectURL(personalInformationForm.profile_picture);
  }

  // 2. Fallback to profile picture from store
  if (profileStore.clientProfile?.profile?.profile_pic) {
    return `${config.public.mediaBaseUrl}${profileStore.clientProfile.profile.profile_pic}`;
  }

  // 3. Final fallback to generated avatar
  return profileImage(
    user.value?.full_name.split(" ")[0] ?? "",
    user.value?.full_name.split(" ")?.[1] ?? ""
  );
});

// edit profile
// personal information
const toggleEditPersonalInformation = ref(false);
const {
  form: personalInformationForm,
  errors: personalInformationErrors,
  reset: resetProfileInformationForm,
  clearErrors: clearPersonalInformationErrors,
  setErrors: setPersonalInformationErrors,
  isDirty: personalInformationFormIsDirty,
} = useForm({
  full_name: profile.value?.full_name || "",
  email: profile.value?.profile.user.email || "",
  profile_picture: null as null | File,
  password: "",
});

// watch image change and toggle edit mode on personal information
watch(
  () => personalInformationForm.profile_picture,
  () => (toggleEditPersonalInformation.value = true)
);

async function savePersonalInformation() {
  clearPersonalInformationErrors();

  try {
    const personalInfoPayload = {
      first_name: personalInformationForm.full_name?.split(" ")?.[0],
      last_name: personalInformationForm.full_name?.split(" ")?.[1],
      email: personalInformationForm.email,
      profile_picture: personalInformationForm.profile_picture,
    };
    await profileStore.updateClientProfile(toFormData(personalInfoPayload));

    // save the password if provided
    if (personalInformationForm.password)
      await authStore.changePassword({
        new_password: personalInformationForm.password,
        confirm_new_password: personalInformationForm.password,
      });
    toggleEditPersonalInformation.value = false;
  } catch (error: any) {
    const backendErrors = error.response?._data;

    if (backendErrors) {
      setPersonalInformationErrors(backendErrors);
    }
  }
}

// company details
const toggleEditCompanyDetails = ref(false);
const {
  form: companyDetailsForm,
  errors: companyDetailsErrors,
  reset: resetCompanyDetailsForm,
  clearErrors: clearCompanyDetailsErrors,
  setErrors: setCompanyDetailsErrors,
  isDirty: companyDetailsFormIsDirty,
} = useForm({
  company_name: profile.value?.company_name || "",
  company_website: profile.value?.company_website || "",
  industry: profile.value?.industry || "",
});

async function saveCompanyDetails() {
  clearCompanyDetailsErrors();

  try {
    const companyDetailsPayload = {
      ...profile.value,
      ...companyDetailsForm,
    };
    await profileStore.updateClientProfile(companyDetailsPayload);
    resetCompanyDetailsForm();
    toggleEditCompanyDetails.value = false;
  } catch (error: any) {
    const backendErrors = error.response?._data;

    if (backendErrors) {
      setCompanyDetailsErrors(backendErrors);
    }
  }
}
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

// additional details
const toggleEditAdditionalDetails = ref(false);
const {
  form: additionalDetailsForm,
  errors: additionalDetailsErrors,
  reset: resetAdditionalDetailsForm,
  clearErrors: clearAdditionalDetailsErrors,
  setErrors: setAdditionalDetailsErrors,
  isDirty: additionalDetailsFormIsDirty,
} = useForm({
  project_budget: profile.value?.project_budget || "",
  preferred_freelancer_level: profile.value?.preferred_freelancer_level || "",
});

async function saveAdditionalDetails() {
  clearAdditionalDetailsErrors();

  try {
    const additionalDetailsPayload = {
      ...profile.value,
      ...additionalDetailsForm,
    };
    await profileStore.updateClientProfile(additionalDetailsPayload);
    resetAdditionalDetailsForm();
    toggleEditAdditionalDetails.value = false;
  } catch (error: any) {
    const backendErrors = error.response?._data;

    if (backendErrors) {
      setAdditionalDetailsErrors(backendErrors);
    }
  }
}
const freelancerLevels = [
  { title: "Entry Level", value: "entry" },
  { title: "Intermediate Level", value: "intermediate" },
  { title: "Expert Level", value: "expert" },
];
</script>
