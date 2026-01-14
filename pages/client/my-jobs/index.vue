<template>
  <div>
    <h1>
      My Jobs
      <span class="text-medium-emphasis text-subtitle-1">
        ({{ clientJobStore.totalJobsCount }})
      </span>
    </h1>

    <v-row class="mt-4" no-gutters>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="search"
          label="Search by name"
          prepend-inner-icon="mdi-magnify"
          class="w-sm-50"
          :loading="clientJobStore.isLoading"
        />
      </v-col>
      <!-- <v-col cols="12" md="6">
        <div class="d-flex justify-end">
          <v-btn prepend-icon="mdi-tune" variant="text" text="Filters" />
        </div>
      </v-col> -->
    </v-row>

    <v-tabs v-model="jobStatus">
      <v-tab value="open">Open</v-tab>
      <v-tab value="in_progress">In Progress</v-tab>
      <v-tab value="completed">Completed</v-tab>
    </v-tabs>
    <v-divider class="mb-5" />

    <ClientJobTable
      v-model:page="page"
      :jobs="clientJobStore.jobs"
      :count="clientJobStore.totalJobsCount"
    />
  </div>
</template>

<script setup lang="ts">
import { debounce } from "lodash";
import { useClientJobsStore } from "~/store/client/jobs";

definePageMeta({
  layout: "client",
});

const clientJobStore = useClientJobsStore();
const search = ref("");
const page = ref(1);
const jobStatus = ref("open");
async function getJobs() {
  await clientJobStore.fetchClientJobs({
    status: jobStatus.value,
    search: search.value,
    page: page.value,
  });
}
onMounted(async () => {
  await getJobs();
});

watch(jobStatus, async () => await getJobs());
watch(
  search,
  debounce(async () => await getJobs(), 500)
);
</script>
