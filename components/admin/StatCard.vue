<template>
  <v-card flat rounded="lg" border>
    <template #title>
      <div class="font-weight-light text-subtitle-1 text-xl-h6">{{ title }}</div>
    </template>
    <template #text>
      <div class="d-flex justify-space-between">
        <p class="text-h6 font-weight-medium">{{ text }}</p>
        <v-avatar :icon :color variant="tonal" tile rounded="lg" />
      </div>
    </template>
    <template #actions>
      <div class="w-100 d-flex justify-space-between">
        <slot />
      </div>
    </template>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  text: string;
  icon: string;
  color: string;
}>();
</script>
