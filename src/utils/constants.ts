import { Job, Connection } from '../types'

// Static data - will be replaced with API calls later
export const mockJobs: Job[] = [
  {
    id: 1,
    fileName: 'customers_q4_2024.csv',
    matchType: 'PII',
    processedDate: '2024-12-28 14:35:22',
    matchRate: '91.4%',
    status: 'completed',
    exported: true,
  },
  {
    id: 2,
    fileName: 'holiday_campaign_2024.parquet',
    matchType: 'Digital',
    processedDate: '2024-12-25 09:12:45',
    matchRate: '88.7%',
    status: 'completed',
    exported: false,
  },
  {
    id: 3,
    fileName: 'new_customers_dec.csv',
    matchType: 'Transaction',
    processedDate: '2024-12-24 16:48:11',
    matchRate: '-',
    status: 'processing',
    exported: false,
  },
  {
    id: 4,
    fileName: 'black_friday_customers.csv',
    matchType: 'PII',
    processedDate: '2024-11-29 11:22:33',
    matchRate: '92.1%',
    status: 'completed',
    exported: true,
  },
  {
    id: 5,
    fileName: 'email_validation.csv',
    matchType: 'PII',
    processedDate: '2024-11-15 08:45:19',
    matchRate: '-',
    status: 'failed',
    exported: false,
  },
  {
    id: 6,
    fileName: 'summer_2024_results.parquet',
    matchType: 'Digital',
    processedDate: '2024-09-01 13:20:05',
    matchRate: '89.3%',
    status: 'completed',
    exported: true,
  },
]

export const mockKpiData = {
  totalJobsCompleted: 4,
  totalRecordsProcessed: 1250000,
  averageMatchRate: 90.4,
}

export const mockConnections: Connection[] = [
  {
    id: '1',
    name: 'Production Snowflake',
    type: 'snowflake',
    status: 'active',
    createdDate: 'Dec 15, 2024',
    details: {
      host: 'account.snowflakecomputing.com',
      database: 'CUSTOMER_DB',
    },
  },
  {
    id: '2',
    name: 'AWS S3 Archive',
    type: 's3',
    status: 'inactive',
    createdDate: 'Dec 10, 2024',
    details: {
      bucket: 'customer-data-archive',
      path: '/2024/q4/',
    },
  },
  {
    id: '3',
    name: 'Analytics Databricks',
    type: 'databricks',
    status: 'error',
    createdDate: 'Nov 28, 2024',
    details: {
      host: 'dbc-xxxxx.cloud.databricks.com',
      database: 'analytics',
    },
  },
]
