import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertTriangle, CheckCircle, Clock, MapPin, X } from 'lucide-react'

const severityConfig = {
  critical: {
    color: 'bg-red-500',
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    icon: AlertTriangle
  },
  high: {
    color: 'bg-orange-500',
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    icon: AlertTriangle
  },
  medium: {
    color: 'bg-yellow-500',
    textColor: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    icon: Clock
  },
  low: {
    color: 'bg-blue-500',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    icon: Clock
  }
}

export default function AlertCard({ alert, onResolve, onDismiss }) {
  const config = severityConfig[alert.severity] || severityConfig.medium
  const Icon = config.icon

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  const getTimeSince = (timestamp) => {
    const now = new Date()
    const alertTime = new Date(timestamp)
    const diffMs = now - alertTime
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffDays > 0) return `${diffDays}d ago`
    if (diffHours > 0) return `${diffHours}h ago`
    if (diffMins > 0) return `${diffMins}m ago`
    return 'Just now'
  }

  return (
    <Card className={`${config.bgColor} ${config.borderColor} border-l-4`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${config.color} text-white`}>
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className={`text-lg ${config.textColor}`}>
                {alert.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={config.textColor}>
                  {alert.severity.toUpperCase()}
                </Badge>
                <Badge variant="secondary">
                  {alert.category}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {getTimeSince(alert.timestamp)}
            </span>
            {onDismiss && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDismiss(alert.id)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-gray-700 mb-3">
          {alert.description}
        </p>
        
        {alert.location && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <MapPin className="h-4 w-4" />
            <span>{alert.location}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            <div>Detected: {formatTime(alert.timestamp)}</div>
            {alert.deviceId && (
              <div>Device: {alert.deviceId}</div>
            )}
          </div>
          
          {alert.status === 'active' && onResolve && (
            <Button
              size="sm"
              onClick={() => onResolve(alert.id)}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Resolve
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

