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
export interface IVerifyEMail{
  email: string;
  otp: string;
}
export interface IRegisterResponse {
  email: string;
  message: string;
  expires_in: number;
}

export interface ICreateApiTokenRequest {
  name: string;
  scopes: string[];
  expires_in_days: number;
}

export interface ICreateApiTokenResponse {
  token: string;
  token_id: string;
  name: string;
  scopes: string[];
  expires_at: string;
  created_at: string;
}

export interface ICurrentApiToken {
  token_id: string;
  name: string;
  scopes: string[];
  prefix: string;
  last_used_at: string;
  expires_at: string;
  created_at: string;
  is_active: boolean;
}

export interface IAuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: IAuthUser;
}

export interface IScopeResponse{
  endpoint_name: string;
  scope: string;
}
