<template>
  <v-snackbar
    location="top right"
    multi-line
    v-model="snackBarData.visible"
    :color="snackBarData.type"
  >
    <v-list-item
      :subtitle="truncateMessage(snackBarData.message)"
      :prepend-icon="snackBarIcon"
    />
  </v-snackbar>
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app";
const { snackBarData } = useAppStore();

function truncateMessage(message: string) {
  if (message.length <= 80) return message;
  else return message.slice(0, 80) + "...";
}
const snackBarIcon = computed(() => {
  switch (snackBarData.type) {
    case "success":
      return "mdi-check-circle-outline";
    case "error":
      return "mdi-close-circle-outline";
    case "warning":
      return "mdi-alert-circle-outline";
    case "info":
      return "mdi-information-variant";
    default:
      return "mdi-information-variant";
  }
});
</script>
