export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const externalApiBase = config.public.apiBase;

  try {
    await clearUserSession(event);
    console.log("Nuxt session cleared.");

    // try {
    //   await $fetch(`${externalApiBase}/auth/logout`, {
    //     method: "POST",
    //     ignoreResponseError: true,
    //   });
    //   console.log("Attempted to call external backend logout.");
    // } catch (backendError) {
    //   // Log the error but don't re-throw, as the primary goal (clearing Nuxt session) succeeded
    //   console.error("Error calling external backend logout:", backendError);
    // }

    return { status: "OK", message: "Logged out successfully" };
  } catch (error) {
    console.error("Error during logout process:", error);
    throw createError({
      statusCode: 500,
      message: "An error occurred during logout.",
    });
  }
});
