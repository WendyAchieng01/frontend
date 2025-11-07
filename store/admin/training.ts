import type { IAdminTraining } from "~/types/admin.d";
import type { ITrainingCreatePayload } from "~/types/client.d";
import { useAppStore } from "~/store/app";

export const useAdminTrainingsStore = defineStore("adminTrainings", () => {
  // State
  const trainings = ref<IAdminTraining[]>([]);
  const currentTraining = ref<IAdminTraining | null>(null);
  const isLoading = ref<boolean>(false);
  const totalTrainingsCount = ref<number>(0);

  // Getters
  const hasTrainings = computed(() => trainings.value.length > 0);
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
      const response = await $apiClient<PaginatedResponse<IAdminTraining>>(
        `/academy/trainings/${jobSlug}/`,
        {
          method: "GET",
          query: params,
        }
      );
      trainings.value = response.results;
      totalTrainingsCount.value = response.count;
      return response.results;
    } catch (error: any) {
      console.error(
        `Failed to fetch trainings for job ${jobSlug} (admin):`,
        error
      );
      appStore.showSnackBar({
        type: "error",
        message: `Failed to load trainings for job ${jobSlug}.`,
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
      const response = await $apiClient<IAdminTraining>(
        `/academy/trainings/${jobSlug}/${trainingSlug}/`,
        {
          method: "GET",
        }
      );
      currentTraining.value = response;
      return response;
    } catch (error: any) {
      console.error(
        `Failed to fetch training details for ${trainingSlug} (job: ${jobSlug}, admin):`,
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

  /**
   * Creates a new training module for a specific job.
   * Admin can create training on behalf of a client or for a job.
   * NOTE: This endpoint with POST is assumed for Admin's capability.
   * @param jobSlug The slug of the job to create training for.
   * @param payload The training data.
   */
  async function createTraining(
    jobSlug: string,
    payload: ITrainingCreatePayload
  ) {
    isLoading.value = true;
    try {
      const response = await $apiClient<IAdminTraining>(
        `/academy/trainings/${jobSlug}/`,
        {
          method: "POST",
          body: payload,
        }
      );
      appStore.showSnackBar({
        type: "success",
        message: "Training created successfully!",
      });
      return response;
    } catch (error: any) {
      console.error(
        `Failed to create training for job ${jobSlug} (admin):`,
        error
      );
      appStore.showSnackBar({
        type: "error",
        message: "Failed to create training.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Updates an existing training module.
   * @param jobSlug The slug of the job associated with the training.
   * @param trainingSlug The slug of the training module to update.
   * @param payload The partial training data to update.
   */
  async function updateTraining(
    jobSlug: string,
    trainingSlug: string,
    payload: Partial<ITrainingCreatePayload>
  ) {
    isLoading.value = true;
    try {
      const response = await $apiClient<IAdminTraining>(
        `/academy/trainings/${jobSlug}/${trainingSlug}/`,
        {
          method: "PATCH",
          body: payload,
        }
      );
      // Update in local state if exists
      const index = trainings.value.findIndex(
        (t) => t.slug === trainingSlug && t.job === jobSlug
      );
      if (index !== -1) {
        trainings.value[index] = { ...trainings.value[index], ...response };
      }
      if (
        currentTraining.value?.slug === trainingSlug &&
        currentTraining.value?.job === jobSlug
      ) {
        currentTraining.value = { ...currentTraining.value, ...response };
      }
      appStore.showSnackBar({
        type: "success",
        message: "Training updated successfully!",
      });
      return response;
    } catch (error: any) {
      console.error(
        `Failed to update training ${trainingSlug} (job: ${jobSlug}, admin):`,
        error
      );
      appStore.showSnackBar({
        type: "error",
        message: "Failed to update training.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Deletes a training module.
   * @param jobSlug The slug of the job associated with the training.
   * @param trainingSlug The slug of the training module to delete.
   */
  async function deleteTraining(jobSlug: string, trainingSlug: string) {
    isLoading.value = true;
    try {
      await $apiClient<void>(`/academy/trainings/${jobSlug}/${trainingSlug}/`, {
        method: "DELETE",
      });
      // Remove from local state
      trainings.value = trainings.value.filter(
        (t) => !(t.slug === trainingSlug && t.job === jobSlug)
      );
      totalTrainingsCount.value--;
      if (
        currentTraining.value?.slug === trainingSlug &&
        currentTraining.value?.job === jobSlug
      ) {
        currentTraining.value = null;
      }
      appStore.showSnackBar({
        type: "success",
        message: "Training deleted successfully!",
      });
    } catch (error: any) {
      console.error(
        `Failed to delete training ${trainingSlug} (job: ${jobSlug}, admin):`,
        error
      );
      appStore.showSnackBar({
        type: "error",
        message: "Failed to delete training.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    trainings,
    currentTraining,
    isLoading,
    totalTrainingsCount,
    hasTrainings,
    hasCurrentTraining,
    fetchTrainingsForJob,
    fetchTrainingDetails,
    createTraining,
    updateTraining,
    deleteTraining,
  };
});

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
