import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "./baseQueryWithInterceptor";

export const docxFlowApiSlice = createApi({
  reducerPath: "docxFlowApi",
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["Document"],
  endpoints: (_) => ({}), // empty — everything is injected
});

export type ApiSlice = typeof docxFlowApiSlice;
