<template>
  <v-container class="py-12">
    <!-- Title -->
    <h1 class="text-h4 font-weight-bold mb-6 text-primary">
      Terms and Conditions for NillTech Solutions LTD
    </h1>

    <!-- Card Wrapper -->
    <v-card elevation="0" class="pa-6 rounded-lg bg-grey-lighten-5">
      <p class="text-body-1 mb-4">Last Updated: October 8, 2025</p>

      <p class="text-body-1 mb-6">
        Welcome to <strong>www.nilltechsolutions.com</strong>. These Terms and Conditions govern your 
        access to and use of the Platform, including any content, functionality, and services offered 
        on or through the Platform. The Platform connects Freelancers with Clients for the provision 
        of freelance services.
      </p>

      <p class="text-body-1 mb-6">
        By registering an account, browsing the Platform, or using any services, you agree to be 
        bound by these Terms. If you do not agree, you must not use the Platform. These Terms form 
        a legally binding agreement between you and 
        <strong>NillTech Solutions LTD</strong>, a company registered in Kenya under PVT-9XUKLQ7M, 
        with its principal place of business at Nairobi.
      </p>

      <p class="text-body-1 mb-6">
        We may update these Terms at any time. We will notify you of material changes by posting 
        the updated Terms on the Platform and updating the "Last Updated" date. Your continued use 
        after such notice constitutes acceptance of the changes.
      </p>

      <v-divider class="my-8"></v-divider>

      <!-- Sectioned Legal Text -->
      <div class="text-body-2 leading-relaxed">
        <h2 class="text-h6 font-weight-bold mb-3">1. Eligibility and Registration</h2>
        <ul class="mb-6">
          <li>
            <strong>Eligibility:</strong> You must be at least 18 years old and legally capable of entering 
            contracts under Kenyan law to use the Platform. By using the Platform, you represent that 
            you meet these requirements and are not barred from using the services under applicable law.
          </li>
          <li>
            <strong>Account Registration:</strong> You must provide accurate, current, and complete 
            information. You are responsible for maintaining confidentiality of your credentials.
          </li>
          <li>
            <strong>Verification:</strong> We may require identity verification to comply with Kenyan 
            anti-money laundering laws and tax regulations.
          </li>
        </ul>

        <h2 class="text-h6 font-weight-bold mb-3">2. Description of Services</h2>
        <p class="mb-6">
          The Platform facilitates connections between Freelancers and Clients for services such as 
          graphic design, writing, and programming. We act as an intermediary and reserve the right to 
          modify, suspend, or discontinue services at any time.
        </p>

        <h2 class="text-h6 font-weight-bold mb-3">3. User Obligations</h2>
        <p class="mb-6">
          You agree to comply with Kenyan laws including the Data Protection Act, Consumer Protection Act, 
          and Employment Act. You must not post false content, harass others, or violate intellectual 
          property rights. Content you submit remains yours, but you grant us a license to display it on 
          the platform.
        </p>

        <h2 class="text-h6 font-weight-bold mb-3">4. Freelancer-Specific Terms</h2>
        <p class="mb-6">
          Freelancers must meet deadlines, deliver original work, and transfer intellectual property to 
          Clients upon full payment.
        </p>

        <h2 class="text-h6 font-weight-bold mb-3">5. Client-Specific Terms</h2>
        <p class="mb-6">
          Clients must clearly describe project scope, review deliverables, and handle payments as agreed.
        </p>

        <h2 class="text-h6 font-weight-bold mb-3">6. Payments and Fees</h2>
        <p class="mb-6">
          Payments are processed through secure third-party processors (M-Pesa, PayPal, Paystack). Fees and 
          refunds are handled per our Refund Policy. Users are responsible for their own taxes.
        </p>

        <h2 class="text-h6 font-weight-bold mb-3">7. Dispute Resolution</h2>
        <p class="mb-6">
          Disputes are resolved via internal mediation, then arbitration in Nairobi under the Arbitration 
          Act, 1995. No class actions are allowed.
        </p>

        <h2 class="text-h6 font-weight-bold mb-3">8. Limitation of Liability</h2>
        <p class="mb-6">
          We are not liable for indirect damages or losses. Our total liability shall not exceed fees paid 
          within the past 12 months.
        </p>

        <h2 class="text-h6 font-weight-bold mb-3">9. Termination</h2>
        <p class="mb-6">
          You may close your account anytime. We may suspend or terminate accounts that violate these Terms.
        </p>

        <h2 class="text-h6 font-weight-bold mb-3">10. Indemnification</h2>
        <p class="mb-6">
          You agree to indemnify NillTech Solutions LTD against claims arising from your use of the platform.
        </p>

        <h2 class="text-h6 font-weight-bold mb-3">11. Governing Law and Jurisdiction</h2>
        <p class="mb-6">
          These Terms are governed by the laws of the Republic of Kenya, and any disputes will be resolved 
          exclusively in Nairobi courts.
        </p>

        <h2 class="text-h6 font-weight-bold mb-3">12. Miscellaneous</h2>
        <ul>
          <li>These Terms, together with the <NuxtLink to="/privacy-policy" class="text-primary">Privacy Policy</NuxtLink>, form the entire agreement.</li>
          <li>Invalid provisions do not affect the rest.</li>
          <li>No waiver of rights constitutes a waiver of any other right.</li>
          <li>Contact us at <a href="mailto:info@nilltechsolutions.com" class="text-primary">info@nilltechsolutions.com</a>.</li>
        </ul>
      </div>

      <v-divider class="my-8"></v-divider>

      <p class="text-body-2 text-center mt-4">
        © {{ new Date().getFullYear() }} NillTech Solutions LTD — All rights reserved.
      </p>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default", // ✅ ensures it uses your main layout with header/footer
});
</script>

<style scoped>
.text-body-2 ul {
  padding-left: 1.5rem;
  list-style-type: disc;
}

.text-body-2 li {
  margin-bottom: 0.5rem;
}
</style>
