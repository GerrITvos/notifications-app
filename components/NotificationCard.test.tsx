import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NotificationCard } from './NotificationCard'
import { Notification } from '@/types/notification'

const mockNotification: Notification = {
  id: '1',
  source: 'playbook',
  priority: 'high',
  status: 'unread',
  title: 'Test Notification',
  message: 'This is a test message',
  createdAt: new Date('2026-02-03T10:00:00'),
  actionUrl: '/test',
  metadata: {
    category: 'test',
    relatedEntity: 'Test Entity',
  },
}

describe('NotificationCard', () => {
  it('renders notification title and message', () => {
    render(<NotificationCard notification={mockNotification} />)
    
    expect(screen.getByText('Test Notification')).toBeInTheDocument()
    expect(screen.getByText('This is a test message')).toBeInTheDocument()
  })

  it('displays priority badge', () => {
    render(<NotificationCard notification={mockNotification} />)
    
    expect(screen.getByText('HIGH')).toBeInTheDocument()
  })

  it('displays source system label', () => {
    render(<NotificationCard notification={mockNotification} />)
    
    expect(screen.getByText('Playbook')).toBeInTheDocument()
  })

  it('shows unread indicator for unread notifications', () => {
    render(<NotificationCard notification={mockNotification} />)
    
    const unreadIndicator = screen.getByTitle('Unread')
    expect(unreadIndicator).toBeInTheDocument()
  })

  it('does not show unread indicator for read notifications', () => {
    const readNotification = { ...mockNotification, status: 'read' as const }
    render(<NotificationCard notification={readNotification} />)
    
    const unreadIndicator = screen.queryByTitle('Unread')
    expect(unreadIndicator).not.toBeInTheDocument()
  })

  it('displays metadata when available', () => {
    render(<NotificationCard notification={mockNotification} />)
    
    expect(screen.getByText('Test Entity')).toBeInTheDocument()
  })

  it('calls onMarkAsRead when Mark as Read is clicked', async () => {
    const user = userEvent.setup()
    const handleMarkAsRead = jest.fn()
    
    render(
      <NotificationCard 
        notification={mockNotification} 
        onMarkAsRead={handleMarkAsRead}
      />
    )
    
    const markAsReadButton = screen.getByRole('button', { name: /mark as read/i })
    await user.click(markAsReadButton)
    
    expect(handleMarkAsRead).toHaveBeenCalledWith('1')
  })

  it('calls onDismiss when Dismiss is clicked', async () => {
    const user = userEvent.setup()
    const handleDismiss = jest.fn()
    
    render(
      <NotificationCard 
        notification={mockNotification} 
        onDismiss={handleDismiss}
      />
    )
    
    const dismissButton = screen.getByRole('button', { name: /dismiss/i })
    await user.click(dismissButton)
    
    expect(handleDismiss).toHaveBeenCalledWith('1')
  })

  it('applies correct priority styling', () => {
    const criticalNotification = { ...mockNotification, priority: 'critical' as const }
    render(<NotificationCard notification={criticalNotification} />)
    
    expect(screen.getByText('CRITICAL')).toBeInTheDocument()
  })
})
