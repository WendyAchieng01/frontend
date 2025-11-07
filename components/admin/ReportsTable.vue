<template>
  <v-data-table :headers :items show-select class="border rounded-lg" />
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
      title: "Email",
      value: "email",
    },
    {
      title: "Date Joined",
      value: "dateJoined",
    },
    {
      title: "Jobs",
      value: "jobs",
    },
  ];

  if (!props.hideActions)
    initialHeaders.push({
      title: "Actions",
      value: "actions",
    });

  return [...initialHeaders];
});

const items = Array.from({ length: 5 }, () => {
  return {
    id: 34234,
    client: "John Willis",
    email: "johnwillis20@gmail.com",
    dateJoined: "12/5/2015",
    jobs: "20",
  };
});
</script>
