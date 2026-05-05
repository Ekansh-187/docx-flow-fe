import { iLoveDoxApiSlice } from "./apiSlice";
import {
  type IScopeResponse,
  type ICreateApiTokenRequest,
  type ICreateApiTokenResponse,
  type ICurrentApiToken,
  ICurrentSubscriptionResponse
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
    getSubscription: builder.query<ICurrentSubscriptionResponse, void>({
      query: () => "me/subscription",
    }),
})
});

export const { useCreateApiTokenMutation, useGetApiTokensQuery, useGetScopesQuery, useGetSubscriptionQuery } = meApi;