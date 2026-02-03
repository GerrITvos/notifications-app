'use client'

import { useState, useMemo } from 'react'
import { NotificationCard } from '@/components/NotificationCard'
import { NotificationStats } from '@/components/NotificationStats'
import { mockNotifications } from '@/lib/mock-data'
import { Notification, SourceSystem, NotificationPriority, NotificationStatus } from '@/types/notification'

export default function Home() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filterSource, setFilterSource] = useState<SourceSystem | 'all'>('all')
  const [filterPriority, setFilterPriority] = useState<NotificationPriority | 'all'>('all')
  const [filterStatus, setFilterStatus] = useState<NotificationStatus | 'all'>('all')

  // Filter notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      if (filterSource !== 'all' && n.source !== filterSource) return false
      if (filterPriority !== 'all' && n.priority !== filterPriority) return false
      if (filterStatus !== 'all' && n.status !== filterStatus) return false
      return true
    }).filter(n => n.status !== 'dismissed')
  }, [notifications, filterSource, filterPriority, filterStatus])

  // Calculate stats
  const stats = useMemo(() => {
    const active = notifications.filter(n => n.status !== 'dismissed')
    return {
      total: active.length,
      unread: active.filter(n => n.status === 'unread').length,
      critical: active.filter(n => n.priority === 'critical').length,
      bySource: {
        'playbook': active.filter(n => n.source === 'playbook').length,
        'onesource': active.filter(n => n.source === 'onesource').length,
        'coupa-cso': active.filter(n => n.source === 'coupa-cso').length,
        'business-partner-portal': active.filter(n => n.source === 'business-partner-portal').length,
      }
    }
  }, [notifications])

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, status: 'read' as NotificationStatus } : n)
    )
  }

  const handleDismiss = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, status: 'dismissed' as NotificationStatus } : n)
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Sourcing Manager Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Your daily notification center</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <NotificationStats stats={stats} />

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
          <div className="flex flex-wrap gap-4">
            <div>
              <label htmlFor="filter-source" className="block text-sm font-medium text-gray-700 mb-1">Source</label>
              <select 
                id="filter-source"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterSource}
                onChange={(e) => setFilterSource(e.target.value as SourceSystem | 'all')}
              >
                <option value="all">All Sources</option>
                <option value="playbook">Playbook</option>
                <option value="onesource">OneSource</option>
                <option value="coupa-cso">Coupa CSO</option>
                <option value="business-partner-portal">Business Partner Portal</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="filter-priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select 
                id="filter-priority"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value as NotificationPriority | 'all')}
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label htmlFor="filter-status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                id="filter-status"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as NotificationStatus | 'all')}
              >
                <option value="all">All</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
              <p className="text-gray-500">No notifications match your filters.</p>
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
                onDismiss={handleDismiss}
              />
            ))
          )}
        </div>
      </main>
    </div>
  )
}
