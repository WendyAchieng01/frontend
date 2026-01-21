<template>
  <div id="faq">
    <p class="text-h4 text-center">Frequently Asked Questions</p>
    <v-expansion-panels
      class="mt-10"
      rounded="lg"
      expand-icon="mdi-chevron-right"
      collapse-icon="mdi-chevron-down-circle"
      mandatory="force"
      flat
    >
      <v-expansion-panel
        v-for="(faq, index) in faqs"
        :key="index"
        class="mt-3 pa-3 elevation-1"
      >
        <v-expansion-panel-title>
          <p class="text-subtitle-1 font-weight-medium">
            {{ faq.question }}
          </p>
          <template #actions="{ expanded }">
            <div
              class="neumorphic-icon-wrapper rounded-circle pa-2"
              :class="{
                'neumorphic-outset': !expanded,
                'bg-secondary': expanded,
              }"
            >
              <v-icon
                :icon="expanded ? 'mdi-chevron-down' : 'mdi-chevron-right'"
                size="25"
                :color="expanded ? 'white' : 'secondary'"
              />
            </div>
          </template>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <p class="text-body-1" v-html="faq.answer"/>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
const faqs = [
  {
    question: "What does NillTech Solutions do?",
    answer:
      "NillTech Solutions operates a hybrid digital platform offering software development services and a microtasks marketplace. We connect businesses with vetted developers and freelancers through secure, transparent, and structured workflows.",
  },
  {
    question: "How does the platform work for clients and freelancers?",
    answer:
      "Clients post tasks or development projects, select suitable talent, and fund the work via escrow. Freelancers choose tasks or projects that match their skill level, complete the work, and get paid once deliverables are approved. The process follows a clear flow: <strong>Post → Match → Work → Review → Pay</strong>.",
  },
  {
    question: "How are freelancers and developers verified?",
    answer:
      "Freelancers undergo identity verification and basic skill checks before accessing microtasks. Developers offering higher-skill services are assessed based on experience, portfolio, and technical capability to ensure quality delivery on complex projects.",
  },
  {
    question: "How does escrow payment protection work?",
    answer:
      "Clients deposit funds into escrow before work begins. NillTech securely holds the payment until the task or project milestone is completed and approved, protecting both clients and freelancers from payment disputes.",
  },
  {
    question: "What types of tasks and development projects are supported?",
    answer:
      "<strong>Microtasks:</strong> Small, simple tasks that require minimal skills such as data entry, verification, content moderation, testing, and similar activities. Microtasks typically start from $1 per task.<br><br><strong>Development Projects:</strong> High-skill work including websites, web applications, system development, integrations, and maintenance. These projects require advanced technical expertise and offer higher payouts based on scope and complexity.",
  },
  {
    question: "Can freelancers work with international clients on NillTech?",
    answer:
      "Yes. NillTech supports cross-border work, allowing freelancers to work with international clients while NillTech manages payments and approvals securely.",
  },
  {
    question: "When do freelancers get paid?",
    answer:
      "Freelancers are paid twice a month for approved tasks and milestones. Payment cycles run on the <strong>15th</strong> and the <strong>30th or 31st</strong> of every month, covering all work that has been reviewed and approved within the period.",
  },
  {
    question: "Is NillTech available globally?",
    answer:
      "Yes. NillTech operates globally, serving both clients and freelancers across multiple countries without geographical restrictions.",
  },
];
</script>

<style scoped>
.neumorphic-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
}
.neumorphic-outset {
  background-color: #ffffff;
  box-shadow: 4px 4px 8px #cecece, -4px -4px 8px #ffffff;
}
</style>