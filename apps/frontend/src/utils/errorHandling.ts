/**
 * Error handling utilities
 */
import { HttpError } from '../services/http/httpClient';

/**
 * Format error messages for display
 */
export function formatErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  
  if (error instanceof HttpError) {
    if (error.status === 404) {
      return 'El recurso solicitado no se ha encontrado.';
    }
    
    if (error.status === 401) {
      return 'No tienes autorización para acceder a este recurso.';
    }
    
    if (error.status === 403) {
      return 'No tienes permiso para realizar esta acción.';
    }
    
    if (error.status === 500) {
      return 'Ha ocurrido un error en el servidor. Por favor intenta más tarde.';
    }
    
    // Try to get error message from the data if possible
    if (error.data?.message) {
      return error.data.message;
    }
    
    return `Error ${error.status}: ${error.message}`;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'Ha ocurrido un error inesperado.';
}

/**
 * Log errors to console or monitoring service
 */
export function logError(error: unknown, context?: string): void {
  const prefix = context ? `[${context}]` : '';
  
  if (error instanceof HttpError) {
    console.error(
      `${prefix} API Error (${error.status}):`, 
      error.message,
      '\nDetails:', 
      error.data
    );
    return;
  }
  
  console.error(`${prefix} Error:`, error);
}

/**
 * Determine if an error is a network-related issue
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    // Check for common network error messages
    const message = error.message.toLowerCase();
    return (
      message.includes('network') ||
      message.includes('connection') ||
      message.includes('offline') ||
      message.includes('failed to fetch')
    );
  }
  return false;
}

/**
 * Create a standardized error object
 */
export function createError(message: string, code?: string, data?: any): Error {
  const error = new Error(message);
  (error as any).code = code;
  (error as any).data = data;
  return error;
}
