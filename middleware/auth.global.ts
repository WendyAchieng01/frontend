import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  const publicRoutes = [
    "/",
    "/contact-us",
    "/about-us",
    "/frequently-asked-questions",
    "/.well-known/appspecific/com.chrome.devtools.json",
  ];
  const authOnlyRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/reset-link-success",
    "/auth/reset-password",
    "/auth/password-reset-success",
    "/auth/password-reset-confirm",
  ];

  const isAuthOnlyRoute = authOnlyRoutes.some(
    (route) => to.path === route || to.path.startsWith(route + "/")
  );
  const isPublicRoute = publicRoutes.includes(to.path);

  // If logged in, prevent access to auth-only pages
  if (authStore.user && isAuthOnlyRoute) {
    console.log(
      "Auth Middleware: Logged in, redirecting from unauthenticated-only route:",
      to.fullPath
    );
    switch (authStore.user.user_type) {
      case "admin":
        return navigateTo("/admin/dashboard");
      case "freelancer":
        return navigateTo("/freelancer/dashboard");
      case "client":
        return navigateTo("/client/dashboard");
      default:
        return navigateTo("/");
    }
  }

  // If NOT logged in and trying to access protected route
  if (!authStore.user && !isPublicRoute && !isAuthOnlyRoute) {
    console.log(
      "Auth Middleware: Not logged in, redirecting to login from protected route:",
      to.fullPath
    );
    return navigateTo("/auth/login");
  }
});
