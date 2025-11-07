import type {
  IWalletSummary,
  IWalletTransaction,
  WalletTransactionType,
  WalletTransactionStatus,
} from "~/types/client.d";
import { useAppStore } from "~/store/app";

export const useClientWalletStore = defineStore("clientWallet", () => {
  // State
  const walletSummary = ref<IWalletSummary | null>(null);
  const transactions = ref<IWalletTransaction[]>([]);
  const total_spent = ref<number | null>(null);
  const isLoading = ref<boolean>(false);
  const totalTransactionsCount = ref<number>(0);

  // Getters
  const hasSummary = computed(() => !!walletSummary.value);
  const hasTransactions = computed(() => transactions.value.length > 0);

  const { $apiClient } = useNuxtApp();
  const appStore = useAppStore();

  // Actions

  /**
   * Fetches the client's wallet summary (balance, etc.).
   */
  async function fetchWalletSummary() {
    isLoading.value = true;
    try {
      const response = await $apiClient<IWalletSummary>("/wallet/summary/", {
        method: "GET",
      });
      walletSummary.value = response;
      return response;
    } catch (error: any) {
      console.error("Failed to fetch wallet summary:", error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to load wallet summary.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Fetches a paginated list of wallet transactions.
   * @param params Optional query parameters for filtering/pagination.
   */
  async function fetchWalletTransactions(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    transaction_type?: WalletTransactionType;
    status?: WalletTransactionStatus;
  }) {
    isLoading.value = true;
    try {
      const response = await $apiClient<PaginatedResponse<IWalletTransaction>>(
        "/wallet/transactions/",
        {
          method: "GET",
          query: params,
        }
      );
      transactions.value = response.results;
      total_spent.value = response.total_spent;
      totalTransactionsCount.value = response.count;
      return response.results;
    } catch (error: any) {
      console.error("Failed to fetch wallet transactions:", error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to load wallet transactions.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Initiates a payment for a specific job.
   * @param jobSlug The slug of the job for which to initiate payment.
   */
  async function initiatePayPalPaymentForJob(jobSlug: string) {
    isLoading.value = true;
    try {
      const response = await $apiClient<any>(`/payments/initiate/${jobSlug}/`, {
        method: "POST",
      });

      const redirectUrl = response?.paypal_url;

      if (redirectUrl) {
        window.location.href = redirectUrl;
        appStore.showSnackBar({
          type: "info",
          message: "Redirecting to payment gateway...",
        });
      } else {
        appStore.showSnackBar({
          type: "warning",
          message:
            "Payment initiation successful, but no redirect URL provided.",
        });
        console.warn(
          "Payment initiation response did not contain a redirect URL:",
          response
        );
      }
      return response;
    } catch (error: any) {
      console.error(`Failed to initiate payment for job ${jobSlug}:`, error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to initiate payment.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Initiates a payment via paystack for a specific job.
   * @param jobSlug The slug of the job for which to initiate payment.
   */
  async function initiatePaystackPaymentForJob(jobSlug: string) {
    isLoading.value = true;
    try {
      const response = await $apiClient<any>(`/payment/initiate/${jobSlug}/`, {
        method: "GET",
      });

      const redirectUrl = response?.authorization_url;

      if (redirectUrl) {
        appStore.showSnackBar({
          type: "info",
          message: "Redirecting to payment gateway...",
        });
        window.location.href = redirectUrl;
      } else {
        appStore.showSnackBar({
          type: "warning",
          message:
            "Payment initiation successful, but no redirect URL provided.",
        });
        console.warn(
          "Payment initiation response did not contain a redirect URL:",
          response
        );
      }
      return response;
    } catch (error: any) {
      console.error(`Failed to initiate payment for job ${jobSlug}:`, error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to initiate payment.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    walletSummary,
    transactions,
    total_spent,
    isLoading,
    totalTransactionsCount,
    hasSummary,
    hasTransactions,
    fetchWalletSummary,
    fetchWalletTransactions,
    initiatePayPalPaymentForJob,
    initiatePaystackPaymentForJob,
  };
});

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
