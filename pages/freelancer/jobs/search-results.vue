<template>
  <div>
    <p class="text-h5">Search Results</p>
    <p class="text-subtitle-1 text-medium-emphasis mt-2">
      Learn how to stand out, land more gigs, and deliver top-tier results with
      expert curated resources.
    </p>

    <v-divider />

    <!-- filter, search and sort -->
    <v-row class="mt-5" justify="space-between">
      <v-col cols="12" md="6">
        <div class="d-flex ga-2 align-center">
          <!-- <v-btn
            prepend-icon="mdi-tune"
            text="Filter"
            variant="outlined"
            size="large"
            class="rounded-0"
            height="53"
          >
            <template #append>
              <div class="bg-primary pa-1 px-2 text-caption">3</div>
            </template>
          </v-btn> -->
          <v-text-field
            v-model="search"
            label="Search"
            placeholder="UI/UX Design"
            prepend-inner-icon="mdi-magnify"
            hide-details
            clearable
            :loading="jobStore.isLoading"
          />
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="discovery"
          label="Sort By"
          :items="sortItems"
        />
      </v-col>
    </v-row>

    <!-- suggestions and result count -->
    <div v-if="search" class="d-flex justify-end">
      <!-- <p class="text-subtitle-1">
        Suggestion:
        <span class="text-primary text-subtitle-2">
          user interface user experience web design interface app
        </span>
      </p> -->
      <p class="text-subtitle-1">
        <span class="font-weight-bold">
          {{ jobStore.totalAvailableJobsCount }}
        </span>
        results find "{{ search }}"
      </p>
    </div>

    <v-divider />

    <!-- filters and results -->
    <v-row class="mt-5">
      <v-col v-if="false" cols="12" md="4">
        <div class="rounded">
          <v-expansion-panels flat>
            <v-expansion-panel v-for="filter in jobCategories" :key="filter">
              <template #title>
                <v-list-item :title="filter" prepend-icon="mdi-code-braces" />
              </template>
              <template #text>
                <v-checkbox
                  v-for="n in 5"
                  :key="n"
                  hide-details
                  label="Web Development"
                >
                  <template #append>
                    <p class="text-subtitle-2">200</p>
                  </template>
                </v-checkbox>
              </template>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-col>
      <v-col cols="12" md="12">
        <JobCard v-for="job in jobStore.availableJobs" :key="job.id" :job />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { debounce } from "lodash";
import { useFreelancerJobsStore } from "~/store/freelancer/jobs";

definePageMeta({
  layout: "freelancer",
});

const route = useRoute();
const discovery = ref("most_recent");
const search = ref(route.query?.search ?? '');
const filters = ref({});

const sortItems = [
  { title: "Most Recent", value: "most_recent" },
  { title: "Best Matches", value: "best_matches" },
]
const jobCategories: Array<{ text: string; value: JobCategory }> = [
  { text: "Data Entry", value: "data_entry" },
  { text: "Translation", value: "translation" },
  { text: "Transcription and Captioning", value: "transcription" },
  { text: "Graphics", value: "graphics" },
  { text: "Writing and Editing", value: "writing" },
  { text: "App and Web Development", value: "web_dev" },
  { text: "IT Project Management", value: "project_mgmt" },
  { text: "Software Testing", value: "testing" },
  { text: "Virtual Assistance", value: "virtual_assist" },
  { text: "Social Media Management", value: "social_media" },
  { text: "AI Model Training", value: "ai_training" },
];

// jobs
const jobStore = useFreelancerJobsStore();
async function fetchJobs() {
  const params = {
    ...(search.value && { search: search.value }),
    ...(discovery.value && { match_type: discovery.value }),
    ...(filters.value?.experience && { level: filters.value.experience }),
    ...(filters.value?.bidsReceived && {
      application_count: filters.value.bidsReceived,
    }),
  };

  await jobStore.fetchAvailableJobs(params);
}
onMounted(async () => {
  await fetchJobs();
});

watch([discovery, filters], async () => await fetchJobs());
watch(
  search,
  debounce(async () => await fetchJobs(), 500),
  { immediate: true },
);
</script>
