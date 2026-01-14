import { defineStore } from "pinia";
import { useAppStore } from "~/store/app";

interface ApiItem {
    id: number;
    name: string;
}

interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export const useMetaStore = defineStore("meta", () => {
    const categories = ref<Array<{ text: string; value: string }>>([]);
    const skills = ref<Array<{ text: string; value: string }>>([]);
    const isLoading = ref(false);

    const { $apiClient } = useNuxtApp();
    const appStore = useAppStore();

    async function fetchMeta() {
        // Prevent refetching and storms
        if (categories.value.length || skills.value.length || isLoading.value) {
            return;
        }

        isLoading.value = true;
        try {
            const [catRes, skillRes] = await Promise.all([
                $apiClient<PaginatedResponse<ApiItem>>(
                    "/jobs/categories/?page_size=500",
                    { method: "GET" }
                ),
                $apiClient<PaginatedResponse<ApiItem>>(
                    "/skills/?page_size=500",
                    { method: "GET" }
                ),
            ]);

            categories.value = catRes.results.map((c) => ({
                text: c.name,
                value: c.name,
            }));

            skills.value = skillRes.results.map((s) => ({
                text: s.name,
                value: s.name,
            }));
        } catch (error: any) {
            console.error("Failed to fetch meta data:", error);
            appStore.showSnackBar({
                type: "error",
                message: "Failed to load categories and skills.",
            });
            return Promise.reject(error);
        } finally {
            isLoading.value = false;
        }
    }

    return {
        categories,
        skills,
        isLoading,
        fetchMeta,
    };
});
