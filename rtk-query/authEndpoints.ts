import { iLoveDoxApiSlice } from "./apiSlice";
import type {
  ISignupRequest,
  IAuthResponse,
  ILoginRequest,
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
  }),
});

export const { useSignupMutation, useLoginMutation, useVerifyEmailMutation } = authApi;
