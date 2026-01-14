import { z } from "zod";
import type User from "~/types";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const externalApiBase = config.public.apiBase;

  try {
    const { email, password } = await readValidatedBody(
      event,
      bodySchema.parse
    );

    const backendAuthResponse = await $fetch<User>(
      `${externalApiBase}/auth/login`,
      {
        method: "POST",
        body: { email, password },
        headers: { "Content-Type": "application/json" },
        ignoreResponseError: true,
      }
    );

    if (!backendAuthResponse || !backendAuthResponse.id) {
      console.error("External backend login failed:", backendAuthResponse);
      throw createError({
        statusCode: 401,
        message: "Invalid credentials provided.",
      });
    }

    await setUserSession(event, {
      user: {
        id: backendAuthResponse.id,
        name: backendAuthResponse.name,
        email: backendAuthResponse.email,
        type: backendAuthResponse.type,
      },
      secure: {
        apiToken: "12345678",
      },
      loggedInAt: Date.now(),
    });

    return { success: true };
  } catch (error: any) {
    if (error.statusCode === 401) {
      throw error;
    }

    console.error("Login API route error:", error);
    throw createError({
      statusCode: 500,
      message: "An error occurred during login.",
    });
  }
});
