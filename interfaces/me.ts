
export interface IScopeResponse{
  endpoint_name: string;
  name: string;
  scope: string;
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