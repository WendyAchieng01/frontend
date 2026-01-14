import type { IAdminReview } from "~/types/admin.d";
import { useAppStore } from "~/store/app";

export const useAdminReviewsStore = defineStore("adminReviews", () => {
  // State
  const reviews = ref<IAdminReview[]>([]);
  const currentReview = ref<IAdminReview | null>(null);
  const isLoading = ref<boolean>(false);
  const totalReviewsCount = ref<number>(0);

  // Getters
  const hasReviews = computed(() => reviews.value.length > 0);
  const hasCurrentReview = computed(() => !!currentReview.value);

  // Helper for API client and app-wide snackbar
  const { $apiClient } = useNuxtApp();
  const appStore = useAppStore();

  // Actions

  /**
   * Fetches a paginated list of all reviews on the platform
   * @param params Optional query parameters for filtering/pagination.
   */
  async function fetchAllReviews(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    ordering?: string;
    reviewer_id?: number;
    recipient_id?: number;
    job_id?: number;
    rating?: number;
  }) {
    isLoading.value = true;
    try {
      const response = await $apiClient<PaginatedResponse<IAdminReview>>(
        "/reviews/reviews/",
        {
          method: "GET",
          query: params,
        }
      );
      reviews.value = response.results;
      totalReviewsCount.value = response.count;
      return response.results;
    } catch (error: any) {
      console.error("Failed to fetch all reviews for admin:", error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to load all reviews.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Fetches the details of a specific review by its ID.
   * @param reviewId The ID of the review to retrieve.
   */
  async function fetchReviewDetails(reviewId: number) {
    isLoading.value = true;
    try {
      const response = await $apiClient<IAdminReview>(
        `/reviews/reviews/${reviewId}/`,
        {
          method: "GET",
        }
      );
      currentReview.value = response;
      return response;
    } catch (error: any) {
      console.error(
        `Failed to fetch review details for ID ${reviewId} (admin):`,
        error
      );
      appStore.showSnackBar({
        type: "error",
        message: "Failed to load review details.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Deletes a review.
   * @param reviewId The ID of the review to delete.
   */
  async function deleteReview(reviewId: number) {
    isLoading.value = true;
    try {
      await $apiClient<void>(`/reviews/reviews/${reviewId}/`, {
        method: "DELETE",
      });
      // Remove the review from the local 'reviews' array
      reviews.value = reviews.value.filter((review) => review.id !== reviewId);
      totalReviewsCount.value--;
      if (currentReview.value?.id === reviewId) {
        currentReview.value = null;
      }
      appStore.showSnackBar({
        type: "success",
        message: "Review deleted successfully!",
      });
    } catch (error: any) {
      console.error(`Failed to delete review ID ${reviewId} (admin):`, error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to delete review.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    reviews,
    currentReview,
    isLoading,
    totalReviewsCount,
    hasReviews,
    hasCurrentReview,
    fetchAllReviews,
    fetchReviewDetails,
    deleteReview,
  };
});

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
