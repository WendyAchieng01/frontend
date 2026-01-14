<template>
  <div>
    <h1>Users Management</h1>
    <v-breadcrumbs :items divider=">" />

    <v-row class="mt-3">
      <v-col v-for="n in 4" :key="n">
        <v-card>
          <template #text>
            <div class="d-flex justify-space-between align-center">
              <p class="text-subtitle-1">Total Users</p>
              <v-spacer />
              <v-select
                :items="['All', 'Today']"
                model-value="Today"
                hide-details
                density="compact"
                flat
                variant="solo-filled"
              />
            </div>

            <v-divider class="mt-3" />

            <p class="text-h5 mt-5 font-weight-bold text-center text-primary">
              50, 600
            </p>
          </template>
        </v-card>
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

    <AdminUsersTable />
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
    title: "Dashboard",
    path: "/admin/user-dashboard",
  },
];
</script>
