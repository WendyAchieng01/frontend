<template>
  <v-row>
    <v-col cols="12" md="4">
      <v-card flat>
        <v-sheet
          height="300"
          class="build-brand-card d-flex justify-center align-center rounded-lg"
        >
          <v-img
            src="/images/client_access_global_expertise.png"
            class="rounded-lg"
            height="250"
          />
        </v-sheet>
        <p class="text-h5 mt-3 font-weight-medium my-4">
          Access Global Expertise
        </p>
        <p class="text-subtitle-1 text-gray-lighten-3">
          Tap into a vast pool of skilled professionals from around the world.
          Find the perfect match for your project needs, regardless of location.
        </p>
      </v-card>
    </v-col>

    <v-col cols="12" md="4">
      <v-card flat>
        <v-sheet
          height="300"
          class="flexible-work-card d-flex justify-center align-center rounded-lg"
        >
          <v-img
            src="/images/freelancer_flexible_work_opportunities.png"
            class="rounded-lg"
            height="250"
          />
        </v-sheet>
        <p class="text-h5 mt-3 font-weight-medium my-4">
          Flexible Hiring Options
        </p>
        <p class="text-subtitle-1 text-gray-lighten-3">
          Hire freelancers on a project basis or build a dedicated team tailored
          to your specific requirements. Scale your workforce as needed.
        </p>
      </v-card>
    </v-col>

    <v-col cols="12" md="4">
      <v-card flat>
        <v-sheet
          height="300"
          class="seamles-pm-card d-flex justify-center align-center rounded-lg"
        >
          <v-img
            src="/images/client_transparent_collaboration.png"
            class="rounded-lg"
            height="250"
          />
        </v-sheet>
        <p class="text-h5 mt-3 font-weight-medium my-4">
          Transparent Collaboration
        </p>
        <p class="text-subtitle-1 text-gray-lighten-3">
          Enjoy seamless communication and project management through our
          intuitive platform. Track progress, provide feedback, and ensure
          timely project delivery.
        </p>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.build-brand-card {
  background-color: #eadafe;
}
.flexible-work-card {
  background-color: #d9effd;
}
.seamles-pm-card {
  background-color: #caf8b8;
}
</style>
