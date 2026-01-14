<template>
  <AuthSelectAccountTypeCard
    v-if="!showRegisterCard"
    @select-account-type="showRegisterCardHandler"
  />

  <Transition
    :name="
      showRegisterCard ? 'slide-x-transition' : 'slide-x-reverse-transition'
    "
  >
    <AuthRegisterCard v-if="showRegisterCard" :accountType />
  </Transition>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const accountType = ref("freelancer");
const showRegisterCard = ref(false);

function showRegisterCardHandler(accType: string) {
  accountType.value = accType;
  showRegisterCard.value = true;
}
</script>
