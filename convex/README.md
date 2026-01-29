# Dubai Borka House - Convex Backend Documentation

## Version 2.0.0
**Last Updated:** January 29, 2026

## Overview

This Convex backend powers the Dubai Borka House e-commerce management system. It handles all business logic, database operations, authentication, and API routes.

## Architecture

### Collections (32 Total)
1. **inventory**: `branches`, `products`, `categories`, `suppliers`, `stock_movements`
2. **sales**: `sales`, `orders`, `returns`, `discounts`
3. **customers**: `customers`, `wishlist`, `reviews`, `loyalty_programs`, `customer_loyalty`
4. **employees**: `employees`, `user_roles`, `user_rules`
5. **online**: `online_products`, `online_orders`, `whatsapp_orders`
6. **analytics**: `order_analytics`, `transactions`, `notifications`
7. **settings**: `store_settings`, `coupons`, `advanced_coupons`

### Core Modules

#### Authentication (`auth.ts`)
- User authentication using Convex Auth
- Role-based access control (RBAC)
- Token management

#### Products (`products.ts`)
- Product listing and search
- Stock management per branch
- Category filtering
- Barcode management

#### Sales (`sales.ts`)
- Order creation and processing
- Payment processing
- Invoice generation
- Sales tracking and analytics

#### Customers (`customers.ts`)
- Customer profile management
- Purchase history
- Loyalty points tracking
- Customer reviews and ratings

#### Backup & Restore (`backup.ts`)
- Full database backup (all 32 collections)
- Data restoration from backup files
- Version control (v2.0.0 format)
- Automatic timestamping

#### Analytics (`analytics.ts`)
- Sales metrics tracking
- Channel-wise analytics
- Top products reporting
- Revenue analytics

#### Settings (`settings.ts`)
- Store configuration
- General settings
- Store information management

#### Discounts (`discounts.ts`)
- Discount creation and management
- Multiple discount types (percentage, fixed, BOGO, tiered)
- Discount application logic

#### Loyalty (`loyalty.ts`)
- Customer loyalty program
- Points earning and redemption
- Referral program tracking
- Tier management

## API Endpoints

### Health Check
```
GET /health
Response: { status: "healthy", version: "2.0.0", ... }
```

### Key Routes
All routes are defined through Convex query and mutation functions. Access via:
```typescript
useQuery(api.module.function)
useMutation(api.module.function)
```

## Query Functions

### Products
- `api.products.list(filters?)` - List all products with optional filters
- `api.products.get(productId)` - Get specific product details
- `api.products.search(term)` - Search products by term

### Sales
- `api.sales.list()` - List all sales
- `api.sales.get(saleId)` - Get specific sale
- `api.sales.getByDate(startDate, endDate)` - Get sales by date range

### Customers
- `api.customers.list()` - List all customers
- `api.customers.get(customerId)` - Get customer details
- `api.customers.search(query)` - Search customers

### Analytics
- `api.analytics.getDashboardStats()` - Get dashboard statistics
- `api.analytics.getSalesMetrics(period)` - Get sales metrics by period
- `api.analytics.getChannelAnalytics(channel)` - Get channel-wise analytics

### Backup
- `api.backup.exportAllData()` - Export all database data
- `api.backup.importAllData(data)` - Import backup data
- `api.backup.getBackupStats()` - Get backup statistics

## Mutation Functions

### Products
- `api.products.create(data)` - Create new product
- `api.products.update(productId, data)` - Update product
- `api.products.delete(productId)` - Delete product
- `api.products.updateStock(productId, quantity)` - Update stock

### Sales
- `api.sales.create(data)` - Create new sale
- `api.sales.update(saleId, data)` - Update sale
- `api.sales.cancel(saleId)` - Cancel sale

### Customers
- `api.customers.create(data)` - Create customer
- `api.customers.update(customerId, data)` - Update customer
- `api.customers.addAddress(customerId, address)` - Add customer address

## Constants & Utilities

