/**
 * Convex Backend Constants and Configuration
 * Version: 2.0.0
 * Last Updated: January 29, 2026
 */

// Application Version
export const APP_VERSION = "2.0.0";
export const STORE_NAME = "DUBAI BORKA HOUSE";

// Database Constants
export const COLLECTIONS = {
  BRANCHES: "branches",
  EMPLOYEES: "employees",
  DISCOUNTS: "discounts",
  WHATSAPP_ORDERS: "whatsappOrders",
  ONLINE_PRODUCTS: "onlineProducts",
  ONLINE_ORDERS: "onlineOrders",
  CATEGORIES: "categories",
  PRODUCTS: "products",
  SALES: "sales",
  CUSTOMERS: "customers",
  STOCK_MOVEMENTS: "stockMovements",
  TRANSACTIONS: "transactions",
  BRANCH_TRANSFERS: "branchTransfers",
  STORE_SETTINGS: "storeSettings",
  CUSTOMER_REVIEWS: "customerReviews",
  WISHLIST: "wishlist",
  COUPONS: "coupons",
  ORDER_NOTIFICATIONS: "orderNotifications",
  RETURNS: "returns",
  ORDER_ANALYTICS: "orderAnalytics",
  USER_ROLES: "userRoles",
  USER_RULES: "userRules",
  RULE_APPLICATION_LOG: "ruleApplicationLog",
  PERMISSION_TEMPLATES: "permissionTemplates",
  LOYALTY_PROGRAMS: "loyaltyPrograms",
  CUSTOMER_LOYALTY: "customerLoyalty",
  POINTS_TRANSACTIONS: "pointsTransactions",
  ADVANCED_COUPONS: "advancedCoupons",
  COUPON_REDEMPTIONS: "couponRedemptions",
  REFERRAL_PROGRAM: "referralProgram",
  SETTINGS: "settings",
  SUPPLIERS: "suppliers",
} as const;

// Time Constants
export const TIME = {
  ONE_HOUR: 60 * 60 * 1000,
  ONE_DAY: 24 * 60 * 60 * 1000,
  ONE_WEEK: 7 * 24 * 60 * 60 * 1000,
  ONE_MONTH: 30 * 24 * 60 * 60 * 1000,
  ONE_YEAR: 365 * 24 * 60 * 60 * 1000,
} as const;

// Payment Methods
export const PAYMENT_METHODS = {
  CASH: "cash",
  BKASH: "bkash",
  NAGAD: "nagad",
  ROCKET: "rocket",
  BANK_TRANSFER: "bank_transfer",
  CARD: "card",
} as const;

// Order Status
export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  RETURNED: "returned",
} as const;

// Stock Status
export const STOCK_STATUS = {
  CRITICAL: "critical", // 0 items
  LOW: "low", // <= minStockLevel
  NORMAL: "normal", // > minStockLevel and < maxStockLevel
  HIGH: "high", // >= maxStockLevel
} as const;

// Discount Types
export const DISCOUNT_TYPES = {
  PERCENTAGE: "percentage",
  FIXED: "fixed",
  BOGO: "bogo", // Buy One Get One
  TIERED: "tiered",
} as const;

// Roles
export const USER_ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  CASHIER: "cashier",
  STAFF: "staff",
  VIEWER: "viewer",
} as const;

// API Response Status
export const RESPONSE_STATUS = {
  SUCCESS: "success",
  ERROR: "error",
  VALIDATION_ERROR: "validation_error",
  NOT_FOUND: "not_found",
  UNAUTHORIZED: "unauthorized",
  FORBIDDEN: "forbidden",
  CONFLICT: "conflict",
  SERVER_ERROR: "server_error",
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 50,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1,
} as const;

// Cache Duration (in milliseconds)
export const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 15 * 60 * 1000, // 15 minutes
  LONG: 60 * 60 * 1000, // 1 hour
  VERY_LONG: 24 * 60 * 60 * 1000, // 1 day
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: "User is not authenticated",
  FORBIDDEN: "User does not have permission",
  NOT_FOUND: "Resource not found",
  VALIDATION_ERROR: "Invalid input data",
  SERVER_ERROR: "An unexpected error occurred",
  DATABASE_ERROR: "Database operation failed",
  DUPLICATE_ENTRY: "Resource already exists",
  INVALID_OPERATION: "Operation is not allowed",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  CREATED: "Resource created successfully",
  UPDATED: "Resource updated successfully",
  DELETED: "Resource deleted successfully",
  OPERATION_COMPLETED: "Operation completed successfully",
} as const;
