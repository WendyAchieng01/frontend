<template>
  <div>
    <h1 class="text-h5 mt-10">Find jobs you might like</h1>
    <p class="text-subtitle-1 text-medium-emphasis mt-2">
      Over 500+ jobs just for you. Send a bid to stand a chance of being hired.
    </p>

    <div class="mt-10" />
    <!-- search and filter -->
    <JobSearch v-model:search="search" v-model:filters="filters" />

    <!-- browse jobs -->
    <JobBrowse :search :filters />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "freelancer",
});

const search = ref("");
const filters = ref({});
</script>
