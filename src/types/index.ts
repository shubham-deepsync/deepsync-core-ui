export interface Job {
  id: number
  fileName: string
  matchType: 'PII' | 'Digital' | 'Transaction'
  processedDate: string
  matchRate: string | number
  status: 'completed' | 'processing' | 'failed'
  exported: boolean
}

export interface Connection {
  id: string
  name: string
  type: 's3' | 'snowflake' | 'databricks' | 'sftp'
  status: 'active' | 'inactive' | 'error'
  createdDate: string
  details: {
    host?: string
    bucket?: string
    path?: string
    database?: string
  }
}

export interface KpiData {
  totalJobsCompleted: number
  totalRecordsProcessed: number
  averageMatchRate: number
}
