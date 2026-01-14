import type { IAdminJob, IAdminJobApplication } from "~/types/admin.d";
import { useAppStore } from "~/store/app";

export const useAdminJobsStore = defineStore("adminJobs", () => {
  // State
  const jobs = ref<IAdminJob[]>([]);
  const currentJob = ref<IAdminJob | null>(null);
  const jobApplications = ref<IAdminJobApplication[]>([]);
  const isLoading = ref<boolean>(false);
  const totalJobsCount = ref<number>(0);
  const totalJobApplicationsCount = ref<number>(0);

  // Getters
  const hasJobs = computed(() => jobs.value.length > 0);
  const hasCurrentJob = computed(() => !!currentJob.value);
  const hasJobApplications = computed(() => jobApplications.value.length > 0);

  const { $apiClient } = useNuxtApp();
  const appStore = useAppStore();

  // Actions

  /**
   * Fetches a paginated list of all jobs on the platform.
   * @param params Optional query parameters for filtering/pagination.
   */
  async function fetchAllJobs(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    ordering?: string;
    job_type?: string;
    status?: string;
    client_id?: number;
  }) {
    isLoading.value = true;
    try {
      const response = await $apiClient<PaginatedResponse<IAdminJob>>(
        "/jobs/list/",
        {
          method: "GET",
          query: params,
        }
      );
      jobs.value = response.results;
      totalJobsCount.value = response.count;
      return response.results;
    } catch (error: any) {
      console.error("Failed to fetch all jobs for admin:", error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to load all jobs.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Fetches the details of a specific job.
   * @param jobSlug The slug of the job to retrieve.
   */
  async function fetchJobDetails(jobSlug: string) {
    isLoading.value = true;
    try {
      const response = await $apiClient<IAdminJob>(`/jobs/${jobSlug}/`, {
        method: "GET",
      });
      currentJob.value = response;
      return response;
    } catch (error: any) {
      console.error(
        `Failed to fetch job details for ${jobSlug} (admin):`,
        error
      );
      appStore.showSnackBar({
        type: "error",
        message: "Failed to load job details.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Updates an existing job's details.
   * @param jobSlug The slug of the job to update.
   * @param payload The partial job data to update.
   */
  async function updateJob(jobSlug: string, payload: Partial<IAdminJob>) {
    isLoading.value = true;
    try {
      const response = await $apiClient<IAdminJob>(`/jobs/${jobSlug}/`, {
        method: "PATCH",
        body: payload,
      });
      // Update the job in the local array if it exists
      const index = jobs.value.findIndex((job) => job.slug === jobSlug);
      if (index !== -1) {
        jobs.value[index] = { ...jobs.value[index], ...response };
      }
      if (currentJob.value?.slug === jobSlug) {
        currentJob.value = { ...currentJob.value, ...response };
      }
      appStore.showSnackBar({
        type: "success",
        message: "Job updated successfully!",
      });
      return response;
    } catch (error: any) {
      console.error(`Failed to update job ${jobSlug} (admin):`, error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to update job.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Deletes a job posting.
   * @param jobSlug The slug of the job to delete.
   */
  async function deleteJob(jobSlug: string) {
    isLoading.value = true;
    try {
      await $apiClient<void>(`/jobs/${jobSlug}/`, {
        method: "DELETE",
      });
      // Remove the job from the local 'jobs' array
      jobs.value = jobs.value.filter((job) => job.slug !== jobSlug);
      totalJobsCount.value--;
      if (currentJob.value?.slug === jobSlug) {
        currentJob.value = null;
      }
      appStore.showSnackBar({
        type: "success",
        message: "Job deleted successfully!",
      });
    } catch (error: any) {
      console.error(`Failed to delete job ${jobSlug} (admin):`, error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to delete job.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Fetches a paginated list of all applications for a specific job.
   * @param jobSlug The slug of the job to fetch applications for.
   * @param params Optional query parameters for filtering/pagination.
   */
  async function fetchApplicationsForJob(
    jobSlug: string,
    params?: {
      page?: number;
      pageSize?: number;
      search?: string;
      ordering?: string;
      status?: string;
      freelancer_id?: number;
    }
  ) {
    isLoading.value = true;
    try {
      const response = await $apiClient<
        PaginatedResponse<IAdminJobApplication>
      >(`/jobs/${jobSlug}/aplications/`, {
        method: "GET",
        query: params,
      });
      jobApplications.value = response.results;
      totalJobApplicationsCount.value = response.count;
      return response.results;
    } catch (error: any) {
      console.error(
        `Failed to fetch applications for job ${jobSlug} (admin):`,
        error
      );
      appStore.showSnackBar({
        type: "error",
        message: "Failed to load job applications.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    jobs,
    currentJob,
    jobApplications,
    isLoading,
    totalJobsCount,
    totalJobApplicationsCount,
    hasJobs,
    hasCurrentJob,
    hasJobApplications,
    fetchAllJobs,
    fetchJobDetails,
    updateJob,
    deleteJob,
    fetchApplicationsForJob,
  };
});

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
