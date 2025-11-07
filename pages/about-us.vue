<template>
  <div class="w-100">
    <v-row class="bg-primary rounded-lg" justify="center">
      <v-col cols="5" align-self="center">
        <div class="d-flex flex-column align-center pl-15">
          <p class="text-uppercase text-h6 font-weight-light w-100">A bit</p>
          <p class="text-h3 font-weight-light text-uppercase w-100">About Us</p>
          <p class="mt-4 text-h6 font-weight-light">
            Enjoy the freedom of choosing projects that fit your schedule and
            interests. Achieve the work-life balance you desire while pursuing
            your passion. Enjoy the freedom of choosing projects that fit your
            schedule and interests. Achieve the work-life balance you desire
            while pursuing your passion.
          </p>

          <!-- action buttons -->
          <div class="d-flex ga-2 mt-7 w-100">
            <v-btn
              text="Hire Talents"
              size="x-large"
              class="text-h6 text-primary font-weight-bold elevation-0"
              color="white"
              :to="{ path: '/auth/register' }"
            >
              <p class="text-primary">Hire Talents</p>
            </v-btn>
            <v-btn
              text="Find Jobs"
              size="x-large"
              variant="elevated"
              class="text-h6 font-weight-bold gradient-find-jobs-btn"
              width="150"
              :to="{ path: '/auth/register' }"
            />
          </div>
        </div>
      </v-col>
      <v-col cols="7">
        <v-img src="/images/about_us_hero.png" width="700" />
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-15">
      <v-col cols="9">
        <p class="text-h4 text-center">
          As a digital marketing agency, we often need to bring in specialized
          talent for specific projects. This platform has been a lifesaver,
          allowing us to quickly find and hire top-notch freelancers with the
          exact skills we need
        </p>
      </v-col>
    </v-row>

    <v-row class="mt-15" justify="center">
      <v-col cols="5">
        <v-img
          src="/images/about_us_description_bg.jpg"
          height="350"
          cover
          gradient="to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.2)"
        >
          <div class="d-flex mt-5">
            <v-img src="/images/about_us_hero_screenshot.png" width="100%" />
          </div>
        </v-img>
      </v-col>
      <v-col cols="5" align-self="center">
        <p class="text-h5" style="font-weight: 400">
          As a digital marketing agency, we often need to bring in specialized
          talent for specific projects. This platform has been a lifesaver,
          allowing us to quickly find and hire top-notch freelancers with the
          exact skills we need
        </p>
      </v-col>
    </v-row>

    <v-row class="mt-15" style="background-color: #fafafa">
      <v-col>
        <p class="text-h5 text-center text-uppercase mt-10">
          What is our goal?
        </p>
        <p class="text-h4 font-weight-medium text-center mt-10 w-75 mx-auto">
          Connecting talent with opportunity—fueling success for freelancers and
          clients alike.
        </p>
        <p class="mt-15 text-uppercase text-h5 text-center">Our solutions</p>
        <div class="mt-10" />
        <LandingClientFeatures />
        <LandingTestimonials />
        <LandingPortfolio />
        <LandingCTA />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.gradient-find-jobs-btn {
  background-image: linear-gradient(
    to right,
    #e0e0e0 0%,
    #e0e0e0 3%,
    #959595 100%
  ) !important;
  color: white !important;
  border: 1px solid #e0e0e0 !important;
  background-color: transparent !important;
}
</style>
