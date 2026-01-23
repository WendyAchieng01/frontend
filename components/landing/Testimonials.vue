<template>
  <p class="text-h4 mt-15">
    Trusted by clients <br />
    and freelancers worldwide
  </p>
  <v-row class="mt-5">
    <v-col v-for="(testimonial, index) in testimonials" :key="index" cols="12" md="6">
      <v-sheet rounded="lg" style="background-color: #efefef" class="h-auto">
        <v-row class="fill-height">
          <v-col cols="5" class="fill-height pa-0" >
            <v-img
              :src="testimonial.image"
              class="rounded-lg ma-3"
              cover
              aspect-ratio="1/1"
            />

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
      "NillTech helps us find reliable developers with confidence. The escrow system is secure, and the work quality is consistently excellent.",
    name: "Alice Njeri",
    role: "SME Owner",
  },
  {
    image: "/images/prof2.jpg",
    quote:
      "NillTech gives me steady freelance work and reliable, on-time payments. The platform is professional, transparent, and secure.",
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