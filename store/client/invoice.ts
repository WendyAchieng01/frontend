import type { IInvoice } from "~/types/client.d";
import { useAppStore } from "~/store/app";

export const useClientInvoiceStore = defineStore("clientInvoice", () => {
  // State
  const invoices = ref<IInvoice[]>([]);
  const currentInvoice = ref<IInvoice | null>(null);
  const isLoading = ref<boolean>(false);
  const totalInvoicesCount = ref<number>(0);

  // Getters
  const hasInvoices = computed(() => invoices.value.length > 0);
  const hasCurrentInvoice = computed(() => !!currentInvoice.value);

  const { $apiClient } = useNuxtApp();
  const appStore = useAppStore();

  // Actions

  /**
   * Fetches a paginated list of client's invoices.
   * @param params Optional query parameters for filtering/pagination.
   */
  async function fetchInvoices(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    ordering?: string;
  }) {
    isLoading.value = true;
    try {
      const response = await $apiClient<PaginatedResponse<IInvoice>>(
        "/invoice/",
        {
          method: "GET",
          query: params,
        }
      );
      invoices.value = response.results;
      totalInvoicesCount.value = response.count;
      return response.results;
    } catch (error: any) {
      console.error("Failed to fetch invoices:", error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to load invoices.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Fetches the details of a specific invoice by its ID.
   * @param id The ID of the invoice.
   */
  async function fetchInvoiceDetails(id: number) {
    isLoading.value = true;
    try {
      const response = await $apiClient<IInvoice>(`/invoice/${id}/`, {
        method: "GET",
      });
      currentInvoice.value = response;
      return response;
    } catch (error: any) {
      console.error(`Failed to fetch invoice details for ID ${id}:`, error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to load invoice details.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Deletes an invoice.
   * @param id The ID of the invoice to delete.
   */
  async function deleteInvoice(id: number) {
    isLoading.value = true;
    try {
      await $apiClient(`/invoice/${id}/`, {
        method: "DELETE",
      });
      // Remove the invoice from the local state
      invoices.value = invoices.value.filter((invoice) => invoice.id !== id);
      totalInvoicesCount.value--;
      if (currentInvoice.value && currentInvoice.value.id === id) {
        currentInvoice.value = null;
      }
      appStore.showSnackBar({
        type: "success",
        message: "Invoice deleted successfully!",
      });
    } catch (error: any) {
      console.error(`Failed to delete invoice with ID ${id}:`, error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to delete invoice.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    invoices,
    currentInvoice,
    isLoading,
    totalInvoicesCount,
    hasInvoices,
    hasCurrentInvoice,
    fetchInvoices,
    fetchInvoiceDetails,
    deleteInvoice,
  };
});

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