### Constants (`constants.ts`)
- `COLLECTIONS` - All database collection names
- `PAYMENT_METHODS` - Available payment methods
- `ORDER_STATUS` - Order status values
- `STOCK_STATUS` - Stock status levels
- `USER_ROLES` - User role types

### Utilities (`utils.ts`)
- `successResponse()` - Format success response
- `errorResponse()` - Format error response
- `getDateRange()` - Get date ranges for analytics
- `calculateStatistics()` - Calculate statistical metrics
- `batchProcess()` - Batch array processing
- `withRetry()` - Retry logic with exponential backoff

## Error Handling

All functions implement comprehensive error handling:
- Type validation
- Safe data access with fallbacks
- Try-catch blocks
- Detailed error messages
- User-friendly error responses

## Performance Optimizations

1. **Indexing**: Database queries use indexes for fast lookups
2. **Pagination**: Large datasets are paginated (default: 50 items/page)
3. **Caching**: Frequently accessed data is cached
4. **Batch Processing**: Large operations use batch processing
5. **Lazy Loading**: Related data is loaded on demand

## Security

- **Authentication**: All queries/mutations require authentication
- **Authorization**: Role-based access control (RBAC)
- **Data Validation**: All inputs are validated
- **Error Handling**: No sensitive data in error messages
- **Backup Security**: Backups are encrypted and timestamped

## Database Schema

### Products Table
```
{
  name: string,
  brand: string,
  categoryId: Id<"categories">,
  fabric: string,
  color: string,
  sizes: string[],
  costPrice: number,
  sellingPrice: number,
  currentStock: number,
  minStockLevel: number,
  maxStockLevel: number,
  branchStock: Array<{ branchId, branchName, currentStock, ... }>,
  barcode: string,
  productCode: string,
  ...
}
```

### Sales Table
```
{
  saleNumber: string,
  customerId: Id<"customers">,
  items: Array<{ productId, productName, quantity, unitPrice, totalPrice }>,
  subtotal: number,
  tax: number,
  discount: number,
  total: number,
  paymentMethod: string,
  paymentStatus: string,
  notes: string,
  ...
}
```

### Customers Table
```
{
  name: string,
  email: string,
  phone: string,
  loyaltyPoints: number,
  totalPurchases: number,
  totalSpent: number,
  registrationDate: number,
  lastPurchaseDate: number,
  addresses: Array<{ type, street, city, postalCode, ... }>,
  ...
}
```

## Deployment

### Environment Variables
```
CONVEX_DEPLOYMENT=<deployment-id>
CONVEX_AUTH_ADMIN_KEY=<admin-key>
```

### Development
```bash
npm run dev  # Start development environment
```

### Production
```bash
npm run build   # Build for production
npm run deploy  # Deploy to Convex
```

## Monitoring & Logs

- All mutations log their operations
- Analytics track all sales and user activities
- Error logs include timestamps and stack traces
- Performance metrics are collected for optimization

## Best Practices

1. **Always check authentication** - Use `getAuthUserId(ctx)` at start
2. **Validate inputs** - Use Convex validators (`v.*`)
3. **Use type-safe IDs** - Use `v.id("collection")` for references
4. **Handle errors gracefully** - Try-catch with meaningful messages
5. **Batch large operations** - Don't process 1000s of items sequentially
6. **Cache frequently accessed data** - Use memoization where appropriate
7. **Index database queries** - Use `withIndex()` for filtered queries
8. **Paginate results** - Don't return all records at once

## Migration Guide

### From v1.0 to v2.0
- Added 20+ new collections for advanced features
- Implemented comprehensive backup/restore system
- Added analytics and reporting features
- Improved error handling and validation
- Added health check endpoint
- Implemented constants and utilities modules

## Support & Issues

For issues or questions:
1. Check the logs in Convex Dashboard
2. Review error messages for details
3. Consult the constants and utilities modules
4. Check existing query/mutation patterns

## Version History

- **v2.0.0** (Jan 29, 2026) - Backend optimization, added constants, utilities, health check
- **v1.0.0** - Initial release

---

**Maintained by:** Dubai Borka House Development Team
**Last Review:** January 29, 2026
