<template>
  <div>
    <h1 class="text-h5 mt-10">Find jobs you saved</h1>
    <p class="text-subtitle-1 text-medium-emphasis mt-2">
      If you do not have time to apply now, you can always save for later.
    </p>

    <JobSearch v-model:search="search" v-model:filters="filters" />

    <v-row class="mt-10">
      <v-col>
        <p class="text-h5">Browse through jobs you might like</p>

        <div class="my-4" />

        <div v-for="job in jobStore.availableJobs" :key="job.id">
          <JobCard :job />
          <v-divider class="my-3" />
        </div>
      </v-col>
    </v-row>

    <v-pagination
        v-model="page"
        :length="Math.ceil(jobStore.totalAvailableJobsCount / 10)"
        color="primary"
      />
  </div>
</template>

<script setup lang="ts">
import { debounce } from "lodash";
import { useFreelancerJobsStore } from "~/store/freelancer/jobs";

definePageMeta({
  layout: "freelancer",
});

const search = ref("");
const filters = ref<Record<string, any> | undefined>({});
const page = ref(1);

const jobStore = useFreelancerJobsStore();
async function fetchJobs() {
  const params = {
    match_type: "bookmarks",
    page: page.value,
    ...(search.value && { search: search.value }),
    ...(filters.value?.experience && { level: filters.value.experience }),
    ...(filters.value?.bidsReceived && {
      application_count: filters.value.bidsReceived,
    }),
  };

  console.log(`Fetching jobs with params: ${JSON.stringify(params)} `);

  await jobStore.fetchAvailableJobs(params);
}
onMounted(async () => {
  await fetchJobs();
});

watch(
  [() => filters, page],
  async () => await fetchJobs(),
  { deep: true }
);
watch(
  search,
  debounce(async () => await fetchJobs(), 500)
);
</script>
