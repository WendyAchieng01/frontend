<template>
  <v-container class="py-12">
    <!-- Company Intro -->
    <h2 class="text-h4 font-weight-bold text-center">
      NillTech Solutions Ltd
    </h2>

    <p class="text-h6 text-center mt-2 text-grey-darken-1">
      Global Digital Solutions for Businesses and Freelancers
    </p>

    <p class="text-body-1 text-center mt-6 mx-auto intro-text">
      NillTech Solutions is a hybrid digital platform connecting businesses that need work done
      with skilled freelancers ready to deliver through development services and a secure
      microtasks marketplace.
    </p>

    <!-- Core Services -->
    <h3 class="text-h5 font-weight-bold text-center mt-12">
      Our Core Services
    </h3>

    <v-row class="mt-8" align="stretch">
      <!-- Development Services -->
      <v-col cols="12" md="6">
        <v-card rounded="lg" elevation="2" class="pa-6 h-100">
          <h4 class="text-h6 font-weight-bold mb-3">
            Development Services
          </h4>

          <p class="text-body-2 mb-4">
            We design and build reliable digital products that help businesses operate
            efficiently and scale confidently.
          </p>

          <ul class="service-list">
            <li>Website design and development</li>
            <li>Web and mobile application development</li>
            <li>Custom software solutions tailored to business needs</li>
          </ul>

          <v-btn
            class="mt-6"
            color="primary"
            variant="elevated"
            :to="{ path: '/auth/register' }"
          >
            Hire Talent | Find Work
          </v-btn>
        </v-card>
      </v-col>

      <!-- Microtasks Marketplace -->
      <v-col cols="12" md="6">
        <v-card rounded="lg" elevation="2" class="pa-6 h-100">
          <h4 class="text-h6 font-weight-bold mb-3">
            Microtasks Marketplace
          </h4>

          <p class="text-body-2 mb-4">
            Our microtasks marketplace connects clients with verified freelancers for tasks,
            projects, and assignments of any size, all protected by escrow.
          </p>

          <ul class="service-list">
            <li>Access verified global freelancers</li>
            <li>Escrow-protected payments</li>
            <li>Flexible tasks and micro-projects</li>
          </ul>

          <v-btn
            class="mt-6"
            color="primary"
            variant="outlined"
            :to="{ path: '/auth/register' }"
          >
            Get Started
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.intro-text {
  max-width: 800px;
}

.service-list {
  padding-left: 1.2rem;
}

.service-list li {
  margin-bottom: 0.6rem;
}
</style>
