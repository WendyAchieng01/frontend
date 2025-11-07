<template>
  <div>
    <h1 class="text-h5 font-weight-medium mb-5">Post a Job</h1>
    <ClientAddEditJob @post-job="postUnsuccesfulModal = true" />

    <!-- posting unsuccesful -->
    <AppModal
      v-model="postUnsuccesfulModal"
      icon="mdi-emoticon-sad-outline"
      color="error"
      icon-size="80"
      title="Job posting unsuccesful"
      message="Sorry you do not have enough money to continue on your payment please recharge your wallet."
      action-text="Recharge Wallet"
      @action-click="
        postUnsuccesfulModal = false;
        addFundsDialog = true;
      "
    />

    <!-- post success modal -->
    <AppModal
      v-model="postSuccessDialog"
      title="🎊 Congratulations, your job is succesfully posted"
      message="You can manage your jobs in my job section in the dashboard"
      action-text="View Jobs"
      @action-click="navigateTo('/client/my-jobs')"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "client",
});

const postUnsuccesfulModal = ref(false);
const postSuccessDialog = ref(false);
const addFundsDialog = ref(false);
</script>
