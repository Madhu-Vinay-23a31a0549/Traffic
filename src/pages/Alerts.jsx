import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertTriangle, Search, Filter, Bell, CheckCircle, Clock, MapPin } from 'lucide-react'
import AlertCard from '@/components/Alerts/AlertCard'

// Mock alert data
const mockAlerts = [
  {
    id: 1,
    title: 'Critical Traffic Jam',
    description: 'Severe congestion detected on Highway 101 northbound. Traffic speed reduced to 15 mph. Estimated delay: 45 minutes.',
    severity: 'critical',
    category: 'Traffic',
    status: 'active',
    location: 'Highway 101, Mile Marker 23',
    deviceId: 'TRAFFIC_SENSOR_101_23',
    timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
    estimatedResolution: '2 hours'
  },
  {
    id: 2,
    title: 'Environmental Sensor Offline',
    description: 'Air quality monitoring station has lost connection. Unable to collect PM2.5 and NO2 readings.',
    severity: 'high',
    category: 'Device',
    status: 'active',
    location: 'Downtown Park, Station #7',
    deviceId: 'ENV_SENSOR_007',
    timestamp: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
    estimatedResolution: '4 hours'
  },
  {
    id: 3,
    title: 'High PM2.5 Levels',
    description: 'Particulate matter levels have exceeded safe thresholds in the industrial district. Air quality index: 156 (Unhealthy).',
    severity: 'high',
    category: 'Environment',
    status: 'active',
    location: 'Industrial District, Zone B',
    deviceId: 'ENV_SENSOR_012',
    timestamp: new Date(Date.now() - 4 * 60 * 60000), // 4 hours ago
    estimatedResolution: '6 hours'
  },
  {
    id: 4,
    title: 'Camera Maintenance Required',
    description: 'Security camera showing degraded image quality. Lens cleaning and calibration needed.',
    severity: 'medium',
    category: 'Maintenance',
    status: 'active',
    location: 'Main Street & 5th Avenue',
    deviceId: 'CAMERA_MS_05',
    timestamp: new Date(Date.now() - 6 * 60 * 60000), // 6 hours ago
    estimatedResolution: '24 hours'
  },
  {
    id: 5,
    title: 'Power Efficiency Alert',
    description: 'Edge computing node showing increased power consumption. Performance optimization recommended.',
    severity: 'medium',
    category: 'System',
    status: 'active',
    location: 'Data Center Alpha',
    deviceId: 'EDGE_NODE_ALPHA_03',
    timestamp: new Date(Date.now() - 8 * 60 * 60000), // 8 hours ago
    estimatedResolution: '12 hours'
  },
  {
    id: 6,
    title: 'Routine Maintenance Complete',
    description: 'Scheduled maintenance on traffic light controller has been successfully completed.',
    severity: 'low',
    category: 'Maintenance',
    status: 'resolved',
    location: 'Oak Street & 2nd Avenue',
    deviceId: 'TRAFFIC_CTRL_OAK_02',
    timestamp: new Date(Date.now() - 12 * 60 * 60000), // 12 hours ago
    resolvedAt: new Date(Date.now() - 10 * 60 * 60000) // 10 hours ago
  }
]

export default function Alerts() {
  const [alerts, setAlerts] = useState(mockAlerts)
  const [searchTerm, setSearchTerm] = useState('')
  const [severityFilter, setSeverityFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter
    const matchesCategory = categoryFilter === 'all' || alert.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter

    return matchesSearch && matchesSeverity && matchesCategory && matchesStatus
  })

  const handleResolveAlert = (alertId) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: 'resolved', resolvedAt: new Date() }
          : alert
      )
    )
  }

  const handleDismissAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId))
  }

  const activeAlerts = alerts.filter(alert => alert.status === 'active')
  const criticalAlerts = activeAlerts.filter(alert => alert.severity === 'critical')
  const highAlerts = activeAlerts.filter(alert => alert.severity === 'high')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Alerts & Notifications</h1>
        <p className="text-muted-foreground">
          Monitor and manage system alerts, incidents, and notifications
        </p>
      </div>

      {/* Alert Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAlerts.length}</div>
            <p className="text-xs text-muted-foreground">
              Requiring attention
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalAlerts.length}</div>
            <p className="text-xs text-muted-foreground">
              Immediate action needed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{highAlerts.length}</div>
            <p className="text-xs text-muted-foreground">
              High priority issues
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">
              Average response time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Traffic">Traffic</SelectItem>
                <SelectItem value="Environment">Environment</SelectItem>
                <SelectItem value="Device">Device</SelectItem>
                <SelectItem value="System">System</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('')
                setSeverityFilter('all')
                setCategoryFilter('all')
                setStatusFilter('all')
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alert List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Alert List ({filteredAlerts.length})
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button variant="outline" size="sm">
              Bulk Actions
            </Button>
          </div>
        </div>
        
        {filteredAlerts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No alerts found</h3>
              <p className="text-muted-foreground">
                No alerts match your current filter criteria.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onResolve={handleResolveAlert}
                onDismiss={handleDismissAlert}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

