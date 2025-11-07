<template>
  <v-app-bar class="pa-2" flat>
    <template v-if="$vuetify.display.mobile" #prepend>
      <v-icon
        icon="mdi-menu"
        @click="
          appStore.clientNavigationDrawer = !appStore.clientNavigationDrawer
        "
      />
    </template>
    <template #default>
      <div class="d-flex w-100 px-2 justify-space-between ga-2 align-center">
        <!-- search bar -->
        <div class="d-flex ga-3 pa-2 align-center">
          <!-- <v-img src="/public/logo.png" width="60" height="50" /> -->
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            label="Search"
            hide-details
            rounded="pill"
            width="400"
            density="compact"
            variant="solo-filled"
            flat
            class="d-none d-sm-block"
          />
        </div>

        <!-- notifications and profile -->
        <div class="d-flex align-center ga-6">
          <v-menu>
            <template #activator="{ props }">
              <v-badge color="error" content="0">
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
            </v-card>
          </v-menu>

          <v-btn
            text="Post A Job"
            variant="outlined"
            to="/client/new-job"
            class="d-none d-sm-flex"
          />

          <v-menu>
            <template #activator="{ props }">
              <v-list-item
                v-bind="props"
                :prepend-avatar="profileURL"
                :title="user?.full_name"
                :subtitle="user?.email"
              />
              <!-- <v-avatar v-bind="props" image="https://i.pravatar.cc?img=10" /> -->
            </template>

            <v-card width="300">
              <template #text>
                <v-list-item
                  :prepend-avatar="profileURL"
                  :title="user?.full_name"
                  :subtitle="user?.email"
                />

                <v-divider class="mt-3" />

                <v-list>
                  <v-list-item
                    title="My Profile"
                    prepend-icon="mdi-account-outline"
                    :to="{ path: '/client/profile' }"
                  />
                  <v-list-item
                    title="Wallet"
                    prepend-icon="mdi-wallet-outline"
                    :to="{ path: '/client/wallet' }"
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
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app";
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const appStore = useAppStore();
const { user } = storeToRefs(authStore);

const config = useRuntimeConfig();
const profileURL = computed(() => {
  if (user.value?.profile_photo_url) {
    const url = user.value?.profile_photo_url;
    if (url.includes(config.public.mediaBaseUrl)) return url;
    else return `${config.public.mediaBaseUrl}${url}`;
  } else
    return profileImage(
      user.value?.full_name.split(" ")[0] ?? "",
      user.value?.full_name.split(" ")?.[1] ?? ""
    );
});

// Logout function
const logoutUser = () => {
  authStore.logout();
};
</script>
