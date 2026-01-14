<template>
  <div>
    <h1>Job Applicants</h1>

    <v-row class="mt-4 mb-2 mb-sm-0">
      <v-col cols="12" md="6">
        <v-text-field
          label="Search by name"
          prepend-inner-icon="mdi-magnify"
          class="w-sm-50"
        />
      </v-col>
      <v-col>
        <div class="d-flex justify-end">
          <v-btn prepend-icon="mdi-tune" variant="text" text="Filters" />
        </div>
      </v-col>
    </v-row>

    <!-- <v-tabs v-model="tab">
      <v-tab>All</v-tab>
      <v-tab>Pending Review</v-tab>
      <v-tab>Hired</v-tab>
    </v-tabs>
    <v-divider class="mb-5" /> -->

    <ClientApplicantsTable :applications="clientJobStore.applications" />
  </div>
</template>

<script setup lang="ts">
import { useClientJobsStore } from "~/store/client/jobs";

definePageMeta({
  layout: "client",
});
// const tab = ref(null);

const clientJobStore = useClientJobsStore();
const route = useRoute()
async function getJobApplications() {
  await clientJobStore.fetchJobApplications(route.params.id as string);
}
onMounted(async () => {
  await getJobApplications();
});
</script>
