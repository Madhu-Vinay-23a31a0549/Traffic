import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bell, AlertTriangle, Clock, CheckCircle, X } from 'lucide-react'

// Mock notification data
const mockNotifications = [
  {
    id: 1,
    title: 'High Traffic Detected',
    message: 'Unusual traffic congestion on Highway 101',
    severity: 'high',
    timestamp: new Date(Date.now() - 15 * 60000), // 15 minutes ago
    read: false,
    category: 'Traffic'
  },
  {
    id: 2,
    title: 'Sensor Offline',
    message: 'Environmental sensor #247 has gone offline',
    severity: 'medium',
    timestamp: new Date(Date.now() - 45 * 60000), // 45 minutes ago
    read: false,
    category: 'Device'
  },
  {
    id: 3,
    title: 'Maintenance Complete',
    message: 'Camera #156 maintenance has been completed',
    severity: 'low',
    timestamp: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
    read: true,
    category: 'Maintenance'
  },
  {
    id: 4,
    title: 'Air Quality Alert',
    message: 'PM2.5 levels elevated in downtown area',
    severity: 'high',
    timestamp: new Date(Date.now() - 3 * 60 * 60000), // 3 hours ago
    read: true,
    category: 'Environment'
  }
]

const severityIcons = {
  critical: AlertTriangle,
  high: AlertTriangle,
  medium: Clock,
  low: CheckCircle
}

const severityColors = {
  critical: 'text-red-600',
  high: 'text-orange-600',
  medium: 'text-yellow-600',
  low: 'text-blue-600'
}

export default function NotificationCenter({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState(mockNotifications)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getTimeSince = (timestamp) => {
    const now = new Date()
    const diffMs = now - timestamp
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffDays > 0) return `${diffDays}d ago`
    if (diffHours > 0) return `${diffHours}h ago`
    if (diffMins > 0) return `${diffMins}m ago`
    return 'Just now'
  }

  if (!isOpen) {
    return (
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onClose && onClose()}
          className="relative"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    )
  }

  return (
    <Card className="absolute top-12 right-0 w-96 max-h-96 overflow-hidden shadow-lg z-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Notifications</CardTitle>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                Mark all read
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => {
              const Icon = severityIcons[notification.severity]
              const colorClass = severityColors[notification.severity]
              
              return (
                <div
                  key={notification.id}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`h-4 w-4 mt-1 ${colorClass}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${
                          !notification.read ? 'text-gray-900' : 'text-gray-600'
                        }`}>
                          {notification.title}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeNotification(notification.id)
                          }}
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className="text-xs">
                          {notification.category}
                        </Badge>
                        <span className="text-xs text-gray-400">
                          {getTimeSince(notification.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}

