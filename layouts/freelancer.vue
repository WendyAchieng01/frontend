<template>
  <v-app>
    <v-layout>
      <FreelancerHeader />
      <v-main>
        <v-container class="mt-5">
          <slot />
        </v-container>
      </v-main>
      <AppFooter />
    </v-layout>
  </v-app>
</template>

<script setup lang="ts"></script>
