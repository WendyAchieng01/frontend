<template>
  <div>
    <h1 class="text-h4 font-weight-medium">
      Create your account with us below
    </h1>

    <p class="text-subtitle-1 mt-7">
      Already have an account? <NuxtLink to="/auth/login">Login Now</NuxtLink>
    </p>

    <p class="subtile-1 mt-7">You're creating an account as?</p>

    <v-radio-group v-model="accountType" class="mt-5">
      <v-chip-group
        v-model="accountType"
        base-color="grey"
        color="primary"
        class="d-flex flex-column flex-sm-row ga-5"
        :column="$vuetify.display.mobile"
      >
        <v-chip
          size="x-large"
          variant="outlined"
          rounded="lg"
          class="w-100 w-sm-50 py-7"
          border="thin"
          value="freelancer"
        >
          <v-radio label="Freelancer" value="freelancer" />
        </v-chip>
        <v-chip
          size="x-large"
          variant="outlined"
          rounded="lg"
          class="w-100 w-sm-50 py-7"
          border="thin"
          value="client"
        >
          <v-radio label="As a Client" value="client" />
        </v-chip>
      </v-chip-group>
    </v-radio-group>

    <v-btn
      text="Create Account"
      class="mt-5 text-subtitle-2"
      width="200"
      size="large"
      @click="emit('selectAccountType', accountType)"
    />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  selectAccountType: [accountType: string];
}>();
const accountType = ref("freelancer");
</script>
