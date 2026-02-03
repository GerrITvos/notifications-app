'use client'

import { Notification, NotificationPriority, SourceSystem } from '@/types/notification'

interface NotificationsPanelProps {
  notifications: Notification[]
  onMarkAsRead?: (id: string) => void
  onDismiss?: (id: string) => void
}

const sourceLabels: Record<SourceSystem, string> = {
  'playbook': 'Playbook',
  'onesource': 'OneSource',
  'coupa-cso': 'Coupa CSO',
  'business-partner-portal': 'Business Partner Portal',
}

const priorityColors: Record<NotificationPriority, string> = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-blue-500',
  low: 'bg-gray-400',
}

export function NotificationsPanel({ notifications, onMarkAsRead, onDismiss }: NotificationsPanelProps) {
  const unreadNotifications = notifications.filter(n => n.status === 'unread')
  
  const formatDate = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    
    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h2 className="font-semibold text-gray-900">Notifications</h2>
        <p className="text-xs text-gray-500 mt-1">
          {unreadNotifications.length} unread notification{unreadNotifications.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {unreadNotifications.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-gray-500">No new notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {unreadNotifications.map(notification => (
              <div
                key={notification.id}
                className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {/* Priority indicator & Source */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${priorityColors[notification.priority]}`} />
                  <span className="text-xs text-gray-500">{sourceLabels[notification.source]}</span>
                  <span className="text-xs text-gray-400 ml-auto">{formatDate(notification.createdAt)}</span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                  {notification.title}
                </h3>

                {/* Message */}
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                  {notification.message}
                </p>

                {/* Actions */}
                <div className="flex gap-2 text-xs">
                  {onMarkAsRead && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onMarkAsRead(notification.id)
                      }}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Mark read
                    </button>
                  )}
                  {onDismiss && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onDismiss(notification.id)
                      }}
                      className="text-gray-500 hover:text-gray-600 font-medium"
                    >
                      Dismiss
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All Notifications
        </button>
      </div>
    </div>
  )
}
