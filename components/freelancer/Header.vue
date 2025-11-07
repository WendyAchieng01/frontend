<template>
  <v-app-bar class="pa-2" flat>
    <template v-if="$vuetify.display.mobile" #prepend>
      <v-icon icon="mdi-menu" @click="drawer = !drawer" />
    </template>
    <template #default>
      <div class="d-flex w-100 px-2 justify-space-between ga-2 align-center">
        <!-- logo and search bar -->
        <div class="d-flex ga-3 pa-2 align-center">
          <NuxtLink href="/freelancer/dashboard">
            <v-img src="/public/logo.png" width="60" height="50" />
          </NuxtLink>
          <v-text-field
            v-model="search"
            class="d-none d-sm-block"
            prepend-inner-icon="mdi-magnify"
            label="Search"
            hide-details
            rounded="lg"
            width="400"
          >
            <template #append-inner>
              <v-btn
                size="small"
                text="Search jobs"
                variant="elevated"
                :to="`/freelancer/jobs/search-results?search=${search}`"
              />
            </template>
          </v-text-field>
        </div>

        <!-- links -->
        <div
          v-if="!$vuetify.display.mobile"
          class="d-flex justify-center align-center ga-10"
        >
          <p v-for="link in links" :key="link.name" class="text-subtitle-1">
            <NuxtLink
              :href="link.path"
              class="text-decoration-none text-black"
              >{{ link.name }}</NuxtLink
            >
          </p>
        </div>

        <!-- notifications and profile -->
        <div class="d-flex align-center ga-4">
          <v-menu>
            <template #activator="{ props }">
              <v-badge color="primary" dot>
                <v-icon
                  v-bind="props"
                  icon="mdi-bell-outline"
                  size="x-large"
                  color="primary"
                />
              </v-badge>
            </template>
            <v-card
              title="Notifications"
              subtitle="View your notifications"
              width="400"
            >
              <v-list class="mb-3">
                <v-list v-if="false" class="mb-3">
                  <v-list-item
                    v-for="n in []"
                    :key="n"
                    prepend-icon="mdi-circle-small"
                    title="Password Changed"
                    subtitle="Your password has changed"
                  />
                </v-list>
                <p v-else class="ma-3 text-center">You're all caught up!</p>
              </v-list>
            </v-card>
          </v-menu>

          <v-menu>
            <template #activator="{ props }">
              <v-avatar
                v-if="authStore.user"
                v-bind="props"
                :image="profileURL"
              />
            </template>

            <v-card width="300">
              <template #text>
                <v-list-item
                  v-if="authStore.user"
                  :prepend-avatar="profileURL"
                  :title="authStore.user?.full_name"
                  :subtitle="authStore.user?.user_type"
                />

                <v-divider class="mt-3" />

                <v-list>
                  <v-list-item
                    title="My Profile"
                    prepend-icon="mdi-account-outline"
                    :to="{ path: '/freelancer/portfolio' }"
                  />
                  <v-list-item
                    title="Wallet"
                    prepend-icon="mdi-wallet-outline"
                    :to="{ path: '/freelancer/wallet' }"
                  />
                  <v-list-item
                    title="Account Settings"
                    prepend-icon="mdi-cog-outline"
                    :to="{ path: '/freelancer/account-settings' }"
                  />

                  <v-divider class="my-3" />

                  <v-list-item
                    title="Logout"
                    prepend-icon="mdi-logout-variant"
                    @click="logoutUser"
                  />
                </v-list>
              </template>
            </v-card>
          </v-menu>
        </div>
      </div>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-if="$vuetify.display.mobile" v-model="drawer">
    <v-list>
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

const search = ref("");

const drawer = ref(false);
const links = [
  {
    name: "Home",
    path: "/freelancer/dashboard",
  },
  {
    name: "Browse Jobs",
    path: "/freelancer/browse-jobs",
  },
  {
    name: "Bookmarked Jobs",
    path: "/freelancer/bookmarked-jobs",
  },
  {
    name: "Chat",
    path: "/freelancer/chat",
  },
];

const authStore = useAuthStore();

// Logout function
const logoutUser = () => {
  authStore.logout();
};

const config = useRuntimeConfig();
const profileURL = computed(() => {
  const url = authStore.user?.profile_photo_url;
  if (url) {
    if (!url?.includes(config.public.mediaBaseUrl))
      return `${config.public.mediaBaseUrl}${url}`;
    else return url;
  }

  return profileImage(
    authStore.user?.full_name.split(" ")[0] ?? "",
    authStore.user?.full_name.split(" ")?.[1] ?? ""
  );
});
</script>
