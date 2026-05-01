export interface ISignupRequest {
  email: string;
  password: string;
  full_name: string;
  organization_name: string;
}
export interface ILoginRequest {
  email: string;
  password: string;
}
export interface IAuthUser {
  id: string;
  email: string;
  full_name: string;
  organization_name: string;
  is_active: boolean;
  created_at: string;
}

export interface IAuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: IAuthUser;
}

export interface ICreateApiTokenRequest {
  name: string;
  scopes: string[];
  expires_in_days: number;
}

export interface ICreateApiTokenResponse {
  key: string;
}
