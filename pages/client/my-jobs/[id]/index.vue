<template>
  <v-row>
    <v-col cols="12">
      <v-btn
        variant="text"
        prepend-icon="mdi-chevron-left"
        text="Back"
        to="/client/my-jobs"
      />

      <div class="d-flex mt-4 justify-space-between">
        <h1>{{ clientJobStore.currentJob?.title }}</h1>
        <div class="d-flex ga-2">
          <v-btn
            v-if="
              clientJobStore.currentJob?.payment_verified &&
              clientJobStore.currentJob?.status !== 'completed'
            "
            text="Mark as Complete"
            @click="markAsComplete"
          />
          <v-btn
            v-if="!clientJobStore.currentJob?.payment_verified"
            text="Add Funds"
            @click="addFundsDialog = true"
          />
          <!-- <v-btn
            variant="outlined"
            icon="mdi-flag-outline"
            size="small"
            @click="flagJobDialog = true"
          /> -->
        </div>
      </div>
      <v-breadcrumbs :items="breadCrumbItems" divider=">" />

      <v-timeline
        direction="horizontal"
        side="end"
        dot-color="primary"
        class="mt-5"
      >
        <v-timeline-item v-for="step in timeLineItems" :key="step.title">
          <template #icon>
            <v-icon
              :icon="step.completed ? 'mdi-check' : 'mdi-circle-medium'"
            />
          </template>
          <div>
            <div class="text-h6 text-center">{{ step.title }}</div>
            <p class="text-subtitle-1 text-medium-emphasis text-center">
              {{ step.text }}
            </p>
          </div>
        </v-timeline-item>
      </v-timeline>

      <v-row class="mt-5">
        <v-col cols="12" md="6">
          <p class="text-subtitle-2 text-medium-emphasis mt-5">Job Title</p>
          <p class="text-h6">{{ clientJobStore.currentJob?.title }}</p>

          <p class="text-subtitle-2 text-medium-emphasis mt-4">Budget</p>
          <p class="text-h6">
            {{ formatAmount(clientJobStore?.currentJob?.price ?? 0) }}
          </p>

          <p class="text-subtitle-2 text-medium-emphasis mt-4">Posted Date</p>
          <p class="text-h6">
            {{
              moment(clientJobStore.currentJob?.posted_date).format(
                "Do MMMM YYYY"
              )
            }}
          </p>

          <p class="text-subtitle-2 text-medium-emphasis mt-4">Deadline Date</p>
          <p class="text-h6">
            {{
              moment(clientJobStore.currentJob?.deadline_date).format(
                "Do MMMM YYYY"
              )
            }}
          </p>

          <v-btn
            class="mt-2"
            :disabled="clientJobStore.currentJob?.status == 'open'"
            color="grey"
            :text="clientJobStore.currentJob?.status"
          />
        </v-col>

        <!-- <v-divider vertical />

        <v-col v-if="clientJobStore.currentJob?.selected_freelancer">
          <p class="text-h6">About Freelancer</p>
          <v-list-item
            title="Kathryn Murphy"
            prepend-avatar="https://i.pravatar.cc?img=45"
          >
            <template #append>
              <v-icon icon="mdi-check-decagram" color="green-darken-4" />
            </template>
          </v-list-item>

          <div class="pa-2 ml-2">
            <div class="d-flex align-center ga-2">
              <p class="text-subtitle-1">Client Rating:</p>
              <v-rating
                :size="25"
                :model-value="5"
                active-color="yellow-darken-2"
              />
            </div>
            <p
              class="text-medium-emphasis font-weight-bold text-subtitle-1 mt-4"
            >
              <v-icon icon="mdi-map-marker-outline" />
              Nairobi, Kenya
            </p>
            <p
              class="text-medium-emphasis font-weight-bold text-subtitle-1 mt-4"
            >
              UI/UX Designer
            </p>
            <p
              class="text-medium-emphasis font-weight-bold text-subtitle-1 mt-4"
            >
              Total Jobs Done: 12
            </p>
            <p class="text-medium-emphasis text-caption mt-4">
              Member since April 2024
            </p>
          </div>

          <v-btn text="View Profile" class="mt-5" />
        </v-col> -->
      </v-row>
    </v-col>

    <!-- flag job dialog -->
    <AppDialog
      v-model="flagJobDialog"
      title="Flag Job"
      subtitle="Raise a concern"
      action-button-text="Submit"
    >
      <v-textarea label="Add a reason" />
    </AppDialog>

    <!-- mark job complete modal -->
    <AppModal
      v-model="markCompleteModal"
      icon="mdi-check-circle-outline"
      icon-size="80"
      message="You have succesfully marked the job as complete"
      action-text="Confirm"
      @action-click="markCompleteModal = false"
    />

    <!-- add funds dialog -->
    <ClientAddFundsDialog
      v-if="clientJobStore.currentJob"
      v-model="addFundsDialog"
      :job="clientJobStore.currentJob"
    />
  </v-row>
</template>

<script setup lang="ts">
import moment from "moment";
import { useClientJobsStore } from "~/store/client/jobs";
import { useAppStore } from "~/store/app";

definePageMeta({
  layout: "client",
});

const { $apiClient } = useNuxtApp();
const addFundsDialog = ref(false);

const clientJobStore = useClientJobsStore();
const route = useRoute();
onMounted(async () => {
  await clientJobStore.fetchJobDetails(route.params.id as string);
});

// watch payment response parameters and show appropriate error message
const appStore = useAppStore();
watch(
  () => route.query,
  (newQuery) => {
    const success = newQuery?.success as "true" | "false" | undefined;
    const message = newQuery?.message as string | undefined;

    if (success && message) {
      if (success == "true")
        appStore.showSnackBar({
          type: "success",
          message,
        });
      else
        appStore.showSnackBar({
          type: "error",
          message,
        });

      // Make call to backend - I also do not know why, the backend kinda depends on it
      $apiClient(
        `/jobs/${route.params.id}/?success=${success}&message=${message}`
      );
    }
  },
  { immediate: true }
);

const breadCrumbItems = computed(() => [
  {
    title: "Home",
    href: "/client/dashboard",
  },
  {
    title: "All Jobs",
    href: "/client/my-jobs",
  },
  {
    title: clientJobStore.currentJob?.title ?? "Job Details",
    href: "",
  },
]);

const timeLineItems = computed(() => [
  {
    title: "Job Open",
    text: "Client has posted a job",
    completed: true,
  },
  {
    title: "Payment has been made",
    text: "Client has made payment",
    completed: clientJobStore.currentJob?.payment_verified,
  },
  {
    title: "In Progress",
    text: "Freelancer has started working on the project",
    completed:
      clientJobStore.currentJob?.status === "in_progress" ||
      clientJobStore.currentJob?.status === "completed",
  },
  {
    title: "Completed",
    text: "Client has confirmed the completion of this job",
    completed: clientJobStore.currentJob?.status === "completed",
  },
  {
    title: "Freelancer Paid",
    text: "Freelancers fee has been paid",
    completed: false,
  },
]);

const flagJobDialog = ref(false);

// mark job as complete
const markCompleteModal = ref(false);
function markAsComplete() {
  if (!clientJobStore.currentJob) {
    console.error("No current job to mark as complete.");
    return;
  }

  clientJobStore
    .markJobAsCompleted(clientJobStore.currentJob)
    .then(async () => {
      markCompleteModal.value = true;
      await clientJobStore.fetchJobDetails(route.params.id as string);
    })
    .catch((error) => {
      console.error("Failed to mark job as complete:", error);
    });
}
</script>
