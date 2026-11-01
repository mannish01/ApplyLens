const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  signal?: AbortSignal;
  headers?: HeadersInit;
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiRequest<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error('API base URL is not configured.');
  }

  const { method = 'GET', body, signal, headers } = options;

  const requestHeaders = new Headers(headers);

  requestHeaders.set('Accept', 'application/json');

  const isFormData = body instanceof FormData;

  if (body !== undefined && !isFormData) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    credentials: 'include',
    headers: requestHeaders,
    body: body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
    signal,
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}.`;

    try {
      const errorData: unknown = await response.json();

      if (
        typeof errorData === 'object' &&
        errorData !== null &&
        'message' in errorData &&
        typeof errorData.message === 'string'
      ) {
        message = errorData.message;
      }
    } catch {
      // Keep the default HTTP error message.
    }

    throw new ApiError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
