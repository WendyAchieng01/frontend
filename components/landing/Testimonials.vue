<template>
  <p class="text-h4 mt-15">
    Trusted by clients <br />
    and freelancers worldwide
  </p>
  <v-row class="mt-5">
    <v-col v-for="(testimonial, index) in testimonials" :key="index" cols="12" md="6">
      <v-sheet rounded="lg" style="background-color: #efefef" height="300">
        <v-row class="fill-height">
          <v-col cols="5" class="fill-height pa-0">
            <div class="d-flex flex-column justify-end h-100">
              <div class="h-75">
                <v-img
                  :src="testimonial.image"
                  class="rounded-lg ml-3"
                  cover
                  aspect-ratio="1/1"
                />
              </div>
            </div>
          </v-col>
          <v-col cols="7">
            <div class="pa-5">
              <p
                class="text-subtitle-1 font-weight-medium"
                style="font-weight: 400"
              >
                <v-icon
                  icon="mdi-format-quote-open"
                  color="primary"
                  class="quote-icon-start"
                />
                {{ testimonial.quote }}
                <v-icon
                  icon="mdi-format-quote-close"
                  color="primary"
                  class="quote-icon-end"
                />
              </p>
              <p class="text-subtitle-1 text-primary font-weight-bold mt-5">
                {{ testimonial.name }}
              </p>
              <p class="text-subtitle-2 font-weight-light">{{ testimonial.role }}</p>
            </div>
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const testimonials = [
  {
    image: "/images/prof1.jpg",
    quote:
      "NillTech has been instrumental in helping us find reliable developers for our projects. The escrow system gives us peace of mind, and the quality of work has been consistently excellent.",
    name: "Alice Njeri",
    role: "SME Owner:",
  },
  {
    image: "/images/prof2.jpg",
    quote:
      "As a freelancer, NillTech provides me with steady work opportunities and guaranteed payments. The platform is transparent, professional, and I always get paid on time through their secure system.",
    name: "James Omondi",
    role: "Full-Stack Developer",
  },
];
</script>

<style scoped>
.quote-icon-start,
.quote-icon-end {
  vertical-align: middle;
  margin-left: 0.1em;
  margin-right: 0.1em;
}
</style>