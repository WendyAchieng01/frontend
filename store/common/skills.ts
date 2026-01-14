import type { ISkill, ISkillCreatePayload } from "~/types/common.d";
import { useAppStore } from "~/store/app";

export const useCommonSkillsStore = defineStore("commonSkills", () => {
  // State
  const skills = ref<ISkill[]>([]);
  const isLoading = ref<boolean>(false);
  const totalSkillsCount = ref<number>(0);

  // Getters
  const hasSkills = computed(() => skills.value.length > 0);

  const { $apiClient } = useNuxtApp();
  const appStore = useAppStore();

  // Actions

  /**
   * Fetches a paginated list of all skills available on the platform.
   * @param params Optional query parameters for filtering/pagination.
   */
  async function fetchAllSkills(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    ordering?: string;
  }) {
    isLoading.value = true;
    try {
      const response = await $apiClient<PaginatedResponse<ISkill>>("/skills/", {
        method: "GET",
        query: params,
      });
      skills.value = response.results;
      totalSkillsCount.value = response.count;
      return response.results;
    } catch (error: any) {
      console.error("Failed to fetch all skills:", error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to load skills.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Creates a new skill.
   * @param payload The skill data.
   */
  async function createSkill(payload: ISkillCreatePayload) {
    isLoading.value = true;
    try {
      const response = await $apiClient<ISkill>("/skills/", {
        method: "POST",
        body: payload,
      });
      skills.value.unshift(response);
      totalSkillsCount.value++;
      appStore.showSnackBar({
        type: "success",
        message: "Skill created successfully!",
      });
      return response;
    } catch (error: any) {
      console.error("Failed to create skill:", error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to create skill.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Updates an existing skill.
   * @param skillId The ID of the skill to update.
   * @param payload The partial skill data to update.
   */
  async function updateSkill(
    skillId: number,
    payload: Partial<ISkillCreatePayload>
  ) {
    isLoading.value = true;
    try {
      const response = await $apiClient<ISkill>(`/skills/${skillId}/`, {
        method: "PATCH",
        body: payload,
      });
      const index = skills.value.findIndex((skill) => skill.id === skillId);
      if (index !== -1) {
        skills.value[index] = { ...skills.value[index], ...response };
      }
      appStore.showSnackBar({
        type: "success",
        message: "Skill updated successfully!",
      });
      return response;
    } catch (error: any) {
      console.error(`Failed to update skill ID ${skillId}:`, error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to update skill.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Deletes a skill.
   * @param skillId The ID of the skill to delete.
   */
  async function deleteSkill(skillId: number) {
    isLoading.value = true;
    try {
      await $apiClient(`/skills/${skillId}/`, {
        method: "DELETE",
      });
      skills.value = skills.value.filter((skill) => skill.id !== skillId);
      totalSkillsCount.value--;
      appStore.showSnackBar({
        type: "success",
        message: "Skill deleted successfully!",
      });
    } catch (error: any) {
      console.error(`Failed to delete skill ID ${skillId}:`, error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to delete skill.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    skills,
    isLoading,
    totalSkillsCount,
    hasSkills,
    fetchAllSkills,
    createSkill,
    updateSkill,
    deleteSkill,
  };
});
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
