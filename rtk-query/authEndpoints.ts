import { iLoveDoxApiSlice } from "./apiSlice";
import type {
  ISignupRequest,
  IAuthResponse,
  ILoginRequest,
  ICreateApiTokenRequest,
  ICreateApiTokenResponse,
  ICurrentApiToken,
  IRegisterResponse,
  IVerifyEMail,
} from "@/interfaces/auth";

const authApi = iLoveDoxApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<IRegisterResponse, ISignupRequest>({
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
    verifyEmail: builder.mutation<IAuthResponse, IVerifyEMail>({
      query: (body) => ({
        url: "auth/verify-email",
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
      invalidatesTags: ["ApiToken"],
    }),
    getApiTokens: builder.query<ICurrentApiToken[], void>({
      query: () => "me/tokens",
      providesTags: ["ApiToken"],
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useVerifyEmailMutation, useCreateApiTokenMutation, useGetApiTokensQuery } = authApi;
