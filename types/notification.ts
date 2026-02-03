export type SourceSystem = 
  | 'playbook'
  | 'onesource'
  | 'coupa-cso'
  | 'business-partner-portal'

export type NotificationPriority = 'critical' | 'high' | 'medium' | 'low'

export type NotificationStatus = 'unread' | 'read' | 'dismissed'

export interface Notification {
  id: string
  source: SourceSystem
  priority: NotificationPriority
  status: NotificationStatus
  title: string
  message: string
  createdAt: Date
  actionUrl?: string
  metadata?: {
    category?: string
    relatedEntity?: string
    deadline?: Date
  }
}

export interface NotificationStats {
  total: number
  unread: number
  critical: number
  bySource: Record<SourceSystem, number>
}
