export type UserRole = "freelancer" | "client" | "admin";

export default interface User {
  id: string;
  name: string;
  email: string;
  type: "freelancer" | "client" | "admin";
}

export type SnackBarType = "success" | "error" | "warning" | "info";
export interface SnackBarData {
  type: SnackBarType;
  message: string;
}

declare module "#auth-utils" {
  interface UserSession {
    loggedInAt?: number;
  }

  interface User {
    id: string | number;
    name: string;
    email?: string;
    role: UserRole;
  }
}
