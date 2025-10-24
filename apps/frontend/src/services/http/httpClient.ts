/**
 * HTTP Client for making API requests
 */
import env from '../../config/env';

export interface HttpOptions extends RequestInit {
  params?: Record<string, string>;
}

class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Generic request method for all HTTP calls
   */
  async request<T>(endpoint: string, options?: HttpOptions): Promise<T> {
    // Build URL with query params if provided
    let url = `${this.baseUrl}${endpoint}`;
    
    if (options?.params) {
      const queryParams = new URLSearchParams();
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value);
        }
      });
      const queryString = queryParams.toString();
      if (queryString) {
        url = `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
      }
    }
    
    // Configure request
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new HttpError(
          `API request failed with status: ${response.status}`,
          response.status,
          errorData
        );
      }
      
      // Check if there's content to parse
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return {} as T; // Empty response
      }
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      console.error(`API request failed for ${endpoint}:`, error);
      throw new HttpError(
        error instanceof Error ? error.message : 'Unknown API error',
        500
      );
    }
  }

  /**
   * Convenience method for GET requests
   */
  async get<T>(endpoint: string, options?: HttpOptions): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
      ...options,
    });
  }

  /**
   * Convenience method for POST requests
   */
  async post<T>(endpoint: string, data?: any, options?: HttpOptions): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  /**
   * Convenience method for PUT requests
   */
  async put<T>(endpoint: string, data?: any, options?: HttpOptions): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  /**
   * Convenience method for DELETE requests
   */
  async delete<T>(endpoint: string, options?: HttpOptions): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      ...options,
    });
  }
}

/**
 * Custom HTTP Error class
 */
export class HttpError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data: any = null) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.data = data;
  }
}

// Create and export default HTTP client instance
export default new HttpClient(env.apiBaseUrl);
