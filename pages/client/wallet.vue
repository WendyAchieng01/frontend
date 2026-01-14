<template>
  <div>
    <v-card width="300" flat border elevation="1">
      <template #text>
        <div class="pa-2">
          <p class="text-caption font-weight-light">Total Spent</p>
          <p class="mt-1 text-h5 font-weight-medium">
            {{ formatAmount(walletStore.total_spent ?? 0) }}
          </p>
        </div>
      </template>
    </v-card>

    <v-row class="mt-4 mb-2 mb-sm-0">
      <!-- <v-col cols="12" md="6">
        <v-text-field
          label="Search by name"
          prepend-inner-icon="mdi-magnify"
          class="w-sm-50"
        />
      </v-col> -->
      <!-- <v-col>
        <div class="d-flex justify-end">
          <v-btn prepend-icon="mdi-tune" variant="text" text="Filters" />
        </div>
      </v-col> -->
    </v-row>

    <ClientTransactionTable
      v-model:page="page"
      :transactions="walletStore.transactions"
      :count="walletStore.totalTransactionsCount"
    />
  </div>
</template>

<script setup lang="ts">
import { debounce } from "lodash";
import { useClientWalletStore } from "~/store/client/wallet";

definePageMeta({
  layout: "client",
});

const search = ref("");
const page = ref(1);
const walletStore = useClientWalletStore();
async function getInvoices() {
  await walletStore.fetchWalletTransactions({
    page: page.value,
    search: search.value,
  });
}
onMounted(async () => {
  await getInvoices();
});

watch(
  search,
  debounce(async () => {
    await getInvoices();
  }, 500)
);
</script>
