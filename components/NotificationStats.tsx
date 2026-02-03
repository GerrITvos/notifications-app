'use client'

import { NotificationStats as Stats } from '@/types/notification'

interface NotificationStatsProps {
  stats: Stats
}

export function NotificationStats({ stats }: NotificationStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="text-sm font-medium text-gray-600">Total</div>
        <div className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</div>
      </div>
      
      <div className="bg-blue-50 rounded-lg shadow-sm p-4 border border-blue-200">
        <div className="text-sm font-medium text-blue-600">Unread</div>
        <div className="text-2xl font-bold text-blue-900 mt-1">{stats.unread}</div>
      </div>
      
      <div className="bg-red-50 rounded-lg shadow-sm p-4 border border-red-200">
        <div className="text-sm font-medium text-red-600">Critical</div>
        <div className="text-2xl font-bold text-red-900 mt-1">{stats.critical}</div>
      </div>
      
      <div className="bg-green-50 rounded-lg shadow-sm p-4 border border-green-200">
        <div className="text-sm font-medium text-green-600">Sources</div>
        <div className="text-2xl font-bold text-green-900 mt-1">
          {Object.keys(stats.bySource).filter(k => stats.bySource[k as keyof typeof stats.bySource] > 0).length}
        </div>
      </div>
    </div>
  )
}
