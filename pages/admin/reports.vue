<template>
  <div>
    <h1>Reports</h1>
    <v-breadcrumbs :items divider=">" />

    <v-row class="mt-3">
      <v-col cols="3">
        <AdminStatCard
          title="Total Clients"
          text="10,000"
          icon="mdi-account-clock-outline"
          color="warning"
        >
          <v-btn text="View All" size="small" variant="elevated" />
        </AdminStatCard>
      </v-col>
      <v-col cols="3">
        <AdminStatCard
          title="Total Freelancers"
          text="10,000"
          icon="mdi-account-clock-outline"
          color="warning"
        >
          <v-btn text="View All" size="small" variant="elevated" />
        </AdminStatCard>
      </v-col>
    </v-row>

    <div class="d-flex ga-4 mt-4 align-center">
      <v-text-field
        label="Search based on Freelancer name, Client name or Job ID"
        prepend-inner-icon="mdi-magnify"
        rounded="lg"
        class="my-5"
        hide-details
      />
      <v-btn text="Filters" variant="text" prepend-icon="mdi-tune" color="" />
      <v-btn
        text="Download All"
        prepend-icon="mdi-cloud-download-outline"
        variant="outlined"
        rounded="xl"
        color=""
      />
    </div>

    <div class="d-flex ga-2 my-4 align-center w-50">
      <p class="text-subtitle-1">Select</p>
      <v-select :items="['All']" model-value="All" hide-details />
    </div>

    <AdminReportsTable hide-actions />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const items = [
  {
    title: "Home",
    path: "/admin/dashboard",
  },
  {
    title: "Report",
    path: "/admin/reports",
  },
];
</script>
