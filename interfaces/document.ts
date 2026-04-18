export interface IDocument {
  id: string;
  fileName: string;
  status: "pending" | "processing" | "completed" | "failed";
  createdAt: string;
  updatedAt: string;
  downloadUrl?: string;
}

export interface IConvertDocumentRequest {
  file: File;
}

export interface IGetDocumentsRequest {
  page?: number;
  pageSize?: number;
  search?: string;
}
