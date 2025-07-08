import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Camera, Thermometer, Car, Wifi, WifiOff, Settings } from 'lucide-react'

export default function Devices() {
  const devices = [
    {
      id: "CAM-001",
      name: "Security Camera - Main St",
      type: "camera",
      status: "online",
      location: "Main Street & 1st Ave",
      lastSeen: "2 minutes ago",
      battery: 85
    },
    {
      id: "ENV-045",
      name: "Air Quality Sensor",
      type: "environmental",
      status: "online",
      location: "Central Park",
      lastSeen: "1 minute ago",
      battery: 92
    },
    {
      id: "TRF-123",
      name: "Traffic Flow Monitor",
      type: "traffic",
      status: "warning",
      location: "Highway 101 - Exit 15",
      lastSeen: "5 minutes ago",
      battery: 23
    },
    {
      id: "CAM-087",
      name: "Security Camera - Park Ave",
      type: "camera",
      status: "offline",
      location: "Park Avenue & 3rd St",
      lastSeen: "2 hours ago",
      battery: 0
    }
  ]

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'camera': return Camera
      case 'environmental': return Thermometer
      case 'traffic': return Car
      default: return Wifi
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'warning': return 'bg-yellow-500'
      case 'offline': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'online': return <Badge className="bg-green-100 text-green-800">Online</Badge>
      case 'warning': return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
      case 'offline': return <Badge className="bg-red-100 text-red-800">Offline</Badge>
      default: return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Devices</h1>
          <p className="text-muted-foreground">
            Manage and monitor all edge computing devices
          </p>
        </div>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          Device Settings
        </Button>
      </div>

      {/* Device Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {devices.map((device) => {
          const DeviceIcon = getDeviceIcon(device.type)
          return (
            <Card key={device.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DeviceIcon className="h-5 w-5" />
                    <CardTitle className="text-lg">{device.id}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(device.status)}`}></div>
                    {device.status === 'online' ? <Wifi className="h-4 w-4 text-green-600" /> : <WifiOff className="h-4 w-4 text-red-600" />}
                  </div>
                </div>
                <CardDescription>{device.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status</span>
                  {getStatusBadge(device.status)}
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground">Location</span>
                  <p className="text-sm font-medium">{device.location}</p>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground">Last Seen</span>
                  <p className="text-sm font-medium">{device.lastSeen}</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">Battery</span>
                    <span className="text-sm font-medium">{device.battery}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${device.battery > 50 ? 'bg-green-500' : device.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${device.battery}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Configure
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Diagnostics
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">1,198</div>
            <p className="text-sm text-muted-foreground">Online Devices</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">26</div>
            <p className="text-sm text-muted-foreground">Warning Status</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">23</div>
            <p className="text-sm text-muted-foreground">Offline Devices</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">87%</div>
            <p className="text-sm text-muted-foreground">Avg Battery Level</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

