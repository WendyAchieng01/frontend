<template>
  <p class="text-disabled text-body-1 mt-15">Companies we helped grow</p>
  <div class="d-flex ga-2 mt-5">
    <v-card v-for="n in 4" :key="n" elevation="0" width="100%">
      <div class="pa-5">
        <v-img
          src="https://kimcardtechnologies.com/assets/img/clients/client-6.png"
          width="100%"
          height="70"
        />
      </div>
    </v-card>
  </div>
</template>
