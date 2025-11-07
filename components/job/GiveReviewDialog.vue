<template>
  <AppDialog
    v-model="giveReviewDialog"
    title="Review a Client"
    subtitle="Give a review about a client you have worked with"
    action-button-text="Send"
  >
    <p class="text-subtitle-1">Select Client's Name</p>
    <v-text-field placeholder="Enter Client's Name" />
    <p class="text-subtitle-1">Write a recommendation</p>
    <v-textarea placeholder="Note" counter="200" />
    <p class="text-subtitle-1">Select Rating</p>
    <v-rating :size="25" :model-value="5" active-color="yellow-darken-2" />
  </AppDialog>
</template>

<script setup lang="ts">
const giveReviewDialog = defineModel<boolean>("modelValue");
</script>
