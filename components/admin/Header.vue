<template>
  <v-app-bar class="pa-2" flat>
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
          />
        </div>

        <!-- notifications and profile -->
        <div class="d-flex align-center ga-6">
          <v-menu>
            <template #activator="{ props }">
              <v-badge color="error" content="12">
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
                <v-list-item
                  prepend-icon="mdi-circle-small"
                  title="Password Changed"
                  subtitle="Your password has changed"
                />
                <v-list-item
                  prepend-icon="mdi-circle-small"
                  title="New Job"
                  subtitle="A new job has been posted"
                />
                <v-list-item
                  prepend-icon="mdi-circle-small"
                  title="New Message"
                  subtitle="You have a new message"
                />
                <v-list-item
                  prepend-icon="mdi-circle-small"
                  title="Application Status"
                  subtitle="Your application has been reviewed"
                />
                <v-list-item
                  prepend-icon="mdi-circle-small"
                  title="Job Update"
                  subtitle="A job you applied for has been updated"
                />
              </v-list>
            </v-card>
          </v-menu>

          <v-menu>
            <template #activator="{ props }">
              <v-list-item
                v-bind="props"
                title="Admin"
                subtitle="admin@mail.com"
                prepend-avatar="https://i.pravatar.cc?img=10"
                append-icon="mdi-chevron-down-circle-outline"
              />
              <!-- <v-avatar v-bind="props" image="https://i.pravatar.cc?img=10" /> -->
            </template>

            <v-card width="300">
              <template #text>
                <v-list-item
                  prepend-avatar="https://i.pravatar.cc?img=10"
                  :title="user?.name"
                  :subtitle="user?.type"
                />

                <v-divider class="mt-3" />

                <v-list>
                  <v-list-item
                    title="My Profile"
                    prepend-icon="mdi-account-outline"
                    :to="{ path: '/admin/profile' }"
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
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app";
const { user, clear: clearClientSession } = useUserSession();

const appStore = useAppStore();
async function logoutUser() {
  try {
    await $fetch("/api/logout", { method: "POST" });
    await clearClientSession();
    await navigateTo("/auth/login");
  } catch (error) {
    console.log("LOGOUT error: ", error);
    appStore.showSnackBar({
      message: error.data.message,
      type: "error",
    });
  }
}
</script>
