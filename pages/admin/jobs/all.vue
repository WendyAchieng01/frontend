<template>
  <div>
    <h1>All Job Activities</h1>
    <v-breadcrumbs :items divider=">" />

    <v-text-field
      label="Search based on Freelancer name, Client name or Job ID"
      prepend-inner-icon="mdi-magnify"
      rounded="lg"
      class="my-5"
    />

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
    path: "/admin/dashboard",
  },
  {
    title: "All Jobs",
    path: "/admin/all-jobs",
  },
  {
    title: "All Job Activities",
    path: "#",
  },
];
</script>
