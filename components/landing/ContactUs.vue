<template>
  <v-sheet id="contact-us" color="#064263">
    <div class="pa-5">
      <p class="text-h4 text-center mt-10">Reach Out To Us</p>

      <v-row class="mt-10" justify="center">
        <v-col cols="12" md="5">
          <v-card style="background-color: #527e91" rounded="lg" theme="dark">
            <template #text>
              <!-- Traditional form POST -->
              <v-form
                ref="contactForm"
                action="/contact_gen/" 
                method="POST"
              >
                <!-- Django CSRF token -->
                <input type="hidden" name="csrfmiddlewaretoken" :value="csrfToken" />

                <v-text-field
                  label="Full Name"
                  name="name"
                  variant="filled"
                  style="background-color: #064263"
                  hide-details="auto"
                  class="rounded"
                  color="white"
                  required
                />

                <v-text-field
                  label="Email Address"
                  name="email"
                  variant="filled"
                  style="background-color: #064263"
                  hide-details="auto"
                  class="rounded mt-5"
                  color="white"
                  required
                />

                <v-textarea
                  label="Message"
                  name="message"
                  variant="filled"
                  style="background-color: #064263"
                  hide-details="auto"
                  class="rounded mt-5"
                  color="white"
                  required
                />

                <v-btn
                  text="Submit"
                  size="x-large"
                  variant="elevated"
                  class="text-subtitle-1 mt-5"
                  block
                  type="submit"
                />
              </v-form>
            </template>
          </v-card>
        </v-col>

        <v-col cols="12" md="5">
          <v-img
            src="/images/contact_us.jpg"
            height="480"
            cover
            class="rounded-lg"
          />
        </v-col>
      </v-row>
    </div>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      csrfToken: document.querySelector('[name=csrfmiddlewaretoken]')?.value || "",
    };
  },
};
</script>
