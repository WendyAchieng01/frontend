<template>
  <div class="w-100">
    <v-row class="bg-primary rounded-lg" justify="center">
      <v-col cols="5" align-self="center">
        <div class="d-flex flex-column align-center pl-15">
          <p class="text-uppercase text-h6 font-weight-light w-100">About</p>
          <p class="text-h3 font-weight-light text-uppercase w-100">NillTech Solutions</p>
          <p class="mt-4 text-h6 font-weight-light">
            A global digital services platform built to connect businesses with reliable
            talent through technology-driven workflows. We combine software development
            services with a microtasks marketplace for efficient delivery and real earning
            opportunities.
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
          Founded to solve trust, payment, and quality gaps in online work, NillTech focuses
          on verification, structured delivery, and escrow-based payments. Our platform is
          designed to eliminate uncertainties in digital collaboration, ensuring a secure
          environment for all participants.
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
          We work with freelancers and developers from different regions while serving clients
          worldwide. By managing approvals, payments, and task workflows, we remove friction
          for both sides and allow each party to focus on what matters: delivery and results.
        </p>
      </v-col>
    </v-row>

    <v-row class="mt-15" style="background-color: #fafafa">
      <v-col>
        <p class="text-h5 text-center text-uppercase mt-10">
          What is our goal?
        </p>
        <p class="text-h4 font-weight-medium text-center mt-10 w-75 mx-auto">
          Built for scale, transparency, and global collaboration—connecting talent with
          opportunity and fueling success for freelancers and clients alike.
        </p>

        <p class="mt-15 text-uppercase text-h5 text-center">Our Dual-Service Ecosystem</p>
        
        <!-- Service Cards -->
        <v-row class="mt-10 mx-auto" style="max-width: 1200px" justify="center">
          <v-col cols="12" md="5">
            <v-card class="pa-6 rounded-lg" elevation="2">
              <div class="d-flex align-center mb-4">
                <v-icon icon="mdi-clipboard-list" size="40" color="primary" class="mr-3" />
                <p class="text-h5 font-weight-medium">Microtasks</p>
              </div>
              <p class="text-body-1">
                Low-skill microtasks starting from small, repeatable jobs suitable for rapid
                execution. Perfect for data entry, verification, content moderation, testing,
                and similar activities. Tasks typically start from $1.
              </p>
            </v-card>
          </v-col>
          <v-col cols="12" md="5">
            <v-card class="pa-6 rounded-lg" elevation="2">
              <div class="d-flex align-center mb-4">
                <v-icon icon="mdi-code-braces" size="40" color="primary" class="mr-3" />
                <p class="text-h5 font-weight-medium">Development Projects</p>
              </div>
              <p class="text-body-1">
                High-skill development projects requiring experienced professionals for complex
                deliverables. Includes websites, web applications, system development,
                integrations, and maintenance with higher payouts based on scope and complexity.
              </p>
            </v-card>
          </v-col>
        </v-row>

        <div class="mt-10" />
        <LandingClientFeatures />
        <LandingTestimonials />
        <LandingPortfolio />
        <LandingCTA />
      </v-col>
    </v-row>

    <!-- Footer -->
    <v-row class="mt-10 mb-5">
      <v-col>
        <p class="text-center text-body-2">
          Contact: <a href="https://twitter.com/NillTech_Solutions" target="_blank" class="text-primary">@NillTech_Solutions</a>
        </p>
        <p class="text-center text-body-2 mt-2">
          © {{ new Date().getFullYear() }} NillTech Solutions. All Rights Reserved.
        </p>
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