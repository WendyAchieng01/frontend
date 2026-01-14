<template>
  <div class="d-flex justify-center align-center w-100 icon-effect-wrapper">
    <v-icon
      icon="mdi-check-circle-outline"
      color="primary"
      size="x-large"
      class="main-icon"
    />
  </div>

  <h1 class="text-h4 font-weight-medium mt-7 text-center">Password Reset</h1>

  <p class="text-subtitle-1 mt-7 text-center">
    Your password has been succesfully reset. Click below to login.
  </p>

  <v-btn
    text="Continue"
    class="text-subtitle-2 mt-7"
    size="large"
    type="submit"
    block
    :to="{ path: '/auth/login' }"
  />

  <!-- go back -->
  <div class="d-flex justify-center">
    <v-btn
      class="mt-5"
      text="Back to log in"
      size="small"
      variant="text"
      prepend-icon="mdi-arrow-left"
      :to="{ path: '/auth/login' }"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
</script>

<style scoped>
.icon-effect-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
}

.main-icon {
  position: relative;
  z-index: 1;
}

.icon-effect-wrapper::before,
.icon-effect-wrapper::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  z-index: 0;
  background-color: rgba(88, 83, 224, var(--ring-opacity));
}

/* Outer Ring (Larger, more transparent) */
.icon-effect-wrapper::before {
  /* Adjust width/height - must be larger than the inner ring */
  width: 110px;
  height: 110px;
  background-color: rgba(88, 83, 224, 0.08); /* Adjust opacity (alpha value) */
}

/* Inner Ring (Smaller, less transparent) */
.icon-effect-wrapper::after {
  /* Adjust width/height - must be smaller than ::before but larger than icon */
  width: 85px; /* Needs to contain the icon + some space */
  height: 85px;
  background-color: rgba(88, 83, 224, 0.15); /* Adjust opacity (alpha value) */
}
</style>
