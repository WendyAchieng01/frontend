<template>
  <v-data-table-server
    :headers
    :items
    class="my-custom-table elevation-1"
    color="primary"
    :items-length="count"
    @update:page="(pageNumber) => page = pageNumber"
  >
    <template #item.jobs="{ item }">
      <v-list-item :title="item.title">
        <template #subtitle>
          <p class="text-capitalize text-no-wrap">
            {{ item.category_display }}
            <v-icon icon="mdi-circle-small" />
            {{ moment(item.deadline_date).fromNow() }}
          </p>
        </template>
      </v-list-item>
    </template>

    <template #item.status="{ item }">
      <v-chip
        :text="item.status"
        variant="text"
        :prepend-icon="
          item.status === 'open'
            ? 'mdi-check-circle-outline'
            : item.status === 'in_progress'
            ? 'mdi-progress-check'
            : 'mdi-check-circle-outline'
        "
        :color="
          item.status === 'open'
            ? 'primary'
            : item.status === 'in_progress'
            ? 'secondary'
            : 'success'
        "
        class="text-capitalize"
      />
    </template>

    <template #item.application_count="{ item }">
      <v-list-item
        prepend-icon="mdi-account-multiple-outline"
        :subtitle="`${item.application_count} applications`"
        class="text-no-wrap"
      />
    </template>

    <template #item.actions="{ item }">
      <div class="d-flex ga-2 align-center">
        <v-btn
          variant="tonal"
          text="View Applicants"
          :to="`/client/my-jobs/${item.slug}/applications`"
        />

        <v-menu>
          <template #activator="{ props: menuProps }">
            <v-icon v-bind="menuProps" icon="mdi-dots-vertical" />
          </template>

          <v-list class="pa-2">
            <v-list-item
              title="View Job"
              prepend-icon="mdi-eye-outline"
              :to="`/client/my-jobs/${item.slug}`"
            />

            <!-- Delete Job  -->
            <v-list-item
              v-if="['open', 'closed'].includes(item.status)"
              title="Delete Job"
              prepend-icon="mdi-delete-outline"
              @click="
                selectedJob = item;
                deleteJobDialog = true;
              "
            />
            <!-- if job is completed -->
            <v-list-item
              v-if="item.status === 'completed'"
              title="Give Review"
              prepend-icon="mdi-pencil-outline"
              @click="
                selectedJob = item;
                giveReviewDialog = true;
              "
            />
            <v-list-item
              v-if="item.status === 'Completed'"
              title="Request a review"
              prepend-icon="mdi-format-quote-close-outline"
              @click="
                selectedJob = item;
                requestReviewDialog = true;
              "
            />
            <v-list-item
              v-if="item.status === 'In Progress'"
              title="Mark as Completed"
              prepend-icon="mdi-close-circle-outline"
              @click="
                selectedJob = item;
                markCompleteModal = true;
              "
            />
          </v-list>
        </v-menu>
      </div>
    </template>
  </v-data-table-server>

  <!-- give review dialog -->
  <JobClientGiveReview
    v-if="selectedJob"
    v-model="giveReviewDialog"
    :job="selectedJob"
  />
  <!-- request review dialog -->
  <JobClientRequestReview v-model="requestReviewDialog" />
  <!-- mark job completed modal -->
  <AppModal
    v-model="markCompleteModal"
    icon="mdi-check-circle-outline"
    icon-size="80"
    message="You have succesfully marked the job as complete"
    action-text="Confirm"
    @action-click="markCompleteModal = false"
  />
  <!-- delete job modal -->
  <AppModal
    v-model="deleteJobDialog"
    icon="mdi-delete-outline"
    icon-size="80"
    message="Are you sure you want to delete this job? This action cannot be undone."
    action-text="Delete Job"
    :action-color="'error'"
    @action-click="handleDeleteJob"
  />

</template>

<script setup lang="ts">
import moment from "moment";
import type { IJob } from "~/types/client";
import { useClientJobsStore } from "~/store/client/jobs";

const clientJobsStore = useClientJobsStore();


const { jobs: items } = defineProps<{
  jobs: IJob[];
  count: number;
}>();
const page = defineModel<number>("page", { default: 1 });

const headers = [
  {
    title: "JOBS",
    value: "jobs",
  },
  {
    title: "STATUS",
    value: "status",
  },
  {
    title: "APPLICATIONS",
    value: "application_count",
  },
  {
    title: "ACTIONS",
    value: "actions",
  },
];

const selectedJob = ref<IJob | null>(null);
const giveReviewDialog = ref(false);
const requestReviewDialog = ref(false);
const markCompleteModal = ref(false);
const deleteJobDialog = ref(false);


const handleDeleteJob = async () => {
  if (!selectedJob.value) return;
  const slug = selectedJob.value.slug;

  try {
    await clientJobsStore.deleteJob(slug); 
    deleteJobDialog.value = false;


  } catch (error) {
    console.error("Failed to delete job:", error);
  }
};

</script>

<style scoped>
.my-custom-table :deep(thead th) {
  background-color: #ebeafa !important;
}
</style>
