<template>
  <div>
    <h1 class="text-h5 font-weight-medium">
      Hello, {{ authStore.user?.full_name }}
    </h1>
    <p class="text-subtitle-1 text-medium-emphasis">
      Here is your daily activities and applications
    </p>

    <div class="d-flex flex-column flex-sm-row ga-2 mt-5">
      <ClientStatCard v-for="stat in stats" :key="stat.title" :stat="stat" />
    </div>

    <div class="mt-10 mb-5 d-flex justify-space-between">
      <p class="text-h6">Recently Posted Jobs</p>
      <v-btn
        text="View All"
        variant="text"
        append-icon="mdi-arrow-right"
        color=""
        to="/client/my-jobs"
      />
    </div>

    <ClientJobTable :jobs="clientJobStore.jobs" :count="clientJobStore.totalJobsCount" />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth";
import { useClientJobsStore } from "~/store/client/jobs";

definePageMeta({
  layout: "client",
});

const authStore = useAuthStore();

const stats = computed(() => [
  {
    title: clientJobStore.dashboardMetrics?.activity.jobs_open ?? '0',
    subtitle: "Open Jobs",
    icon: "mdi-briefcase-outline",
    color: "primary",
  },
  {
    title: clientJobStore.dashboardMetrics?.activity.jobs_completed ?? '0',
    subtitle: "Completed Jobs",
    icon: "mdi-card-account-details-outline",
    color: "warning",
  },
  {
    title: formatAmount(clientJobStore.dashboardMetrics?.wallet.total_spent ?? 0),
    subtitle: "Total Spent",
    icon: "mdi-briefcase-outline",
    color: "primary",
  },
]);

const clientJobStore = useClientJobsStore();
async function getJobs() {
  await clientJobStore.fetchClientJobs();
}
onMounted(async () => {
  await getJobs();
  await clientJobStore.fetchDashboardMetrics();
});
</script>
