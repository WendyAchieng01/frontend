<template>
  <v-sheet id="contact-us" color="#064263">
    <div class="pa-5">
      <p class="text-h4 text-center mt-10">Reach Out To Us</p>

      <v-row class="mt-10" justify="center">
        <v-col cols="12" md="5">
          <v-card style="background-color: #527e91" rounded="lg" theme="dark">
            <template #text>
              <v-form @submit.prevent="submit">
                <v-text-field
                  v-model="form.name"
                  label="Full Name"
                  variant="filled"
                  style="background-color: #064263"
                  hide-details="auto"
                  class="rounded"
                  color="white"
                />

                <v-text-field
                  v-model="form.phone"
                  label="Phone Number"
                  variant="filled"
                  style="background-color: #064263"
                  hide-details="auto"
                  class="rounded mt-5"
                  color="white"
                />

                <v-text-field
                  v-model="form.email"
                  label="Email Address"
                  variant="filled"
                  style="background-color: #064263"
                  hide-details="auto"
                  class="rounded mt-5"
                  color="white"
                />

                <v-text-field
                  v-model="form.subject"
                  label="Subject"
                  variant="filled"
                  style="background-color: #064263"
                  hide-details="auto"
                  class="rounded mt-5"
                  color="white"
                />

                <v-textarea
                  v-model="form.message"
                  label="Message"
                  variant="filled"
                  style="background-color: #064263"
                  hide-details="auto"
                  class="rounded mt-5"
                  color="white"
                />

                <v-btn
                  type="submit"
                  text="Submit"
                  size="x-large"
                  variant="elevated"
                  class="text-subtitle-1 mt-5"
                  block
                  :loading="contactStore.isLoading"
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

<script setup lang="ts">
import { reactive } from "vue";
import { useContactStore } from "~/store/contact";
import type { IContactFormPayload } from "~/types/freelancer";

const contactStore = useContactStore();

const form = reactive<IContactFormPayload>({
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  contact_type: "general",
});

async function submit() {
  await contactStore.submitContactForm(form);
}
</script>
