<template>
  <v-row>
    <v-col cols="8">
      <v-btn
        variant="text"
        prepend-icon="mdi-chevron-left"
        text="Back"
        to="/admin/jobs/all"
      />

      <div class="d-flex mt-4 justify-space-between">
        <h1>12289</h1>
        <div class="d-flex ga-2">
          <!-- <v-btn text="Mark as Complete" @click="markCompleteModal = true" /> -->
          <v-btn
            variant="outlined"
            icon="mdi-flag-outline"
            size="small"
            @click="flagJobDialog = true"
          />
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
            <div class="text-h6">{{ step.title }}</div>
            <p class="text-subtitle-1 text-medium-emphasis">{{ step.text }}</p>
          </div>
        </v-timeline-item>
      </v-timeline>

      <p class="text-subtitle-2 text-medium-emphasis mt-5">Job Title</p>
      <p class="text-h6">UI/UX Design of a responsive website</p>

      <p class="text-subtitle-2 text-medium-emphasis mt-4">Budget</p>
      <p class="text-h6">KES 20,000</p>

      <p class="text-subtitle-2 text-medium-emphasis mt-4">Start Date</p>
      <p class="text-h6">02/04/25</p>

      <p class="text-subtitle-2 text-medium-emphasis mt-4">End Date</p>
      <p class="text-h6">09/04/25</p>

      <p class="text-subtitle-2 text-medium-emphasis mt-4">End Date</p>
      <v-btn disabled color="grey" text="In Progress" />
      <p class="text-subtitle-2 text-medium-emphasis mt-4">
        Client Payment Status
      </p>
      <v-btn disabled color="warning" text="Pending" />
    </v-col>

    <v-divider vertical />

    <v-col>
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
        <p class="text-medium-emphasis font-weight-bold text-subtitle-1 mt-4">
          <v-icon icon="mdi-map-marker-outline" />
          Nairobi, Kenya
        </p>
        <p class="text-medium-emphasis font-weight-bold text-subtitle-1 mt-4">
          UI/UX Designer
        </p>
        <p class="text-medium-emphasis font-weight-bold text-subtitle-1 mt-4">
          Total Jobs Done: 12
        </p>
        <p class="text-medium-emphasis text-caption mt-4">
          Member since April 2024
        </p>
      </div>

      <v-btn text="View Profile" class="mt-5" />

      <p class="text-h6 mt-5">About Client</p>
      <v-divider class="my-2" />

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
        <p class="text-medium-emphasis text-subtitle-1 mt-4">
          <v-icon icon="mdi-map-marker-outline" />
          Nairobi, Kenya
        </p>
        <p class="text-medium-emphasis text-subtitle-1 mt-4">
          Total Jobs Posted: 28
        </p>
        <p class="text-medium-emphasis text-subtitle-1 mt-4">
          Total Money Spent: KES 20,000
        </p>
        <p class="text-medium-emphasis text-subtitle-1 mt-4">Total Hires: 34</p>
        <p class="text-medium-emphasis text-caption mt-4">
          Member since April 2024
        </p>

        <v-btn text="View Profile" class="mt-5" />
      </div>
    </v-col>

    <!-- flag job dialog -->
    <AppDialog
      v-model="flagJobDialog"
      title="Suspend"
      subtitle="Suspend Job"
      action-button-text="Submit"
      action-button-color="error"
    >
      <v-text-field label="Job ID" />
      <v-select label="Client Name" />
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
  </v-row>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const markCompleteModal = ref(false);

const breadCrumbItems = [
  {
    title: "Home",
    href: "/client/dashboard",
  },
  {
    title: "All Jobs",
    href: "/admin/jobs/all",
  },
  {
    title: "12289",
    href: "",
  },
];

const timeLineItems = [
  {
    title: "Job Open",
    text: "Client has posted a job",
    completed: true,
  },
  {
    title: "In Progress",
    text: "Client has made payment and Freelancer has started working on the project",
    completed: true,
  },
  {
    title: "Completed",
    text: "Client has confirmed the completion of this job",
    completed: true,
  },
  {
    title: "Freelancer Paid",
    text: "Freelancers fee has been paid",
    completed: false,
  },
];

const flagJobDialog = ref(false);
</script>
