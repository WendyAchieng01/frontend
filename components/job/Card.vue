<template>
  <v-card flat>
    <template #text>
      <!-- job title -->
      <div class="d-flex flex-column flex-sm-row justify-space-between">
        <div>
          <p class="text-caption text-medium-emphasis">
            {{ moment(job.posted_date).fromNow() }}
            <v-icon icon="mdi-circle-small" />
            {{ job.client_review_count }} Bids
          </p>
          <p class="text-h6">
            {{ job.title }}
          </p>
          <p class="text-caption text-medium-emphasis text-capitalize">
            {{ job.preferred_freelancer_level }} Level
            <v-icon icon="mdi-circle-small" />
            {{ formatAmount(job.price ?? 0) }}
            <v-icon icon="mdi-circle-small" />
            {{ moment(job.deadline_date).diff(job.posted_date, "days") }} days
          </p>
        </div>

        <div class="d-flex ga-2 my-2 my-sm-0">
          <!-- Bookmark button -->
          <v-btn
            variant="outlined"
            :size="$vuetify.display.mobile ? 'default' : 'large'"
            class="pa-0"
            :loading="jobStore.isBookMarking"
            @click="job.bookmarked ? removeBookMark() : markBookMark()"
          >
            <v-icon
              :icon="job.bookmarked ? 'mdi-heart' : 'mdi-heart-outline'"
              size="x-large"
              :color="job.bookmarked ? 'red' : 'grey'"
            />
          </v-btn>

          <!-- View Job button -->
          <v-btn
            text="View Job"
            :size="$vuetify.display.mobile ? 'default' : 'large'"
            class="text-subtitle-2"
            :width="$vuetify.display.mobile ? undefined : '150'"
            :to="`/freelancer/jobs/${job.slug}`"
          />

          <!-- Withdraw button for applied jobs -->
          <v-btn
            v-if="job.has_applied"
            color="red"
            variant="outlined"
            :size="$vuetify.display.mobile ? 'default' : 'large'"
            :width="$vuetify.display.mobile ? undefined : '150'"
            :loading="withdrawing"
            @click="withdrawApplication"
          >
            Withdraw
          </v-btn>

        </div>
      </div>

      <!-- job description -->
      <p v-if="job.has_applied" class="font-weight-bold text-success">
        Applied
      </p>
      <p class="mt-4 text-subtitle-1">
        {{ job.description }}
      </p>
      <div class="d-flex ga-2 mt-3">
        <v-chip
          v-for="skill in job.skills_required_display"
          :key="skill.id"
          :text="skill.name"
          class="text-medium-emphasis text-capitalize"
        />
      </div>

      <!-- deadline and client rating -->
      <div class="d-flex ga-3 mt-5 text-medium-emphasis">
        <p class="text-subtitle-1">
          Deadline: {{ moment(job.posted_date).format("Do MMMM YYYY") }}
        </p>
        <div class="d-flex align-center ga-2">
          <p class="text-subtitle-1">Client Rating:</p>
          <v-rating
            readonly
            :size="25"
            :model-value="job.client_rating"
            active-color="yellow-darken-2"
          />
        </div>
      </div>
    </template>
  </v-card>
</template>

<script setup lang="ts">
import moment from "moment";
import type { IFreelancerJobListing } from "~/types/freelancer";
import { useFreelancerJobsStore } from "~/store/freelancer/jobs";

const props = defineProps<{ job: IFreelancerJobListing }>();
const jobStore = useFreelancerJobsStore();

const withdrawing = ref(false);

// Bookmark handlers
async function markBookMark() {
  await jobStore.bookmarkJob(props.job.slug);
}
async function removeBookMark() {
  await jobStore.removeBookmarkJob(props.job.slug);
}

async function withdrawApplication() {
  if (!props.job.slug) return;

  try {
    withdrawing.value = true;
    await jobStore.withdrawApplication(props.job.slug);

    //update UI immediately
    props.job.has_applied = false;
  } catch (error) {
    console.log("Failed to withdraw application:", error);
  } finally {
    withdrawing.value = false;
  }
}

</script>
