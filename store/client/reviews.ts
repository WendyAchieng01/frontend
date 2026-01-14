import type { IReview, IReviewCreatePayload } from '~/types/client.d';
import { useAppStore } from '~/store/app';

export const useClientReviewsStore = defineStore('clientReviews', () => {
  // State
  const reviews = ref<IReview[]>([]);
  const currentReview = ref<IReview | null>(null);
  const isLoading = ref<boolean>(false);
  const totalReviewsCount = ref<number>(0);

  // Getters
  const hasReviews = computed(() => reviews.value.length > 0);
  const hasCurrentReview = computed(() => !!currentReview.value);

  const { $apiClient } = useNuxtApp();
  const appStore = useAppStore();

  // Actions

  /**
   * Creates a new review from the client for a freelancer.
   * @param payload The review data.
   */
  async function createReview(payload: IReviewCreatePayload) {
    isLoading.value = true;
    try {
      const response = await $apiClient<IReview>('/reviews/', {
        method: 'POST',
        body: payload,
      });
      reviews.value.unshift(response); // Add new review to the beginning of the list
      totalReviewsCount.value++;
      appStore.showSnackBar({ type: 'success', message: 'Review submitted successfully!' });
      return response;
    } catch (error: any) {
      console.error('Failed to create review:', error);
      appStore.showSnackBar({ type: 'error', message: 'Failed to submit review.' });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Fetches a paginated list of reviews given by the currently authenticated client.
   * @param clientId The ID of the client whose reviews are being fetched.
   * @param params Optional query parameters for filtering/pagination.
   */
  async function fetchClientReviews(clientId: number, params?: { page?: number; pageSize?: number; search?: string; ordering?: string }) {
    isLoading.value = true;
    try {
      const queryParams = {
        ...params,
        reviewer_id: clientId,
      };

      const response = await $apiClient<PaginatedResponse<IReview>>('/reviews/reviews/', {
        method: 'GET',
        query: queryParams,
      });
      reviews.value = response.results;
      totalReviewsCount.value = response.count;
      return response.results;
    } catch (error: any) {
      console.error('Failed to fetch client reviews:', error);
      appStore.showSnackBar({ type: 'error', message: 'Failed to load your reviews.' });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Fetches the details of a specific review by its ID.
   * @param id The ID of the review.
   */
  async function fetchReviewDetails(id: number) {
    isLoading.value = true;
    try {
      const response = await $apiClient<IReview>(`/reviews/reviews/${id}/`, {
        method: 'GET',
      });
      currentReview.value = response;
      return response;
    } catch (error: any) {
      console.error(`Failed to fetch review details for ID ${id}:`, error);
      appStore.showSnackBar({ type: 'error', message: 'Failed to load review details.' });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Updates an existing review.
   * @param id The ID of the review to update.
   * @param payload The partial review data to update.
   */
  async function updateReview(id: number, payload: Partial<IReviewCreatePayload>) {
    isLoading.value = true;
    try {
      const response = await $apiClient<IReview>(`/reviews/reviews/${id}/`, {
        method: 'PATCH',
        body: payload,
      });
      // Update the review in the local state if it's currently in the list or currentReview
      const index = reviews.value.findIndex(review => review.id === id);
      if (index !== -1) {
        reviews.value[index] = response;
      }
      if (currentReview.value && currentReview.value.id === id) {
        currentReview.value = response;
      }
      appStore.showSnackBar({ type: 'success', message: 'Review updated successfully!' });
      return response;
    } catch (error: any) {
      console.error(`Failed to update review with ID ${id}:`, error);
      appStore.showSnackBar({ type: 'error', message: 'Failed to update review.' });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Deletes a review.
   * @param id The ID of the review to delete.
   */
  async function deleteReview(id: number) {
    isLoading.value = true;
    try {
      await $apiClient(`/reviews/reviews/${id}/`, {
        method: 'DELETE',
      });
      // Remove the review from the local state
      reviews.value = reviews.value.filter(review => review.id !== id);
      totalReviewsCount.value--;
      if (currentReview.value && currentReview.value.id === id) {
        currentReview.value = null;
      }
      appStore.showSnackBar({ type: 'success', message: 'Review deleted successfully!' });
    } catch (error: any) {
      console.error(`Failed to delete review with ID ${id}:`, error);
      appStore.showSnackBar({ type: 'error', message: 'Failed to delete review.' });
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
    createReview,
    fetchClientReviews,
    fetchReviewDetails,
    updateReview,
    deleteReview,
  };
});

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}