import type {
  IAdminUser,
  IAdminUserCreatePayload,
  IAdminUserUpdatePayload,
} from "~/types/admin.d";
import type { IClientProfile } from "~/types/client.d";
import type { IFreelancerProfile } from "~/types/freelancer.d";
import { useAppStore } from "~/store/app";

export const useAdminUsersStore = defineStore("adminUsers", () => {
  // State
  const users = ref<IAdminUser[]>([]);
  const currentUser = ref<IAdminUser | null>(null);
  const currentClientProfile = ref<IClientProfile | null>(null);
  const currentFreelancerProfile = ref<IFreelancerProfile | null>(null);
  const isLoading = ref<boolean>(false);
  const totalUsersCount = ref<number>(0);

  // Getters
  const hasUsers = computed(() => users.value.length > 0);
  const hasCurrentUser = computed(() => !!currentUser.value);

  const { $apiClient } = useNuxtApp();
  const appStore = useAppStore();

  // Actions

  /**
   * Fetches a paginated list of all users on the platform.
   * @param params Optional query parameters for filtering/pagination (search, page, ordering).
   */
  async function fetchAllUsers(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    ordering?: string;
  }) {
    isLoading.value = true;
    try {
      const response = await $apiClient<PaginatedResponse<IAdminUser>>(
        "/accounts/users/",
        {
          method: "GET",
          query: params,
        }
      );
      users.value = response.results;
      totalUsersCount.value = response.count;
      return response.results;
    } catch (error: any) {
      console.error("Failed to fetch all users:", error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to load user list.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Fetches the details of a specific user by their ID.
   * @param userId The ID of the user to retrieve.
   */
  async function fetchUserDetails(userId: number) {
    isLoading.value = true;
    try {
      const response = await $apiClient<IAdminUser>(
        `/accounts/users/${userId}/`,
        {
          method: "GET",
        }
      );
      currentUser.value = response;
      return response;
    } catch (error: any) {
      console.error(`Failed to fetch user details for ID ${userId}:`, error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to load user details.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Creates a new user account.
   * @param payload The user data including username, email, and password.
   */
  async function createUser(payload: IAdminUserCreatePayload) {
    isLoading.value = true;
    try {
      const response = await $apiClient<IAdminUser>("/accounts/users/", {
        method: "POST",
        body: payload,
      });
      appStore.showSnackBar({
        type: "success",
        message: "User created successfully!",
      });
      return response;
    } catch (error: any) {
      console.error("Failed to create user:", error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to create user account.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Updates an existing user's details.
   * @param userId The ID of the user to update.
   * @param payload The partial user data to update.
   */
  async function updateUser(userId: number, payload: IAdminUserUpdatePayload) {
    isLoading.value = true;
    try {
      const response = await $apiClient<IAdminUser>(
        `/accounts/users/${userId}/`,
        {
          method: "PATCH",
          body: payload,
        }
      );
      // Update the user in the local array if it exists
      const index = users.value.findIndex((user) => user.id === userId);
      if (index !== -1) {
        users.value[index] = { ...users.value[index], ...response };
      }
      if (currentUser.value?.id === userId) {
        currentUser.value = { ...currentUser.value, ...response };
      }
      appStore.showSnackBar({
        type: "success",
        message: "User updated successfully!",
      });
      return response;
    } catch (error: any) {
      console.error(`Failed to update user ID ${userId}:`, error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to update user.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Deletes a user account.
   * @param userId The ID of the user to delete.
   */
  async function deleteUser(userId: number) {
    isLoading.value = true;
    try {
      await $apiClient<void>(`/accounts/users/${userId}/`, {
        method: "DELETE",
      });
      // Remove the user from the local array
      users.value = users.value.filter((user) => user.id !== userId);
      totalUsersCount.value--;
      if (currentUser.value?.id === userId) {
        currentUser.value = null;
      }
      appStore.showSnackBar({
        type: "success",
        message: "User deleted successfully!",
      });
    } catch (error: any) {
      console.error(`Failed to delete user ID ${userId}:`, error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to delete user.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Fetches the client profile associated with a given user ID.
   * @param userId The ID of the user whose client profile is to be fetched.
   */
  async function fetchClientProfileForUser(userId: number) {
    isLoading.value = true;
    try {
      const response = await $apiClient<IClientProfile>(
        `/client-form/${userId}/`,
        {
          method: "GET",
        }
      );
      currentClientProfile.value = response;
      return response;
    } catch (error: any) {
      console.error(
        `Failed to fetch client profile for user ID ${userId}:`,
        error
      );
      appStore.showSnackBar({
        type: "error",
        message: "Failed to load client profile.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Fetches the freelancer profile associated with a given user ID.
   * @param userId The ID of the user whose freelancer profile is to be fetched.
   */
  async function fetchFreelancerProfileForUser(userId: number) {
    isLoading.value = true;
    try {
      const response = await $apiClient<IFreelancerProfile>(
        `/freelancer-form/${userId}/`,
        {
          method: "GET",
        }
      );
      currentFreelancerProfile.value = response;
      return response;
    } catch (error: any) {
      console.error(
        `Failed to fetch freelancer profile for user ID ${userId}:`,
        error
      );
      appStore.showSnackBar({
        type: "error",
        message: "Failed to load freelancer profile.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    users,
    currentUser,
    currentClientProfile,
    currentFreelancerProfile,
    isLoading,
    totalUsersCount,
    hasUsers,
    hasCurrentUser,
    fetchAllUsers,
    fetchUserDetails,
    createUser,
    updateUser,
    deleteUser,
    fetchClientProfileForUser,
    fetchFreelancerProfileForUser,
  };
});

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
