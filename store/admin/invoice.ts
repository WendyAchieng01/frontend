import type { IAdminInvoice } from "~/types/admin.d";
import { useAppStore } from "~/store/app";
import type { IInvoice } from "~/types/client";

export const useAdminInvoicesStore = defineStore("adminInvoices", () => {
  // State
  const invoices = ref<IAdminInvoice[]>([]);
  const currentInvoice = ref<IAdminInvoice | null>(null);
  const isLoading = ref<boolean>(false);
  const totalInvoicesCount = ref<number>(0);

  // Getters
  const hasInvoices = computed(() => invoices.value.length > 0);
  const hasCurrentInvoice = computed(() => !!currentInvoice.value);

  const { $apiClient } = useNuxtApp();
  const appStore = useAppStore();

  // Actions

  /**
   * Fetches a paginated list of all invoices on the platform.
   * @param params Optional query parameters for filtering/pagination (search, page, ordering).
   */
  async function fetchAllInvoices(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    ordering?: string;
    invoice_date_after?: string;
    invoice_date_before?: string;
    due_date_after?: string;
    due_date_before?: string;
    status?: string;
    client_id?: number;
  }) {
    isLoading.value = true;
    try {
      const response = await $apiClient<PaginatedResponse<IAdminInvoice>>(
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
      console.error("Failed to fetch all invoices for admin:", error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to load all invoices.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Fetches the details of a specific invoice by its ID.
   * @param invoiceId The ID of the invoice to retrieve.
   */
  async function fetchInvoiceDetails(invoiceId: number) {
    isLoading.value = true;
    try {
      const response = await $apiClient<IAdminInvoice>(
        `/invoice/${invoiceId}/`,
        {
          method: "GET",
        }
      );
      currentInvoice.value = response;
      return response;
    } catch (error: any) {
      console.error(
        `Failed to fetch invoice details for ID ${invoiceId} (admin):`,
        error
      );
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
   * Creates a new invoice.
   * @param payload The invoice data.
   */
  async function createInvoice(payload: IInvoice) {
    isLoading.value = true;
    try {
      const response = await $apiClient<IAdminInvoice>("/invoice/", {
        method: "POST",
        body: payload,
      });
      appStore.showSnackBar({
        type: "success",
        message: "Invoice created successfully!",
      });
      return response;
    } catch (error: any) {
      console.error("Failed to create invoice (admin):", error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to create invoice.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Updates an existing invoice's details.
   * @param invoiceId The ID of the invoice to update.
   * @param payload The partial invoice data to update.
   */
  async function updateInvoice(
    invoiceId: number,
    payload: Partial<IInvoice>
  ) {
    isLoading.value = true;
    try {
      const response = await $apiClient<IAdminInvoice>(
        `/invoice/${invoiceId}/`,
        {
          method: "PATCH",
          body: payload,
        }
      );

      // Update the invoice in the local array if it exists
      const index = invoices.value.findIndex((inv) => inv.id === invoiceId);
      if (index !== -1) {
        invoices.value[index] = { ...invoices.value[index], ...response };
      }
      if (currentInvoice.value?.id === invoiceId) {
        currentInvoice.value = { ...currentInvoice.value, ...response };
      }
      appStore.showSnackBar({
        type: "success",
        message: "Invoice updated successfully!",
      });
      return response;
    } catch (error: any) {
      console.error(`Failed to update invoice ID ${invoiceId} (admin):`, error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to update invoice.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Deletes an invoice.
   * @param invoiceId The ID of the invoice to delete.
   */
  async function deleteInvoice(invoiceId: number) {
    isLoading.value = true;
    try {
      await $apiClient<void>(`/invoice/${invoiceId}/`, {
        method: "DELETE",
      });
      // Remove the invoice from the local array
      invoices.value = invoices.value.filter((inv) => inv.id !== invoiceId);
      totalInvoicesCount.value--;
      if (currentInvoice.value?.id === invoiceId) {
        currentInvoice.value = null;
      }
      appStore.showSnackBar({
        type: "success",
        message: "Invoice deleted successfully!",
      });
    } catch (error: any) {
      console.error(`Failed to delete invoice ID ${invoiceId} (admin):`, error);
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
    fetchAllInvoices,
    fetchInvoiceDetails,
    createInvoice,
    updateInvoice,
    deleteInvoice,
  };
});

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
