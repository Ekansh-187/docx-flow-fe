import { iLoveDoxApiSlice } from "./apiSlice";
import type {
  IScopeResponse,
  ICreateApiTokenRequest,
  ICreateApiTokenResponse,
  ICurrentApiToken
} from "@/interfaces/me";

const meApi = iLoveDoxApiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
    getScopes: builder.query<IScopeResponse[], void>({
        query: () =>({
            url: "me/endpoints",
            method: "GET",
        }),
    }),
})
});

export const { useCreateApiTokenMutation, useGetApiTokensQuery, useGetScopesQuery } = meApi;