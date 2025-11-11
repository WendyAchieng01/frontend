<template>
  <v-data-table-server
    :headers="headers"
    :items="transactions"
    class="my-custom-table elevation-1"
    color="primary"
    :items-length="count"
    @update:page="(pageNumber) => (page = pageNumber)"
  >
    <!-- Transaction ID -->
    <template #item.id="{ item }">
      <v-list-item :title="`#${item.id}`">
        <template #subtitle>
          <p class="text-no-wrap">
            {{ moment(item.created_at).fromNow() }}
          </p>
        </template>
      </v-list-item>
    </template>

    <!-- STATUS with icons -->
    <template #item.status="{ item }">
      <v-chip
        :text="item.status"
        variant="text"
        :prepend-icon="
          item.status === 'completed'
            ? 'mdi-check-circle-outline'
            : item.status === 'pending'
            ? 'mdi-progress-clock'
            : item.status === 'initiated'
            ? 'mdi-play-circle-outline'
            : item.status === 'failed'
            ? 'mdi-close-circle-outline'
            : 'mdi-help-circle-outline'
        "
        :color="
          item.status === 'completed'
            ? 'green'
            : item.status === 'pending'
            ? 'amber'
            : item.status === 'initiated'
            ? 'blue'
            : item.status === 'failed'
            ? 'red'
            : 'grey'
        "
        class="text-capitalize"
      />
    </template>

    <!-- AMOUNT -->
    <template #item.amount="{ item }">
      <v-list-item
        prepend-icon="mdi-cash"
        :title="formatAmount(item.amount)"
        class="text-no-wrap"
      />
    </template>

    <!-- DATE -->
    <template #item.created_at="{ item }">
      <v-list-item
        prepend-icon="mdi-calendar-month-outline"
        :title="moment(item.created_at).format('Do MMM YYYY')"
      />
    </template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import moment from "moment";
import type { IWalletTransaction } from "~/types/client";

defineProps<{
  transactions: IWalletTransaction[];
  count: number;
}>();

const page = defineModel<number>("page", { default: 1 });

const headers = [
  { title: "Transaction ID", value: "id" },
  { title: "Status", value: "status" },
  { title: "Amount", value: "amount" },
  { title: "Date", value: "created_at" },
];

// Helper for formatting amounts
function formatAmount(amount: number) {
  return "Ksh " + amount.toLocaleString();
}
</script>

<style scoped>
.my-custom-table :deep(thead th) {
  background-color: #ebeafa !important;
}
</style>
