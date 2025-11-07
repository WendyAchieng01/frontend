<template>
  <div id="pricing">
    <p class="text-h4 text-center mt-15">Our Pricings</p>
    <p class="text-subtitle-1 text-center mt-5">
      No subscription needed, free to sign up, only pay when <br />
      you work or hire
    </p>
    <v-row class="mt-5">
      <v-col cols="12" md="6">
        <v-card color="primary" height="370" rounded="lg">
          <div class="pa-10 d-flex">
            <div>
              <p class="text-h5">For Freelancers</p>
              <p class="text-subtitle-1 font-weight-light opacity-80 mt-2">
                5% Earning Fee
              </p>
              <p
                class="text-subtitle-2 mt-10 font-weight-light"
                style="line-height: 2.6"
              >
                Freelancers are charged a 5% fee from <br />
                their earnings to cover platform access, <br />
                tools and growth resources
              </p>
            </div>
            <v-img
              src="/images/pricing_freelancer.svg"
              width="50"
              height="100"
              class="align-end h-100"
            />
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card color="primary" height="370" rounded="lg">
          <div class="pa-10 d-flex">
            <div>
              <p class="text-h5">For Clients</p>
              <p class="text-subtitle-1 font-weight-light opacity-80 mt-2">
                10% Earning Fee
              </p>
              <p
                class="text-subtitle-2 mt-10 font-weight-light"
                style="line-height: 2.6"
              >
                We charge a 10% service fee on the total <br />
                job budget to support secure payments, <br />
                platform maintenance, and top-tier <br />
                support.
              </p>
            </div>
            <v-img
              src="/images/pricing_client.png"
              width="50"
              height="100"
              class="align-end h-100"
            />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
