<template>
  <v-row>
    <v-col cols="12" md="10">
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        class="mt-5"
        rounded="lg"
        hide-details
        :loading="jobStore.isLoading"
      />
    </v-col>
    <v-col cols="12" md="2" align-self="end">
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            class="w-100 my-auto font-weight-light"
            prepend-icon="mdi-tune"
            text="Filters"
            append-icon="mdi-chevron-down"
            size="x-large"
            variant="outlined"
            color="grey-darken-1"
            height="55"
            :loading="jobStore.isLoading"
          />
        </template>

        <!-- filter items -->
        <v-card>
          <v-row class="pa-6">
            <v-col v-for="filter in filterItems" :key="filter.title">
              <p class="text-subtitle-1 text-no-wrap font-weight-medium">
                {{ filter.title }}
              </p>
              <v-radio-group v-model="filters[filter.key]">
                <v-radio
                  v-for="item in filter.items"
                  :key="item.value"
                  :label="item.title"
                  :value="item.value"
                />
              </v-radio-group>
            </v-col>
          </v-row>
        </v-card>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useFreelancerJobsStore } from '~/store/freelancer/jobs';

const jobStore = useFreelancerJobsStore();

const filterItems = [
  {
    title: "Experience",
    key: "experience",
    items: [
      { title: "Entry Level", value: "entry" },
      { title: "Intermediate Level", value: "intermediate" },
      { title: "Expert Level", value: "expert" },
    ],
  },
  {
    title: "Bids Received",
    key: "bidsReceived",
    items: [
      { title: "Below 5", value: 5 },
      { title: "Below 10", value: 10 },
      { title: "Below 20", value: 20 },
    ],
  },
];
const search = defineModel<string>("search");
const filters = defineModel<Record<string, any>>("filters", {
  default: {
    experience: "",
    bidsReceived: "",
  },
});
</script>
