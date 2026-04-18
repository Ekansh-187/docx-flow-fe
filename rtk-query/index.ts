import { documentEndpoints } from "./documentEndpoints";

export { docxFlowApiSlice } from "./apiSlice";
export type { ApiSlice } from "./apiSlice";

import { docxFlowApiSlice } from "./apiSlice";

// Inject and re-export hooks
export const {
  useGetDocumentsQuery,
  useLazyGetDocumentsQuery,
  useGetDocumentByIdQuery,
  useLazyGetDocumentByIdQuery,
  useConvertDocumentMutation,
  useDeleteDocumentMutation,
} = documentEndpoints(docxFlowApiSlice);
