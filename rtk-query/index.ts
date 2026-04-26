export { iLoveDoxApiSlice } from "./apiSlice";
export type { ApiSlice } from "./apiSlice";

export {
  useGetDocumentsQuery,
  useLazyGetDocumentsQuery,
  useGetDocumentByIdQuery,
  useLazyGetDocumentByIdQuery,
  useConvertDocumentMutation,
  useDeleteDocumentMutation,
} from "./documentEndpoints";

export {
  useSignupMutation,
  useLoginMutation,
} from "./authEndpoints";
