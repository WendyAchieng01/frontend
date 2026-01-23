<template>
  <p class="text-disabled text-body-1 mt-15">
    Companies we've worked with
  </p>

  <v-row class="mt-5">
    <v-col
      v-for="company in companies"
      :key="company.name"
      cols="12"
      sm="6"
      md="4"
    >
      <v-card elevation="0" class="h-100">
        <div class="pa-5 d-flex align-center justify-center" style="min-height: 120px">
          <div class="text-center">
            <v-icon
              :icon="company.icon"
              size="50"
              color="primary"
              class="mb-2"
            />
            <p class="text-h6 font-weight-medium">
              {{ company.name }}
            </p>
            <p class="text-caption text-disabled">
              {{ company.industry }}
            </p>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>


<script setup lang="ts">
const companies = [
  {
    name: "#",
    industry: " #",
    icon: "#",
  }
];
</script>
