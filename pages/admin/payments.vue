<template>
  <div>
    <h1>Payments</h1>
    <v-breadcrumbs :items divider=">" />

    <p class="text-subtitle-1 mt-2">
      All Completed Jobs automatically moves here to be approved for payment
    </p>

    <v-row class="mt-4">
      <v-col cols="12" md="3">
        <AdminStatCard
          title="Total Earnings"
          text="KES 2,090,280"
          color="primary"
          icon="mdi-wallet-outline"
        />
      </v-col>
      <v-col cols="12" md="3">
        <AdminStatCard
          title="Pending Payment"
          text="KES 290,280"
          color="warning"
          icon="mdi-account-clock-outline"
        >
          <div class="text-caption text-xl-subtitle-1">
            Next Payment - 09/04/25
          </div>
        </AdminStatCard>
      </v-col>
      <v-col cols="12" md="3">
        <AdminStatCard
          title="No Of Pending Payment"
          text="398"
          color="success"
          icon="mdi-autorenew"
        >
          <div class="text-caption text-xl-subtitle-1">
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
          title="No Of Processed Payment"
          text="130"
          color="primary"
          icon="mdi-account-group-outline"
        >
          <div class="text-caption text-xl-subtitle-1">Freelancers</div>
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
      <v-btn text="Roll Out Payment" size="large" />
    </div>

    <div class="d-flex ga-2 mt-4 align-center w-50">
      <p class="text-subtitle-1">Select</p>
      <v-select :items="['All']" model-value="All" hide-details />
    </div>

    <v-tabs class="mt-5">
      <v-tab>All</v-tab>
      <v-tab>Pending</v-tab>
      <v-tab>Completed</v-tab>
      <v-tab>Overdue</v-tab>
    </v-tabs>
    <v-divider />

    <AdminJobTable />
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
  {
    title: "Payments",
    path: "/admin/payments",
  },
];
</script>
