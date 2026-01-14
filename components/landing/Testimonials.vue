<template>
  <p class="text-h4 mt-15">
    Trusted by leading <br />
    brands and startups
  </p>
  <v-row class="mt-5">
    <v-col v-for="n in 2" :key="n" cols="12" md="6">
      <v-sheet rounded="lg" style="background-color: #efefef" height="300">
        <v-row class="fill-height">
          <v-col cols="5" class="fill-height pa-0">
            <div class="d-flex flex-column justify-end h-100">
              <div class="h-75">
                <v-img
                  src="/images/testimonial_image.jpg"
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
                I got the best knowledge from Acetech and I am glad I was a part
                of it
                <v-icon
                  icon="mdi-format-quote-close"
                  color="primary"
                  class="quote-icon-end"
                />
              </p>

              <p class="text-subtitle-1 text-primary font-weight-bold mt-5">
                Bonnie Green
              </p>
              <p class="text-subtitle-2 font-weight-light">Product Designer</p>
            </div>
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<style scoped>
.quote-icon-start,
.quote-icon-end {
  vertical-align: middle;
  margin-left: 0.1em;
  margin-right: 0.1em;
}
</style>
