export interface ResponseEntity {
  statusCode: number;
  message: string | string[];
  timestamp: string;
  path: string;
  errors?: Record<string, string>[];
}

export interface ApiResponse<T = unknown> {
  data: T;
  meta?: Record<string, unknown>;
  error?: ResponseEntity | string;
}
