'use client'

import { useState } from 'react'
import { ChatInterface } from '@/components/ChatInterface'
import { NotificationsPanel } from '@/components/NotificationsPanel'
import { mockNotifications } from '@/lib/mock-data'
import { Notification, NotificationStatus } from '@/types/notification'

export default function Home() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  const unreadCount = notifications.filter(n => n.status === 'unread').length

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
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-gray-900">OneSource</div>
              <div className="text-xs text-gray-500">Sourcing. Simplified.</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex gap-6 text-sm">
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Research & Plan</a>
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Supplier Development</a>
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Negotiation</a>
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Archiving</a>
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Backoffice</a>
          </nav>

          {/* Profile with notification badge */}
          <div className="flex items-center gap-4">
            <button className="text-blue-600 hover:text-blue-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700">
                GV
              </div>
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {unreadCount}
                </div>
              )}
            </div>
            <span className="text-sm text-gray-700">Gerrit Vze</span>
          </div>
        </div>
      </header>

      {/* Main Content Area with 3 columns */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Chat */}
        <div className="w-80 flex-shrink-0">
          <ChatInterface />
        </div>

        {/* Center - Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Sourcing Dashboard</h1>
          
          {/* Placeholder content - you can add your sourcing tools grid here */}
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
            <p className="text-gray-600">Your sourcing tools and workflows will appear here.</p>
            <p className="text-sm text-gray-500 mt-2">This is where the main OneSource interface content goes.</p>
          </div>
        </div>

        {/* Right Sidebar - Notifications */}
        <div className="w-96 flex-shrink-0">
          <NotificationsPanel 
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onDismiss={handleDismiss}
          />
        </div>
      </div>
    </div>
  )
}
