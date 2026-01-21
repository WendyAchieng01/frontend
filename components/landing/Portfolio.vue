<template>
  <p class="text-disabled text-body-1 mt-15">Companies we've worked with</p>
  <div class="d-flex ga-2 mt-5 flex-wrap">
    <v-card v-for="company in companies" :key="company.name" elevation="0" width="23%">
      <div class="pa-5 d-flex align-center justify-center" style="min-height: 120px">
        <div class="text-center">
          <v-icon :icon="company.icon" size="50" color="primary" class="mb-2" />
          <p class="text-h6 font-weight-medium">{{ company.name }}</p>
          <p class="text-caption text-disabled">{{ company.industry }}</p>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
const companies = [
  {
    name: "TechVenture",
    industry: "Technology",
    icon: "mdi-rocket-launch",
  },
  {
    name: "DataFlow Solutions",
    industry: "Data Analytics",
    icon: "mdi-chart-line",
  },
  {
    name: "CloudSync",
    industry: "Cloud Services",
    icon: "mdi-cloud-outline",
  },
  {
    name: "InnovateLabs",
    industry: "Software Development",
    icon: "mdi-lightbulb-on",
  },
  {
    name: "GlobalConnect",
    industry: "E-commerce",
    icon: "mdi-cart-outline",
  },
  {
    name: "FinanceHub",
    industry: "Financial Services",
    icon: "mdi-bank",
  },
  {
    name: "MediaCraft",
    industry: "Digital Marketing",
    icon: "mdi-camera",
  },
  {
    name: "EduTech Pro",
    industry: "Education",
    icon: "mdi-school",
  },
];
</script>