import type { IFreelancerTraining } from "~/types/freelancer.d";
import { useAppStore } from "~/store/app";

export const useFreelancerTrainingsStore = defineStore(
  "freelancerTrainings",
  () => {
    // State
    const availableTrainings = ref<IFreelancerTraining[]>([]);
    const currentTraining = ref<IFreelancerTraining | null>(null);
    const isLoading = ref<boolean>(false);
    const totalTrainingsCount = ref<number>(0);

    // Getters
    const hasAvailableTrainings = computed(
      () => availableTrainings.value.length > 0
    );
    const hasCurrentTraining = computed(() => !!currentTraining.value);

    const { $apiClient } = useNuxtApp();
    const appStore = useAppStore();

    // Actions

    /**
     * Fetches a paginated list of training materials associated with a specific job.
     * @param jobSlug The slug of the job to fetch trainings for.
     * @param params Optional query parameters for filtering/pagination.
     */
    async function fetchTrainingsForJob(
      jobSlug: string,
      params?: {
        page?: number;
        pageSize?: number;
        search?: string;
        ordering?: string;
      }
    ) {
      isLoading.value = true;
      try {
        const response = await $apiClient<
          PaginatedResponse<IFreelancerTraining>
        >(`/academy/trainings/${jobSlug}/`, {
          method: "GET",
          query: params,
        });
        availableTrainings.value = response.results;
        totalTrainingsCount.value = response.count;
        return response.results;
      } catch (error: any) {
        console.error(`Failed to fetch trainings for job ${jobSlug}:`, error);
        appStore.showSnackBar({
          type: "error",
          message: "Failed to load trainings for this job.",
        });
        return Promise.reject(error);
      } finally {
        isLoading.value = false;
      }
    }

    /**
     * Fetches the details of a specific training module.
     * @param jobSlug The slug of the job associated with the training.
     * @param trainingSlug The slug of the training module.
     */
    async function fetchTrainingDetails(jobSlug: string, trainingSlug: string) {
      isLoading.value = true;
      try {
        const response = await $apiClient<IFreelancerTraining>(
          `/academy/trainings/${jobSlug}/${trainingSlug}/`,
          {
            method: "GET",
          }
        );
        currentTraining.value = response;
        return response;
      } catch (error: any) {
        console.error(
          `Failed to fetch training details for ${trainingSlug} (job: ${jobSlug}):`,
          error
        );
        appStore.showSnackBar({
          type: "error",
          message: "Failed to load training details.",
        });
        return Promise.reject(error);
      } finally {
        isLoading.value = false;
      }
    }

    return {
      availableTrainings,
      currentTraining,
      isLoading,
      totalTrainingsCount,
      hasAvailableTrainings,
      hasCurrentTraining,
      fetchTrainingsForJob,
      fetchTrainingDetails,
    };
  }
);

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
