import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { envConfig } from "@/config/env";
import { logoutAndClear, loginWithTokens } from "@/utils/useAuth";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: envConfig.apiBaseUrl,
  prepareHeaders: (headers) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

export const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (refreshToken) {
          const refreshResult = await baseQuery(
            {
              url: "auth/refresh",
              method: "POST",
              body: { refresh_token: refreshToken },
            },
            api,
            extraOptions,
          );

          if (refreshResult.data) {
            const data = refreshResult.data as {
              access_token: string;
              refresh_token: string;
            };
            loginWithTokens(data.access_token, data.refresh_token);
            // Retry the original request with the new token
            result = await baseQuery(args, api, extraOptions);
          } else {
            logoutAndClear();
          }
        } else {
          logoutAndClear();
        }
      } finally {
        release();
      }
    } else {
      // Another request is already refreshing — wait and retry
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
