<template>
  <v-app-bar class="pa-2" flat>
    <template v-if="$vuetify.display.mobile" #prepend>
      <v-icon icon="mdi-menu" @click="drawer = !drawer" />
    </template>

    <template #default>
      <div class="d-flex w-100 px-2 justify-space-between ga-2 align-center">
        <!-- Logo and search bar -->
        <div class="d-flex ga-3 pa-2 align-center">
          <NuxtLink href="/freelancer/dashboard">
            <v-img src="/logo.png" width="60" height="50" />
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

        <!-- Navigation links -->
        <div
          v-if="!$vuetify.display.mobile"
          class="d-flex justify-center align-center ga-10"
        >
          <p v-for="link in links" :key="link.name" class="text-subtitle-1">
            <NuxtLink
              :href="link.path"
              class="text-decoration-none text-black"
            >
              {{ link.name }}
            </NuxtLink>
          </p>
        </div>

        <!-- Notifications and profile -->
        <div class="d-flex align-center ga-4">
          <v-menu>
            <template #activator="{ props }">
              <v-avatar v-bind="props" size="40" color="primary">
                <template v-if="profileURL">
                  <v-img :src="profileURL" />
                </template>
                <template v-else>
                  <span class="text-white">
                    {{ authStore.user?.full_name?.[0] ?? "R" }}
                  </span>
                </template>
              </v-avatar>
            </template>

            <v-card width="300">
              <template #text>
                <v-list-item
                  v-if="authStore.user"
                  :prepend-avatar="profileURL"
                  :title="authStore.user?.full_name ?? 'Rayan'"
                  :subtitle="authStore.user?.user_type ?? 'Freelancer'"
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

  <!-- Mobile drawer -->
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
import { ref, computed } from "vue";
import { useAuthStore } from "~/store/auth";

const search = ref("");
const drawer = ref(false);

const links = [
  { name: "Home", path: "/freelancer/dashboard" },
  { name: "Browse Jobs", path: "/freelancer/browse-jobs" },
  { name: "Bookmarked Jobs", path: "/freelancer/bookmarked-jobs" },
  { name: "Chat", path: "/freelancer/chat" },
];

const authStore = useAuthStore();

// Logout function
const logoutUser = () => {
  authStore.logout();
};

// Compute profile image or fallback initials
const config = useRuntimeConfig();
const profileURL = computed(() => {
  const url = authStore.user?.profile_photo_url;
  if (url) {
    if (!url.includes(config.public.mediaBaseUrl))
      return `${config.public.mediaBaseUrl}${url}`;
    else return url;
  }
  return null; // fallback to initials
});
</script>
