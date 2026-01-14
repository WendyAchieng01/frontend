import type { IAdminWalletTransaction } from "~/types/admin.d";
import { useAppStore } from "~/store/app";

export const useAdminWalletStore = defineStore("adminWallet", () => {
  // State
  const transactions = ref<IAdminWalletTransaction[]>([]);
  const isLoading = ref<boolean>(false);
  const totalTransactionsCount = ref<number>(0);

  // Getters
  const hasTransactions = computed(() => transactions.value.length > 0);

  const { $apiClient } = useNuxtApp();
  const appStore = useAppStore();

  // Actions

  /**
   * Fetches a paginated list of all wallet transactions on the platform.
   * @param params Optional query parameters for filtering/pagination.
   */
  async function fetchAllTransactions(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    ordering?: string;
    transaction_type?: string;
    status?: string;
    user_id?: number;
    start_date?: string;
    end_date?: string;
  }) {
    isLoading.value = true;
    try {
      const response = await $apiClient<
        PaginatedResponse<IAdminWalletTransaction>
      >("/wallet/transactions/", {
        method: "GET",
        query: params,
      });
      transactions.value = response.results;
      totalTransactionsCount.value = response.count;
      return response.results;
    } catch (error: any) {
      console.error("Failed to fetch all transactions for admin:", error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to load all transactions.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    transactions,
    isLoading,
    totalTransactionsCount,
    hasTransactions,
    fetchAllTransactions,
  };
});

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
