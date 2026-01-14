<template>
  <v-navigation-drawer v-model="appStore.clientNavigationDrawer">
    <template #prepend>
      <NuxtLink href="/client/dashboard">
        <v-img src="/public/logo.png" width="80" height="100" />
      </NuxtLink>
    </template>

    <v-list>
      <v-list-subheader class="text-caption text-uppercase mt-5">
        Employer's Dashboard
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
        @click="logoutUser"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app";
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const appStore = useAppStore();

// Logout function
function logoutUser() {
  authStore.logout();
}

const links = [
  {
    title: "Overview",
    icon: "mdi-layers-triple-outline",
    path: "/client/dashboard",
  },
  {
    title: "Post a Job",
    icon: "mdi-plus-circle-outline",
    path: "/client/new-job",
  },
  {
    title: "My Jobs",
    icon: "mdi-briefcase-outline",
    path: "/client/my-jobs",
  },
  {
    title: "Messages",
    icon: "mdi-book-outline",
    path: "/client/chat",
  },
  {
    title: "Wallet",
    icon: "mdi-bookmark-outline",
    path: "/client/wallet",
  },
  {
    title: "Profile",
    icon: "mdi-account-circle-outline",
    path: "/client/profile",
  },
];
</script>
