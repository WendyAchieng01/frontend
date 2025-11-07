<template>
  <v-app>
    <v-layout>
      <AdminSidebar />
      <AdminHeader />
      <v-main>
        <v-container class="mt-5">
          <slot />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>
