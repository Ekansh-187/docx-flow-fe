import { iLoveDoxApiSlice } from "./apiSlice";


const contactApi = iLoveDoxApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendContactQuery: builder.mutation({
      query: (body) => ({
        url: "/contact/query",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSendContactQueryMutation
} = contactApi;
