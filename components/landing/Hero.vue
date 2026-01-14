<template>
  <v-parallax
    src="/images/hero.jpg"
    height="700"
    class="blue-filter rounded-xl"
    gradient="to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.2)"
  >
    <div
      class="parallax-content fill-height d-flex align-center justify-center"
    >
      <v-row class="ml-4">
        <v-col cols="12" md="8">
          <h1 class="text-h4 text-sm-h2 font-weight-medium text-white mb-4">
            Linking clients seeking services with skilled freelancers who
            deliver
          </h1>
          <p class="text-subtitle-2 text-sm-h6 font-weight-light text-white">
            Collaborate with expert freelancers to achieve your business goals,
            or connect with top clients, showcase your skills, and take your
            freelance journey - all in one place.
          </p>

          <!-- search section -->
          <v-card class="mt-5" rounded="xl">
            <template #text>
              <div class="d-flex justify-space-between align-center ga-2 pa-1">
                <v-text-field
                  label="Job title or keyword"
                  prepend-inner-icon="mdi-magnify"
                  variant="underlined"
                  hide-details
                />
                <v-autocomplete
                  class="d-none d-sm-block"
                  label="Location"
                  prepend-inner-icon="mdi-map-marker-outline"
                  variant="underlined"
                  model-value="Kenya, Nairobi"
                  hide-details
                />

                <v-btn
                  text="Search Jobs"
                  :size="$vuetify.display.mobile ? undefined: 'large'"
                  variant="elevated"
                  class="font-weight-light text-subtitle-2"
                  :width="$vuetify.display.mobile ? undefined : 150"
                  to="/auth/login"
                />
              </div>
            </template>
          </v-card>

          <p class="text-subtitle-1 mt-4 text-white">
            Popular: UI Designer, UX Researcher, Android, Admin
          </p>

          <!-- action buttons -->
          <div class="d-flex ga-4 mt-7">
            <v-btn
              text="Hire Talents"
              size="x-large"
              variant="elevated"
              class="text-subtitle-1"
              width="150"
              :to="{ path: '/auth/register' }"
            />
            <v-btn
              text="Find Jobs"
              size="x-large"
              variant="elevated"
              class="text-subtitle-1 gradient-find-jobs-btn"
              width="150"
              :to="{ path: '/auth/register' }"
            />
          </div>
        </v-col>
      </v-row>
    </div>
  </v-parallax>
</template>

<style scoped>
.blue-filter {
  position: relative;
  overflow: hidden;
}

.blue-filter::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(60, 110, 130, 0.45);
  /* background-color: rgba(25, 50, 100, 0.4); */
  z-index: 1;
}

.parallax-content {
  position: relative;
  z-index: 2;
}

.blue-filter h1,
.blue-filter p {
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
}

.gradient-find-jobs-btn {
  background-image: linear-gradient(to right, #e0e0e0, #909090) !important;
  color: white !important;
  border: 1px solid #e0e0e0 !important;
  background-color: transparent !important;
}

/* .gradient-find-jobs-btn:hover {
  background-image: linear-gradient(to right, #d6d6d6, #828282) !important;
  border-color: #d0d0d0 !important;
} */
</style>
