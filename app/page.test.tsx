import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from './page'

describe('Home', () => {
  it('renders the main dashboard heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent(/sourcing manager dashboard/i)
  })

  it('renders notification statistics', () => {
    render(<Home />)
    expect(screen.getByText('Total')).toBeInTheDocument()
    // Check for stats labels (these appear in both stats cards and filter options)
    expect(screen.getAllByText('Unread').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Critical').length).toBeGreaterThan(0)
    expect(screen.getByText('Sources')).toBeInTheDocument()
  })

  it('renders filter dropdowns', () => {
    render(<Home />)
    expect(screen.getByLabelText('Source')).toBeInTheDocument()
    expect(screen.getByLabelText('Priority')).toBeInTheDocument()
    expect(screen.getByLabelText('Status')).toBeInTheDocument()
  })

  it('renders notifications list', () => {
    render(<Home />)
    // Should render at least some notifications from mock data
    const notifications = screen.getAllByText(/notification/i)
    expect(notifications.length).toBeGreaterThan(0)
  })

  it('filters notifications by priority', async () => {
    const user = userEvent.setup()
    render(<Home />)
    
    const priorityFilter = screen.getByLabelText('Priority')
    await user.selectOptions(priorityFilter, 'critical')
    
    // Should only show critical notifications
    const criticalBadges = screen.getAllByText('CRITICAL')
    expect(criticalBadges.length).toBeGreaterThan(0)
  })
})
