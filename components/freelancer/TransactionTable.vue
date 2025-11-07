<template>
  <v-data-table-server
    :headers
    :items="transactions"
    class="my-custom-table elevation-1"
    color="primary"
    :items-length="count"
    @update:page="(newPage) => page = newPage"
  >
    <template #item.status="{ item }">
      <v-chip
        :color="
          item.status === 'success'
            ? 'success'
            : item.status === 'in_progress'
            ? 'warning'
            : 'initiated'
        "
        :text="item.status.replace('_', ' ')"
        class="text-capitalize"
      />
    </template>
    <template #item.amount="{ item }">
      <p>
        {{ formatAmount(item.amount) }}
      </p>
    </template>
    <template #item.gross_amount="{ item }">
      <p>
        {{ formatAmount(item.gross_amount) }}
      </p>
    </template>
    <template #item.created_at="{ item }">
      <p>{{ moment(item.timestamp).format("Do MMMM YYYY") }}</p>
    </template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import moment from "moment";
import type { IFreelancerWalletTransaction } from "~/types/freelancer";

defineProps<{
  transactions: IFreelancerWalletTransaction[];
  count: number;
}>();
const page = defineModel<number>("page", { default: 1 });
const headers = [
  {
    title: "Transaction ID",
    value: "id",
  },
  {
    title: "Status",
    value: "status",
  },
  {
    title: "Gross Amount",
    value: "gross_amount",
  },
  {
    title: "Amount",
    value: "amount",
  },
  {
    title: "Date",
    value: "created_at",
  },
];
</script>

<style scoped>
.my-custom-table :deep(thead th) {
  background-color: #f7f7f7 !important;
}
</style>
