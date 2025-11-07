<template>
  <AppDialog
    v-model="requestReviewDialog"
    title="Invite a freelancer to give you a review"
    subtitle="Write something personal to get a review"
    action-button-text="Send"
  >
    <p class="text-subtitle-1">Select a freelancer's name</p>
    <v-text-field placeholder="Enter Name" />
    <p class="text-subtitle-1">
      Write a message to ask for a review (200 words)
    </p>
    <v-textarea placeholder="Note" />
  </AppDialog>
</template>

<script setup lang="ts">
const requestReviewDialog = defineModel<boolean>("modelValue", {
  default: false,
});
</script>
