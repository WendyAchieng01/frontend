// ~/plugins/apiClient.ts
import { ofetch } from "ofetch";
import { useAppStore } from "~/store/app";
import { useAuthStore } from "~/store/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const apiClient = ofetch.create({
    baseURL: nuxtApp.$config.public.apiBaseUrl,
    async onRequest({ request: _, options }) {
      const authStore = useAuthStore();
      const token = authStore.accessToken;

      if (token) {
        const headers =
          options.headers instanceof Headers
            ? options.headers
            : new Headers(options.headers);
        headers.set("Authorization", `Bearer ${token}`);
        options.headers = headers;
      }
    },
    async onResponseError({ request, response, options: _ }) {
      const appStore = useAppStore();
      const authStore = useAuthStore();
      const statusCode = response?.status;
      // Attempt to parse error message from common Django/DRF error keys
      const errorMessage =
        response?._data?.detail ||
        response?._data?.message ||
        response?._data?.error ||
        "An unexpected error occurred.";
      const url = request instanceof Request ? request.url : request.toString();

      console.error(`API Error: ${statusCode} - ${errorMessage} for ${url}`);

      if (statusCode === 401) {
        // Handle unauthorized errors - potentially try to refresh token or redirect to login
        if (authStore.refreshToken) {
          try {
            await authStore.refreshAuthToken();
          } catch (_refreshError) {
            console.log(_refreshError);

            appStore.showSnackBar({
              type: "error",
              message: "Session expired. Please log in again.",
            });
            authStore.logout();
            navigateTo("/auth/login");
          }
        } else {
          appStore.showSnackBar({
            type: "error",
            message: "Please log in to access this resource.",
          });
          authStore.logout();
          navigateTo("/auth/login");
        }
      } else if (statusCode >= 400 && statusCode < 500) {
        // Client-side errors (e.g., validation errors, bad request)
        appStore.showSnackBar({
          type: "error",
          message: `Error: ${errorMessage}`,
        });
      } else if (statusCode >= 500) {
        // Server-side errors
        appStore.showSnackBar({
          type: "error",
          message: "Server error. Please try again later.",
        });
      } else {
        // Other errors
        appStore.showSnackBar({
          type: "error",
          message: "Network error or unknown issue.",
        });
      }
    },
  });

  return {
    provide: {
      apiClient: apiClient,
    },
  };
});
