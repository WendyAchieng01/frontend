<template>
  <v-container class="py-12">
    <h1 class="text-h4 font-weight-bold mb-6 text-primary">
      Privacy Policy
    </h1>

    <v-card elevation="0" class="pa-6 rounded-lg bg-grey-lighten-5">
      <p class="text-body-1 mb-4">
        Our Privacy Policy, compliant with the Data Protection (General) Regulations, 2021,
        details how we collect, use, and protect your data.
      </p>

      <ul class="text-body-2">
        <li class="mb-3">
          <strong>Consent:</strong> By registering, you consent to data processing for
          Platform operations, marketing (opt-out available), and legal compliance.
        </li>
        <li class="mb-3">
          <strong>Data Subject Rights:</strong> Access, rectify, erase, or object to processing
          via <a href="mailto:info@nilltechsolutions.com" class="text-primary">
          info@nilltechsolutions.com</a>. We respond within 14 days per DPA.
        </li>
        <li class="mb-3">
          <strong>Security:</strong> We use encryption and access controls; report breaches
          to ODPC within 72 hours.
        </li>
        <li>
          <strong>Third Parties:</strong> Data shared only with Freelancers/Clients (as needed),
          processors (e.g., payment gateways), or authorities.
        </li>
      </ul>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default", // ✅ ensures it uses the normal site layout
});
</script>
