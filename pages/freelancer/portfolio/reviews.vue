<template>
  <div>
    <v-btn
      text="Back"
      prepend-icon="mdi-chevron-left"
      variant="text"
      :to="{ path: '/freelancer/portfolio' }"
    />

    <div class="d-flex mt-5 justify-space-between">
      <p class="text-h5 mt-5">Reviews and Recommendations</p>
      <v-menu>
        <!-- <template #activator="{ props }">
          <v-icon
            v-bind="props"
            icon="mdi-plus-circle-outline"
            size="small"
            color="primary"
          />
        </template> -->

        <v-list class="pa-2">
          <v-list-item
            title="Give Review"
            prepend-icon="mdi-pencil-outline"
            @click="giveReviewDialog = true"
          />
          <v-list-item
            title="Request for a review"
            prepend-icon="mdi-format-quote-close-outline"
            @click="requestReviewDialog = true"
          />
        </v-list>
      </v-menu>
    </div>

    <!-- <v-tabs class="mt-5">
      <v-tab>Reviews Received</v-tab>
      <v-tab>Reviews Sent</v-tab>
    </v-tabs> -->

    <v-card
      v-for="review in receivedReviews"
      :key="review.id"
      :title="review.reviewer"
      subtitle="Client"
      flat
    >
      <template #text>
        <div class="d-flex align-center ga-2 mb-2">
          <p class="text-subtitle-1">Rating:</p>
          <v-rating
            :size="25"
            :model-value="review.rating"
            active-color="yellow-darken-2"
          />
        </div>
        <v-row>
          <v-col cols="12">
            {{ review.comment }}
          </v-col>
          <v-col cols="4">
            <div class="d-flex ga-5">
              <!-- <v-switch label="Off" width="100" height="100" color="primary" /> -->
              <!-- <v-btn
                text="Edit"
                size="large"
                width="150"
                @click="correctReviewDialog = true"
              /> -->
            </div>
          </v-col>
        </v-row>
      </template>
    </v-card>

    <!-- give review dialog -->
    <JobGiveReviewDialog v-model="giveReviewDialog" />

    <!-- request review dialog -->
    <JobRequestReviewDialog v-model="requestReviewDialog" />

    <!-- client correct review dialog -->
    <AppDialog
      v-model="correctReviewDialog"
      title="Invite a client to correct a review"
      subtitle="Write something personal to get the correction you need"
      action-button-text="Send"
    >
      <p class="text-subtitle-1">Write a message to John</p>
      <v-textarea placeholder="Note" />
    </AppDialog>
  </div>
</template>

<script setup lang="ts">
import { useFreelancerReviewsStore } from '~/store/freelancer/reviews';

definePageMeta({
  layout: "freelancer",
});

const reviewStore = useFreelancerReviewsStore();
onMounted( async () => await reviewStore.fetchReceivedReviews())
const { receivedReviews } = storeToRefs(reviewStore);
const giveReviewDialog = ref(false);
const requestReviewDialog = ref(false);
const correctReviewDialog = ref(false);
</script>
