<template>
  <h3 class="text-h4 mt-10">Popular Services</h3>
  <v-row class="mt-5">
    <v-col cols="12" md="4">
      <v-card rounded="lg" color="primary">
        <template #text>
          <p class="text-h6 font-weight-medium">
            Graphic <br />
            Designer
          </p>
          <v-sheet
            height="200"
            class="mt-5 d-flex justify-center align-center graphic-designer-card rounded-lg"
          >
            <v-img height="180" src="/images/service_graphic_designer.png" />
          </v-sheet>
        </template>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <v-card rounded="lg" color="primary">
        <template #text>
          <p class="text-h6 font-weight-medium">
            Website <br />
            Developer
          </p>
          <v-sheet
            height="200"
            class="mt-5 d-flex justify-center align-center website-developer-card rounded-lg"
          >
            <v-img height="180" src="/images/service_website_developer.png" />
          </v-sheet>
        </template>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <v-card rounded="lg" color="primary">
        <template #text>
          <p class="text-h6 font-weight-medium">
            Social Media <br />
            Marketing
          </p>
          <v-sheet
            height="200"
            class="mt-5 d-flex justify-center align-center social-media-card rounded-lg"
          >
            <v-img
              height="180"
              src="/images/service_social_media_marketing.png"
            />
          </v-sheet>
        </template>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card rounded="lg" color="primary">
        <template #text>
          <p class="text-h6 font-weight-medium">SEO</p>
          <v-sheet
            height="200"
            class="mt-13 d-flex justify-center align-center SEO-card rounded-lg"
          >
            <v-img height="180" src="/images/service_seo.png" />
          </v-sheet>
        </template>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card rounded="lg" color="primary">
        <template #text>
          <p class="text-h6 font-weight-medium">
            Technical <br />
            Writer
          </p>
          <v-sheet
            height="200"
            class="mt-5 d-flex justify-center align-center technical-writer-card rounded-lg"
          >
            <v-img height="180" src="/images/service_technical_writer.png" />
          </v-sheet>
        </template>
      </v-card>
    </v-col>
  </v-row>
  <div class="d-flex justify-center my-10">
    <v-btn
      text="Hire Amazing Talents"
      size="x-large"
      variant="elevated"
      class="text-subtitle-1"
      width="300"
      :to="{ path: '/auth/register' }"
    />
  </div>
</template>

<style scoped>
.graphic-designer-card {
  background-color: #dad6ef;
}

.website-developer-card {
  background-color: #eeeeee;
}

.social-media-card {
  background-color: #c5b8ff;
}

.seo-card {
  background-color: #fffdff;
}

.technical-writer-card {
  background-color: #fffdff;
}
</style>
