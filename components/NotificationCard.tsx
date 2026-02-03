'use client'

import { Notification, SourceSystem, NotificationPriority } from '@/types/notification'

interface NotificationCardProps {
  notification: Notification
  onMarkAsRead?: (id: string) => void
  onDismiss?: (id: string) => void
}

const sourceLabels: Record<SourceSystem, string> = {
  'playbook': 'Playbook',
  'onesource': 'OneSource',
  'coupa-cso': 'Coupa CSO',
  'business-partner-portal': 'Business Partner Portal',
}

const priorityStyles: Record<NotificationPriority, { bg: string; text: string; border: string }> = {
  critical: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-l-red-500' },
  high: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-l-orange-500' },
  medium: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-l-blue-500' },
  low: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-l-gray-400' },
}

export function NotificationCard({ notification, onMarkAsRead, onDismiss }: NotificationCardProps) {
  const styles = priorityStyles[notification.priority]
  const isUnread = notification.status === 'unread'

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div
      className={`border-l-4 ${styles.border} ${isUnread ? 'bg-white' : 'bg-gray-50'} rounded-lg shadow-sm p-4 mb-3 transition-all hover:shadow-md`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-semibold px-2 py-1 rounded ${styles.bg} ${styles.text}`}>
              {notification.priority.toUpperCase()}
            </span>
            <span className="text-xs text-gray-500">
              {sourceLabels[notification.source]}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">
              {formatDate(notification.createdAt)}
            </span>
            {isUnread && (
              <span className="ml-auto w-2 h-2 bg-blue-600 rounded-full" title="Unread" />
            )}
          </div>

          {/* Content */}
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            {notification.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {notification.message}
          </p>

          {/* Metadata */}
          {notification.metadata && (
            <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
              {notification.metadata.relatedEntity && (
                <span className="flex items-center gap-1">
                  <span className="font-medium">Entity:</span>
                  {notification.metadata.relatedEntity}
                </span>
              )}
              {notification.metadata.deadline && (
                <span className="flex items-center gap-1">
                  <span className="font-medium">Deadline:</span>
                  {notification.metadata.deadline.toLocaleDateString()}
                </span>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            {notification.actionUrl && (
              <button
                className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                onClick={() => {/* Navigate to actionUrl */}}
              >
                View Details →
              </button>
            )}
            {isUnread && onMarkAsRead && (
              <button
                className="text-sm font-medium text-gray-600 hover:text-gray-700 hover:underline"
                onClick={() => onMarkAsRead(notification.id)}
              >
                Mark as Read
              </button>
            )}
            {onDismiss && notification.status !== 'dismissed' && (
              <button
                className="text-sm font-medium text-gray-500 hover:text-gray-600 hover:underline"
                onClick={() => onDismiss(notification.id)}
              >
                Dismiss
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
