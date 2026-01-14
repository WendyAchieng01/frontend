import type { SnackBarData } from "~/types";

export const useAppStore = defineStore("app", () => {
  // snack bar
  const snackBarData = ref({
    visible: false,
    message: "",
    type: "success" as "success" | "error" | "warning" | "info",
  });

  function showSnackBar(data: SnackBarData) {
    snackBarData.value.visible = true;
    snackBarData.value.message = data.message;
    snackBarData.value.type = data.type;
  }

  // drawers
  const clientNavigationDrawer = ref(true);

  return {
    showSnackBar,
    snackBarData,
    clientNavigationDrawer,
  };
});
