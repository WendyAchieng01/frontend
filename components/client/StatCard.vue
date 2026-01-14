<template>
  <v-card :color="stat.color" variant="tonal" min-width="300" rounded>
    <template #text>
      <div class="d-flex pa-4 justify-space-between">
        <div class="text">
          <p class="text-h5 font-weight-medium text-black">{{ stat.title }}</p>
          <p class="text-subtitle-2 text-black">{{ stat.subtitle }}</p>
        </div>

        <v-avatar tile size="large" class="icon-avatar rounded">
          <v-icon :icon="stat.icon" color="primary" />
        </v-avatar>
      </div>
    </template>
  </v-card>
</template>

<script setup lang="ts">
const { stat } = defineProps<{
  stat: {
    color: string;
    title: string | number;
    subtitle: string;
    icon: string;
  };
}>();
</script>

<style scoped>
.icon-avatar {
  background-color: #f9f9f9;
  z-index: 10;
}
</style>
