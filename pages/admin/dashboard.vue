<template>
  <div>
    <h1>Dashboard</h1>
    <v-breadcrumbs :items divider=">" />

    <v-list-item
      title="Job marked complete"
      subtitle="Just now"
      class="bg-grey-lighten-4 py-3"
    >
      <template #prepend>
        <v-avatar icon="mdi-bug-outline" color="success" variant="tonal" />
      </template>
    </v-list-item>

    <v-row class="mt-4">
      <v-col cols="12" md="3">
        <AdminStatCard
          title="Total Jobs Completed"
          text="398"
          color="success"
          icon="mdi-autorenew"
        >
          <div class="text-subtitle-1">
            <span class="text-success">
              <v-icon icon="mdi-arrow-up" />
              100%
            </span>
            since last week
          </div>
        </AdminStatCard>
      </v-col>
      <v-col cols="12" md="3">
        <AdminStatCard
          title="Total Active Freelancers"
          text="130"
          color="primary"
          icon="mdi-account-group-outline"
        />
      </v-col>
      <v-col cols="12" md="3">
        <AdminStatCard
          title="Total Active Clients"
          text="130"
          color="primary"
          icon="mdi-account-group-outline"
        />
      </v-col>
      <v-col cols="12" md="3">
        <AdminStatCard
          title="Pending Payment"
          text="KES 290,280"
          color="warning"
          icon="mdi-account-clock-outline"
        >
          <div class="text-subtitle-1">Next Payment - 09/04/25</div>
        </AdminStatCard>
      </v-col>
      <v-col cols="12" md="3">
        <AdminStatCard
          title="Total Income"
          text="KES 2,090,280"
          color="primary"
          icon="mdi-wallet-outline"
        />
      </v-col>
      <v-col cols="12" md="3">
        <AdminStatCard
          title="Total Earning"
          text="KES 1,090,280"
          color="primary"
          icon="mdi-wallet-outline"
        />
      </v-col>
      <v-col cols="12" md="3">
        <AdminStatCard
          title="Total Earning"
          text="KES 290,280"
          color="primary"
          icon="mdi-wallet-outline"
        >
          <div class="text-subtitle-1">Money sent to freelancers</div>
        </AdminStatCard>
      </v-col>
    </v-row>

    <div class="mt-10 d-flex justify-space-between">
      <p class="text-h6">All Jobs Activity</p>
      <v-btn text="View all Jobs" variant="text" to="/admin/jobs/all" />
    </div>
    <v-text-field
      label="Search"
      prepend-inner-icon="mdi-magnify"
      rounded="lg"
      class="my-5"
    />

    <AdminJobTable hide-actions />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const items = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Dashboard",
    path: "/admin/dashboard",
  },
];
</script>
