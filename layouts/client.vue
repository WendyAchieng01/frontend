<template>
  <v-app>
    <v-layout>
      <ClientSideBar />
      <ClientHeader />
      <v-main>
        <v-container class="mt-5">
          <slot />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts"></script>
