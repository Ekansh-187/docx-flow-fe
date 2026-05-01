import { iLoveDoxApiSlice } from "./apiSlice";
import type {
  ISignupRequest,
  IAuthResponse,
  ILoginRequest,
  ICreateApiTokenRequest,
  ICreateApiTokenResponse,
} from "@/interfaces/auth";

const authApi = iLoveDoxApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<IAuthResponse, ISignupRequest>({
      query: (body) => ({
        url: "auth/signup",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<IAuthResponse, ILoginRequest>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    createApiToken: builder.mutation<ICreateApiTokenResponse, ICreateApiTokenRequest>({
      query: (body) => ({
        url: "me/tokens",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useCreateApiTokenMutation } = authApi;
