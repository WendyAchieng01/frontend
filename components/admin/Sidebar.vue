<template>
  <v-navigation-drawer>
    <template #prepend>
      <NuxtLink href="/admin/dashboard">
        <v-img src="/public/logo.png" width="80" height="100" />
      </NuxtLink>
    </template>
    <v-list>
      <v-list-subheader class="text-caption text-uppercase mt-5">
        Admin Dashboard
      </v-list-subheader>

      <v-list-item
        v-for="{ title, icon, path } in links"
        :key="title"
        :title
        :to="path"
        :prepend-icon="icon"
        active-class="text-primary border-s-lg border-opacity-100 border-primary"
      />

      <v-list-item
        class="mt-10"
        title="Logout"
        prepend-icon="mdi-logout-variant"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const links = [
  {
    title: "Dashboard",
    icon: "mdi-layers-triple-outline",
    path: "/admin/dashboard",
  },
  {
    title: "All Jobs",
    icon: "mdi-briefcase-outline",
    path: "/admin/jobs/all",
  },
  {
    title: "Payments",
    icon: "mdi-cash-multiple",
    path: "/admin/payments",
  },
  {
    title: "Chat Monitoring",
    icon: "mdi-notebook-outline",
    path: "/admin/chat-monitoring",
  },
  {
    title: "User Management",
    icon: "mdi-account-multiple-outline",
    path: "/admin/user-management",
  },
  {
    title: "Reports",
    icon: "mdi-chart-pie",
    path: "/admin/reports",
  },
];
</script>
