<template>
  <AppDialog
    v-model="addFundsDialog"
    title="Deposit funds"
    subtitle="Add funds"
    action-button-text="Deposit"
    :loading="walletStore.isLoading"
    @action-button-click="makePayment"
  >
    <v-radio-group v-model="paymentMethod">
      <div class="d-flex justify-space-between">
        <v-radio value="card" />

        <div class="d-flex justify-space-between w-100 align-center">
          <p class="text-subtitle-1">Credit/Debit Cards/Mpesa</p>
          <div class="d-flex ga-2">
            <v-img src="/images/mastercard_icon.png" width="30" />
            <v-img src="/images/visa_icon.png" width="40" />
            <v-img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png?20191120100524"
              width="50"
            />
          </div>
        </div>
      </div>
      <div class="d-flex justify-space-between">
        <v-radio value="paypal" />

        <div class="d-flex justify-space-between w-100 align-center">
          <p class="text-subtitle-1">Paypal</p>
          <div class="d-flex ga-2">
            <v-img src="/images/paypal.svg" width="80" />
          </div>
        </div>
      </div>
      <!-- <div class="d-flex justify-space-between">
        <v-radio value="mpesa" />

        <div class="d-flex justify-space-between w-100 align-center">
          <p class="text-subtitle-1">Mpesa</p>
          <div class="d-flex ga-2">
            <v-img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png?20191120100524"
              width="40"
            />
          </div>
        </div>
      </div> -->
    </v-radio-group>

    <div class="mt-3">
      <p class="text-subtitle-1">
        I accept the
        <NuxtLink to="#" class="text-success text-decoration-none">
          Terms of Services
        </NuxtLink>
        and have read the
        <NuxtLink to="#" class="text-success text-decoration-none">
          Privacy Policy
        </NuxtLink>
      </p>

      <!-- <v-divider class="my-4" />
        <v-form v-if="paymentMethod === 'card'">
          <v-text-field label="Name on Card" />
          <v-text-field
            label="Card Number"
            prepend-inner-icon="mdi-credit-card"
          />
          <div class="d-flex ga-2">
            <v-text-field label="Expiry" model-value="06/24" />
            <v-text-field label="CVV" model-value="222" type="password" />
          </div>
        </v-form>
        <v-form v-else-if="paymentMethod === 'paypal'">
          <v-text-field label="Email" />
        </v-form>
        <v-form v-else-if="paymentMethod === 'mpesa'">
          <v-text-field label="MPESA Number" />
        </v-form> -->
    </div>
  </AppDialog>
</template>

<script setup lang="ts">
import { useClientWalletStore } from "~/store/client/wallet";
import type { IJob } from "~/types/client";

const props = defineProps<{
  job: IJob;
}>();
defineEmits<{
  fundsSuccess: [];
}>();
const addFundsDialog = defineModel<boolean>("modelValue");
const paymentMethod = ref("card");

const walletStore = useClientWalletStore();
async function makePayment() {
  if (paymentMethod.value === "card")
    await walletStore.initiatePaystackPaymentForJob(props.job.slug);
  else await walletStore.initiatePayPalPaymentForJob(props.job.slug);
}
</script>
