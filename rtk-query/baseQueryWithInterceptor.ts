import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { IAuthUserState } from "@/store/auth-user/slice";
import {envConfig} from "@/config/env";

const baseQuery = fetchBaseQuery({
    baseUrl: envConfig.apiBaseUrl,
  prepareHeaders: (headers, api) => {
    const state = api.getState() as { authUser: IAuthUserState };
    // const token = state.authUser?.token;
    // if (token) {
    //   headers.set("Authorization", `Bearer ${token}`);
    // }
    return headers;
  },
});

export const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // TODO: Add token refresh logic here
    // For now, just return the error
  }

  return result;
};
