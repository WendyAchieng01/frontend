import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { IClientProfile } from "~/types/client.d";
import { useAppStore } from "~/store/app";
import { useAuthStore } from "../auth";

export const useClientProfileStore = defineStore("clientProfile", () => {
  // State
  const clientProfile = ref<IClientProfile | null>(null);
  const isLoading = ref<boolean>(false);

  // Getters
  const hasProfile = computed(() => !!clientProfile.value);

  const { $apiClient } = useNuxtApp();
  const appStore = useAppStore();

  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);

  // Actions
  async function fetchClientProfile() {
    isLoading.value = true;
    try {
      const response = await $apiClient<{ data: IClientProfile }>(
        `/clients/me`,
        {
          method: "GET",
        }
      );
      clientProfile.value = response.data;

      // update the auth state user
      if (user.value) {
        user.value.full_name = clientProfile.value.full_name;
        user.value.email = clientProfile.value.profile.user.email;
        user.value.profile_photo_url =
          clientProfile.value.profile?.profile_pic ?? "";
      }

      return response;
    } catch (error: any) {
      console.error("Failed to fetch client profile:", error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to load client profile.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function createClientProfile(payload: Partial<IClientProfile>) {
    isLoading.value = true;
    try {
      const response = await $apiClient<IClientProfile>("/clients/", {
        method: "POST",
        body: payload,
      });
      clientProfile.value = response;
      appStore.showSnackBar({
        type: "success",
        message: "Client profile created successfully!",
      });
      return response;
    } catch (error: any) {
      console.error("Failed to create client profile:", error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to create client profile.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function updateClientProfile(
    payload: Partial<IClientProfile> | FormData
  ) {
    isLoading.value = true;
    try {
      const response = await $apiClient<IClientProfile>(`/clients/me/`, {
        method: "PATCH",
        body: payload,
      });
      clientProfile.value = response;
      appStore.showSnackBar({
        type: "success",
        message: "Client profile updated successfully!",
      });
      // re fetch profile
      await fetchClientProfile();
      return response;
    } catch (error: any) {
      console.error("Failed to update client profile:", error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to update client profile.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteClientProfile() {
    isLoading.value = true;
    try {
      await $apiClient("/client-form/", {
        method: "DELETE",
      });
      clientProfile.value = null;
      appStore.showSnackBar({
        type: "success",
        message: "Client profile deleted successfully!",
      });
    } catch (error: any) {
      console.error("Failed to delete client profile:", error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to delete client profile.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    clientProfile,
    isLoading,
    hasProfile,
    fetchClientProfile,
    createClientProfile,
    updateClientProfile,
    deleteClientProfile,
  };
});
