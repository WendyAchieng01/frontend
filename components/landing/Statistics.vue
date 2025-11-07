<template>
  <v-sheet style="background-color: #e6eaeb" class="mt-15">
    <div class="pa-5">
      <p class="text-h4 text-capitalize text-center mt-10">
        Unveiling our impactful numbers
      </p>
      <p class="text-subtitle-1 mt-4 text-center">
        Every statistic tells a story, and ours speak volumes <br />
        about our journey.
      </p>

      <v-parallax
        src="/images/statistics_background.jpg"
        gradient="to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)"
        height="400"
        class="mt-5 mx-10 mb-10"
      >
        <v-row justify="center" class="text-white h-100 pa-2 pa-sm-0">
          <v-col cols="12" md="3" align-self="center">
            <p class="text-h3 text-center">42%</p>
            <p class="text-subtitle-2 mt-4 font-weight-light">
              Increase in Project Success Rate. This percentage symbolizes the
              dedication and quality of work of our freelancers, ensuring client
              satisfaction every step of the way.
            </p>
          </v-col>
          <v-col class="d-hidden d-sm-block" cols="1" />
          <v-col cols="12" md="3" align-self="center">
            <p class="text-h3">+300</p>
            <p class="text-subtitle-2 font-weight-light mt-4">
              New Projects Completed. Each project completed signifies a
              successful collaboration between our clients and freelancers,
              driving innovation and growth.
            </p>
          </v-col>
        </v-row>
      </v-parallax>
    </div>
  </v-sheet>
</template>
