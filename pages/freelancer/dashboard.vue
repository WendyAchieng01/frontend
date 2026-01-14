<template>
  <div>
    <!-- email verification alert -->
    <v-alert
      v-if="false"
      icon="mdi-information-outline"
      variant="tonal"
      type="warning"
    >
      <p>
        Welcome to NillTech solutions. To be onboarded, you will need to verify
        your profile. Then your account will be reviewed before being approved
        <NuxtLink
          class="text-primary font-weight-bold text-decoration-underline"
        >
          Verify Now!
        </NuxtLink>
      </p>
    </v-alert>

    <!-- welcome text -->
    <h1 class="text-h5 mt-10">Welcome to NillTech</h1>
    <p class="text-subtitle-1 mt-5">Here is a quick glance of your activity</p>

    <!-- stats -->
    <v-row class="mt-5">
      <v-col v-for="stat in stats" :key="stat.title">
        <v-card variant="outlined" border="thin" height="190">
          <div
            class="d-flex flex-column justify-space-around align-center pa-5 h-100"
          >
            <p class="text-subtitle-1">{{ stat.title }}</p>
            <p class="text-h4">{{ stat.value }}</p>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- search and filter -->
    <JobSearch v-model:search="search" v-model:filters="filters" />

    <!-- browse jobs -->
    <JobBrowse :search :filters />
  </div>
</template>

<script setup lang="ts">
import { useFreelancerJobsStore } from "~/store/freelancer/jobs";
definePageMeta({
  layout: "freelancer",
});

const freelancerJobStore = useFreelancerJobsStore();
onMounted(async () => {
  await freelancerJobStore.fetchDashboardMetrics();
});

// stats
const stats = computed(() => {
  return [
    {
      title: "Completed Jobs",
      value: freelancerJobStore?.dashboardMetrics?.activity.jobs_completed,
    },
    {
      title: "Active Jobs",
      value: freelancerJobStore?.dashboardMetrics?.activity.jobs_accepted,
    },
    {
      title: "Pending Jobs",
      value: freelancerJobStore?.dashboardMetrics?.activity.jobs_applied,
    },
    {
      title: "Total Earning (KES)",
      value: formatAmount(freelancerJobStore?.dashboardMetrics?.wallet.net_earnings ?? 0),
    },
    {
      title: "New Messages",
      value: freelancerJobStore?.dashboardMetrics?.messages.unread_messages,
    },
  ];
});

const search = ref("");
const filters = ref({});
</script>
