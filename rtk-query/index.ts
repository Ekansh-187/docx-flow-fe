import { documentEndpoints } from "./documentEndpoints";

export { iLoveDoxApiSlice } from "./apiSlice";
export type { ApiSlice } from "./apiSlice";

import { iLoveDoxApiSlice } from "./apiSlice";

// Inject and re-export hooks
export const {
  useGetDocumentsQuery,
  useLazyGetDocumentsQuery,
  useGetDocumentByIdQuery,
  useLazyGetDocumentByIdQuery,
  useConvertDocumentMutation,
  useDeleteDocumentMutation,
} = documentEndpoints(iLoveDoxApiSlice);
