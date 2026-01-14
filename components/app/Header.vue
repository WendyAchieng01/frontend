<template>
  <v-app-bar class="pa-2" flat color="transparent">
    <template #default>
      <div class="d-flex w-100 px-2 justify-space-between ga-2 align-center">
        <!-- logo -->
        <div class="d-flex ga-3 pa-2 align-center">
          <NuxtLink href="/">
            <v-img src="/public/logo.png" width="60" height="50" />
          </NuxtLink>
        </div>

        <!-- links -->
        <div class="d-none d-sm-flex justify-center align-center ga-10">
          <p v-for="link in links" :key="link.name" class="text-subtitle-1">
            <NuxtLink :href="link.path" class="text-decoration-none text-black">
              {{ link.name }}
            </NuxtLink>
          </p>
        </div>

        <!-- action buttons -->
        <div v-if="!user" class="d-flex align-center ga-4">
          <v-btn
            text="Login"
            size="large"
            variant="text"
            class="font-weight-medium text-subtitle-1 d-none d-sm-flex"
            :to="{ path: '/auth/login' }"
          />
          <v-btn
            text="Sign Up"
            size="large"
            variant="elevated"
            class="font-weight-light text-subtitle-2"
            width="150"
            :to="{ path: '/auth/register' }"
          />
        </div>

        <v-btn
          v-else
          text="Go to Dashboard"
          size="large"
          variant="outlined"
          class="font-weight-medium text-subtitle-1"
          :href="`/${user?.user_type}/dashboard`"
        />
      </div>

      <v-btn
        v-if="$vuetify.display.mobile"
        icon="mdi-menu"
        @click="drawer = !drawer"
      />
    </template>
  </v-app-bar>

  <!-- navigation drawer -->
  <v-navigation-drawer v-if="$vuetify.display.mobile" v-model="drawer" absolute>
    <v-list nav>
      <v-list-item
        v-for="link in links"
        :key="link.name"
        :to="link.path"
        :title="link.name"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const drawer = ref(false);
const links = [
  {
    name: "About Us",
    path: "/about-us",
  },
  {
    name: "Find Freelancers",
    path: "/auth/login",
  },
  {
    name: "Find Jobs",
    path: "/auth/register",
  },
  {
    name: "FAQ",
    path: "/frequently-asked-questions",
  },
  {
    name: "Contact Us",
    path: "/contact-us",
  },
];
</script>
