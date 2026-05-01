import { iLoveDoxApiSlice } from "./apiSlice";
import type { IResponseWrapper, IPaginationResponseWrapper } from "@/interfaces/common";
import type { IDocument, IGetDocumentsRequest } from "@/interfaces/document";
import { toQueryString } from "@/utils/helper";

const documentApi = iLoveDoxApiSlice.injectEndpoints({
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

    convertDocument: builder.mutation<Blob, FormData>({
      query: (body) => ({
        url: "web/convert",
        method: "POST",
        body,
        // Use API key for conversion; skip Content-Type so browser sets multipart boundary
        headers: {
          // Authorization: 'Bearer abc',
        },
        responseHandler: (response) => response.blob(),
      }),
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

export const {
  useGetDocumentsQuery,
  useLazyGetDocumentsQuery,
  useGetDocumentByIdQuery,
  useLazyGetDocumentByIdQuery,
  useConvertDocumentMutation,
  useDeleteDocumentMutation,
} = documentApi;
