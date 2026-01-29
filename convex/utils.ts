/**
 * Convex Backend Utilities
 * Common helper functions and error handling
 */

import { RESPONSE_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } from "./constants";

/**
 * API Response Wrapper
 */
export interface ApiResponse<T = any> {
  status: string;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

/**
 * Create a standardized success response
 */
export function successResponse<T>(
  data: T,
  message: string = SUCCESS_MESSAGES.OPERATION_COMPLETED
): ApiResponse<T> {
  return {
    status: RESPONSE_STATUS.SUCCESS,
    data,
    message,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Create a standardized error response
 */
export function errorResponse(
  error: string | Error,
  status: string = RESPONSE_STATUS.SERVER_ERROR
): ApiResponse {
  return {
    status,
    error: error instanceof Error ? error.message : error,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Parse and validate date
 */
export function parseDate(dateString: string | number): Date {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }
  return date;
}

/**
 * Get date range for analytics
 */
export function getDateRange(period: "day" | "week" | "month" | "year") {
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);

  const startDate = new Date();
  switch (period) {
    case "day":
      startDate.setHours(0, 0, 0, 0);
      break;
    case "week":
      startDate.setDate(startDate.getDate() - 7);
      startDate.setHours(0, 0, 0, 0);
      break;
    case "month":
      startDate.setMonth(startDate.getMonth() - 1);
      startDate.setHours(0, 0, 0, 0);
      break;
    case "year":
      startDate.setFullYear(startDate.getFullYear() - 1);
      startDate.setHours(0, 0, 0, 0);
      break;
  }

  return { startDate, endDate };
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, currency: string = "BDT"): string {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Safe number parsing
 */
export function safeParseNumber(value: any, defaultValue: number = 0): number {
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
}

/**
 * Safe string parsing
 */
export function safeParseString(value: any, defaultValue: string = ""): string {
  return typeof value === "string" ? value.trim() : defaultValue;
}

/**
 * Check if array is valid and not empty
 */
export function isValidArray<T>(arr: any): arr is T[] {
  return Array.isArray(arr) && arr.length > 0;
}

/**
 * Pagination helper
 */
export function calculatePagination(page: number, pageSize: number, total: number) {
  const validPage = Math.max(1, page);
  const validPageSize = Math.min(pageSize, 100); // Max 100 items per page
  
  const startIndex = (validPage - 1) * validPageSize;
  const endIndex = Math.min(startIndex + validPageSize, total);
  const totalPages = Math.ceil(total / validPageSize);

  return {
    page: validPage,
    pageSize: validPageSize,
    startIndex,
    endIndex,
    totalPages,
    hasNextPage: validPage < totalPages,
    hasPreviousPage: validPage > 1,
  };
}

/**
 * Generate unique ID
 */
export function generateId(prefix: string = ""): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 9);
  return prefix ? `${prefix}_${timestamp}${random}` : `${timestamp}${random}`;
}

/**
 * Calculate statistics
 */
export function calculateStatistics(values: number[]) {
  if (values.length === 0) {
    return {
      min: 0,
      max: 0,
      average: 0,
      total: 0,
      count: 0,
    };
  }

  const total = values.reduce((sum, val) => sum + val, 0);
  const average = total / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);

  return {
    min,
    max,
    average,
    total,
    count: values.length,
  };
}

/**
 * Batch array processing
 */
export async function batchProcess<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  batchSize: number = 10
): Promise<R[]> {
  const results: R[] = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(processor));
    results.push(...batchResults);
  }

  return results;
}

/**
 * Retry logic for failed operations
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delayMs * (i + 1)));
      }
    }
  }

  throw lastError || new Error("Operation failed after retries");
}

/**
 * Deep merge objects
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T {
  const result = { ...target };

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const sourceValue = source[key];
      const targetValue = result[key];

      if (
        typeof sourceValue === "object" &&
        sourceValue !== null &&
        !Array.isArray(sourceValue) &&
        typeof targetValue === "object" &&
        targetValue !== null &&
        !Array.isArray(targetValue)
      ) {
        result[key] = deepMerge(targetValue, sourceValue);
      } else {
        result[key] = sourceValue as any;
      }
    }
  }

  return result;
}

/**
 * Debounce function for async operations
 */
export function createDebounce<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  delay: number = 500
): (...args: Parameters<T>) => Promise<any> {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastResult: any = null;

  return async (...args: Parameters<T>) => {
    return new Promise((resolve) => {
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(async () => {
        lastResult = await fn(...args);
        resolve(lastResult);
      }, delay);
    });
  };
}
