<template>
  <v-data-table :headers :items show-select class="border rounded-lg">
    <template #item.paymentStatus="{ item }">
      <v-chip
        variant="text"
        :text="item.paymentStatus"
        :color="item.paymentStatus === 'Paid' ? 'success' : 'warning'"
      />
    </template>
    <template #item.jobStatus="{ item }">
      <v-chip
        variant="tonal"
        :text="item.jobStatus"
        :color="item.jobStatus === 'Completed' ? 'success' : 'warning'"
        tile
        rounded="sm"
      />
    </template>
    <template #item.actions>
      <div class="d-flex ga-2">
        <v-btn
          icon="mdi-eye-outline"
          variant="outlined"
          size="small"
          color=""
          to="/admin/jobs/12289"
        />
        <v-btn
          icon="mdi-flag-outline"
          variant="outlined"
          size="small"
          color=""
          @click="flagJobDialog = true"
        />
      </div>
    </template>
  </v-data-table>

  <!-- flag job dialog -->
  <AppDialog
    v-model="flagJobDialog"
    title="Suspend"
    subtitle="Suspend Job"
    action-button-text="Suspend"
    action-button-color="error"
  >
    <v-text-field label="Job ID" />
    <v-select label="Client Name" />
    <v-textarea label="Add a reason" />
  </AppDialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  hideActions?: boolean;
}>();

const headers = computed(() => {
  const initialHeaders = [
    {
      title: "Job ID",
      value: "id",
    },
    {
      title: "Client Name",
      value: "client",
    },
    {
      title: "Freelancers",
      value: "freelancer",
    },
    {
      title: "Start Date",
      value: "startDate",
    },
    {
      title: "End Date",
      value: "endDate",
    },
    {
      title: "Budget",
      value: "budget",
    },
    {
      title: "Payment Status",
      value: "paymentStatus",
    },
    {
      title: "Job Status",
      value: "jobStatus",
    },
  ];

  if (!props.hideActions)
    initialHeaders.push({
      title: "Actions",
      value: "actions",
    });

  return [...initialHeaders];
});

const items = Array.from({ length: 5 }, (_, index) => {
  const paymentStatus = index % 2 === 0 ? "Paid" : "Pending";
  const jobStatus = index % 2 === 0 ? "Completed" : "In Progress";
  return {
    id: 34234,
    paymentStatus,
    jobStatus,
    client: "John Willis",
    freelancer: "Amos David",
    budget: "KES 20,000",
    startDate: "02/04/2025",
    endDate: "09/04/2025",
    time: "12:00 Am",
  };
});

const flagJobDialog = ref(false);
</script>
