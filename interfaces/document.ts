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

export interface ICompressionStats {
  original_size_bytes: number;
  compressed_size_bytes: number;
  space_saved_bytes: number;
  space_saved_percent: number;
  compression_ratio: number;
  file_type: string;
  quality: string;
  improved: boolean;
}