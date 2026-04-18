import type { ApiSlice } from "./apiSlice";
import type { IResponseWrapper, IPaginationResponseWrapper } from "@/interfaces/common";
import type { IDocument, IGetDocumentsRequest } from "@/interfaces/document";
import { toQueryString } from "@/utils/helper";

export const documentEndpoints = (apiSlice: ApiSlice) =>
  apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getDocuments: builder.query<
        IPaginationResponseWrapper<IDocument[]>,
        IGetDocumentsRequest
      >({
        query: (reqObj) => ({
          url: `documents?${toQueryString(reqObj as Record<string, unknown>)}`,
        }),
        providesTags: ["Document"],
      }),

      getDocumentById: builder.query<IDocument, string>({
        query: (id) => `documents/${id}`,
        transformResponse: (res: IResponseWrapper<IDocument>) => res.data,
        providesTags: ["Document"],
      }),

      convertDocument: builder.mutation<IDocument, FormData>({
        query: (body) => ({
          url: "file-converter/convert",
          method: "POST",
          body,
          // Skip Content-Type so browser sets multipart/form-data boundary
          headers: {},
        }),
        transformResponse: (res: IResponseWrapper<IDocument>) => res.data,
        invalidatesTags: ["Document"],
      }),

      deleteDocument: builder.mutation<void, string>({
        query: (id) => ({
          url: `documents/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Document"],
      }),
    }),
  });
