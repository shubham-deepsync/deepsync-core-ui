export interface Job {
  id: number
  fileName: string
  matchType: 'PII' | 'Digital' | 'Transaction'
  processedDate: string
  matchRate: string | number
  status: 'completed' | 'processing' | 'failed'
  exported: boolean
  fileSize?: string
  recordCount?: number
}

export type KpiIconVariant = 'checkmark' | 'barChart' | 'target'

export interface KpiCardData {
  value: string
  label: string
  trendText: string
  trendPercent: string
  trendDirection: 'up' | 'down'
  iconVariant: KpiIconVariant
  trendColor?: 'green' | 'purple'
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

export interface KpiDataWithTrends {
  cards: KpiCardData[]
}
