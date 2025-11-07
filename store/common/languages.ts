import type { ILanguage, ILanguageCreatePayload } from "~/types/common.d";
import { useAppStore } from "~/store/app";

export const useCommonLanguagesStore = defineStore("commonLanguages", () => {
  // State
  const languages = ref<ILanguage[]>([]);
  const isLoading = ref<boolean>(false);
  const totalLanguagesCount = ref<number>(0);

  // Getters
  const hasLanguages = computed(() => languages.value.length > 0);

  const { $apiClient } = useNuxtApp();
  const appStore = useAppStore();

  // Actions

  /**
   * Fetches a paginated list of all languages available on the platform.
   * @param params Optional query parameters for filtering/pagination.
   */
  async function fetchAllLanguages(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    ordering?: string;
  }) {
    isLoading.value = true;
    try {
      const response = await $apiClient<PaginatedResponse<ILanguage>>(
        "/languages/",
        {
          method: "GET",
          query: params,
        }
      );
      languages.value = response.results;
      totalLanguagesCount.value = response.count;
      return response.results;
    } catch (error: any) {
      console.error("Failed to fetch all languages:", error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to load languages.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Creates a new language.
   * Assumes a standard endpoint for creating languages.
   * @param payload The language data.
   */
  async function createLanguage(payload: ILanguageCreatePayload) {
    isLoading.value = true;
    try {
      const response = await $apiClient<ILanguage>("/languages/", {
        method: "POST",
        body: payload,
      });
      appStore.showSnackBar({
        type: "success",
        message: "Language created successfully!",
      });
      return response;
    } catch (error: any) {
      console.error("Failed to create language:", error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to create language.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Updates an existing language.
   * Assumes a standard endpoint for updating languages.
   * @param languageId The ID of the language to update.
   * @param payload The partial language data to update.
   */
  async function updateLanguage(
    languageId: number,
    payload: Partial<ILanguageCreatePayload>
  ) {
    isLoading.value = true;
    try {
      const response = await $apiClient<ILanguage>(
        `/languages/${languageId}/`,
        {
          method: "PATCH",
          body: payload,
        }
      );
      const index = languages.value.findIndex((lang) => lang.id === languageId);
      if (index !== -1) {
        languages.value[index] = { ...languages.value[index], ...response };
      }
      appStore.showSnackBar({
        type: "success",
        message: "Language updated successfully!",
      });
      return response;
    } catch (error: any) {
      console.error(`Failed to update language ID ${languageId}:`, error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to update language.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Deletes a language.
   * Assumes a standard endpoint for deleting languages.
   * @param languageId The ID of the language to delete.
   */
  async function deleteLanguage(languageId: number) {
    isLoading.value = true;
    try {
      await $apiClient(`/languages/${languageId}/`, {
        method: "DELETE",
      });
      languages.value = languages.value.filter(
        (lang) => lang.id !== languageId
      );
      totalLanguagesCount.value--;
      appStore.showSnackBar({
        type: "success",
        message: "Language deleted successfully!",
      });
    } catch (error: any) {
      console.error(`Failed to delete language ID ${languageId}:`, error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to delete language.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    languages,
    isLoading,
    totalLanguagesCount,
    hasLanguages,
    fetchAllLanguages,
    createLanguage,
    updateLanguage,
    deleteLanguage,
  };
});

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
