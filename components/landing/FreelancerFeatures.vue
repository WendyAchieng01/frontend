<template>
  <v-row>
    <v-col cols="12" md="4">
      <v-card flat>
          <v-sheet
            height="300"
            class="build-brand-card d-flex justify-center align-center rounded-lg"
          >
            <v-img
              src="/images/freelancer_build_your_brand.png"
              class="rounded-lg"
              height="250"
            />
          </v-sheet>
          <p class="text-h5 mt-3 font-weight-medium my-4">Build Your Brand</p>
          <p class="text-subtitle-1 text-gray-lighten-3">
            Create a compelling portfolio and profile to showcase your unique
            skills and experience. Stand out from the crowd and attract clients
            that align with your expertise.
          </p>
      </v-card>
    </v-col>

    <v-col>
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
            Flexible Work Opportunities
          </p>
          <p class="text-subtitle-1 text-gray-lighten-3">
            Enjoy the freedom of choosing projects that fit your schedule and
            interests. Achieve the work-life balance you desire while pursuing
            your passion.
          </p>
      </v-card>
    </v-col>

    <v-col>
      <v-card flat>
          <v-sheet
            height="300"
            class="seamles-pm-card d-flex justify-center align-center rounded-lg"
          >
            <v-img
              src="/images/freelancer_seamless_project_management.png"
              class="rounded-lg"
              height="250"
            />
          </v-sheet>
          <p class="text-h5 mt-3 font-weight-medium my-4">
            Seamless Project Management
          </p>
          <p class="text-subtitle-1 text-gray-lighten-3">
            Collaborate with clients efficiently through our user-friendly
            platform. Streamline communication, track progress, and get paid on
            time.
          </p>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.build-brand-card {
  background-color: #eadafd;
}
.flexible-work-card {
  background-color: #daeffd;
}
.seamles-pm-card {
  background-color: #c9f8b9;
}
</style>
