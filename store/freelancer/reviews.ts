import type {
  IFreelancerReceivedReview,
  IFreelancerReviewClientPayload,
} from "~/types/freelancer.d";
import type { IReview } from "~/types/client.d";
import { useAppStore } from "~/store/app";
import { useAuthStore } from "../auth";

export const useFreelancerReviewsStore = defineStore(
  "freelancerReviews",
  () => {
    // State
    const receivedReviews = ref<IFreelancerReceivedReview[]>([]);
    const currentReview = ref<IFreelancerReceivedReview | null>(null);
    const isLoading = ref<boolean>(false);
    const totalReceivedReviewsCount = ref<number>(0);

    // Getters
    const hasReceivedReviews = computed(() => receivedReviews.value.length > 0);
    const hasCurrentReview = computed(() => !!currentReview.value);

    const { $apiClient } = useNuxtApp();
    const appStore = useAppStore();
    const authStore = useAuthStore();

    // Actions

    /**
     * Fetches a paginated list of reviews received by the authenticated freelancer.
     * @param freelancerId The ID of the freelancer whose reviews are being fetched (the recipient).
     * @param params Optional query parameters for filtering/pagination.
     */
    async function fetchReceivedReviews(
      params?: {
        page?: number;
        pageSize?: number;
        search?: string;
        ordering?: string;
      }
    ) {
      isLoading.value = true;
      try {
        const queryParams = {
          ...params,
          username: authStore.user?.username,
        };

        const response = await $apiClient<
          PaginatedResponse<IFreelancerReceivedReview>
        >("/reviews/", {
          method: "GET",
          query: queryParams,
        });
        receivedReviews.value = response.results;
        totalReceivedReviewsCount.value = response.count;
        return response.results;
      } catch (error: any) {
        console.error("Failed to fetch received reviews:", error);
        appStore.showSnackBar({
          type: "error",
          message: "Failed to load your received reviews.",
        });
        return Promise.reject(error);
      } finally {
        isLoading.value = false;
      }
    }
    /**
     * Fetches a paginated list of reviews given by the authenticated freelancer.
     * @param params Optional query parameters for filtering/pagination.
     */
    async function fetchGivenReviews(
      params?: {
        page?: number;
        pageSize?: number;
        search?: string;
        ordering?: string;
      }
    ) {
      isLoading.value = true;
      try {
        const queryParams = {
          ...params,
          username: authStore.user?.username,
        };

        const response = await $apiClient<
          PaginatedResponse<IFreelancerReceivedReview>
        >("/reviews/", {
          method: "GET",
          query: queryParams,
        });
        receivedReviews.value = response.results;
        totalReceivedReviewsCount.value = response.count;
        return response.results;
      } catch (error: any) {
        console.error("Failed to fetch received reviews:", error);
        appStore.showSnackBar({
          type: "error",
          message: "Failed to load your received reviews.",
        });
        return Promise.reject(error);
      } finally {
        isLoading.value = false;
      }
    }

    /**
     * Fetches the details of a specific review received by the freelancer.
     * @param id The ID of the review.
     */
    async function fetchReviewDetails(id: number) {
      isLoading.value = true;
      try {
        const response = await $apiClient<IFreelancerReceivedReview>(
          `/reviews/reviews/${id}/`,
          {
            method: "GET",
          }
        );
        currentReview.value = response;
        return response;
      } catch (error: any) {
        console.error(`Failed to fetch review details for ID ${id}:`, error);
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
     * Allows a freelancer to create a review for a client.
     * @param payload The review data, where 'recipient' is the client's user ID.
     */
    async function createReviewForClient(
      payload: IFreelancerReviewClientPayload
    ) {
      isLoading.value = true;
      try {
        const response = await $apiClient<IReview>("/reviews/reviews/", {
          method: "POST",
          body: payload,
        });
        appStore.showSnackBar({
          type: "success",
          message: "Review submitted for client successfully!",
        });
        return response;
      } catch (error: any) {
        console.error("Failed to create review for client:", error);
        appStore.showSnackBar({
          type: "error",
          message: "Failed to submit review for client.",
        });
        return Promise.reject(error);
      } finally {
        isLoading.value = false;
      }
    }

    return {
      receivedReviews,
      currentReview,
      isLoading,
      totalReceivedReviewsCount,
      hasReceivedReviews,
      hasCurrentReview,
      fetchReceivedReviews,
      fetchGivenReviews,
      fetchReviewDetails,
      createReviewForClient,
    };
  }
);

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
