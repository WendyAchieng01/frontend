export type UserType = "client" | "freelancer" | "admin";

export interface IUser {
  id: number;
  email: string;
  username: string;
  user_type: UserType;
  full_name: string;
  is_verified: boolean;
  profile_photo_url: string;
}

export interface IAuthResponse {
  access: string;
  refresh: string;
  access_expires: string;
  refresh_expires: string;
  user_type: UserType;
  user: {
    profile_data: {
      id: number;
      username: string;
      email: string;
      first_name: string;
      last_name: string;
    }
  }
}

export interface ILoginPayload {
  username: string;
  password: string;
  remember_me?: boolean;
}

export interface IRegisterPayload {
  user: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  password: string;
  password_confirmation: string;
  user_type: UserType;
}

export interface IPasswordChangePayload {
  new_password: string;
  confirm_new_password: string;
}

export interface IPasswordResetRequestPayload {
  email: string;
}

export interface IPasswordResetConfirmPayload {
  uid: string;
  token: string;
  new_password: string;
  new_password_confirm: string;
}
export interface ITokenRefreshResponse {
  access: string;
  refresh: string;
}
