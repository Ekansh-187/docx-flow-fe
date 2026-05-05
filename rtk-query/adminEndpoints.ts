import { iLoveDoxApiSlice } from "./apiSlice";
import type {
  IPlanResponse
} from "@/interfaces/admin";


const adminApi = iLoveDoxApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query<IPlanResponse[], void>({
      query: () => ({
        url: "admin/plans",
        method: "GET"
      })
    })
  })
});

export const { useGetPlansQuery } = adminApi;