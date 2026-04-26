import { iLoveDoxApiSlice } from "./apiSlice";
import type { ISignupRequest, IAuthResponse, ILoginRequest } from "@/interfaces/auth";

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
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
