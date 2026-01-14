<template>
  <AppDialog
    v-model="giveReviewDialog"
    title="Reviews and Rating"
    subtitle="Give a review about this freelancer you have worked with"
    action-button-text="Send"
    :loading="reviewStore.isLoading"
    @action-button-click="createReview"
  >
    <p class="text-subtitle-1">
      Rate this freelancer and tell others what you think
    </p>
    <v-rating
      v-model="form.rating"
      :size="40"
      active-color="yellow-darken-2"
      color="grey"
      :error-messages="errors.rating"
    />
    <p class="text-subtitle-1">Write a recommendation</p>
    <v-textarea
      v-model="form.comment"
      placeholder="Note"
      counter="200"
      :error-messages="errors.comment"
    />
  </AppDialog>
</template>

<script setup lang="ts">
import { useAppStore } from "~/store/app";
import { useClientReviewsStore } from "~/store/client/reviews";
import type { IJob } from "~/types/client";

const props = defineProps<{
  job: IJob;
}>();
const giveReviewDialog = defineModel<boolean>("modelValue");
const reviewStore = useClientReviewsStore();
const appStore = useAppStore();

const { form, errors, clearErrors, reset, setErrors } = useForm({
  rating: 0,
  recipient: "",
  comment: "",
});

async function createReview() {
  clearErrors();

  if (!props.job.selected_freelancer) {
    appStore.showSnackBar({
      type: "error",
      message: "Unable to find freelancer",
    });
    return;
  }

  form.recipient = props.job.selected_freelancer.username;

  try {
    await reviewStore.createReview(form);
    giveReviewDialog.value = false;
    reset();
  } catch (errors: any) {
    const backendErrors = errors.response?._data;

    if (backendErrors) {
      setErrors(backendErrors);
    }
  }
}
</script>
