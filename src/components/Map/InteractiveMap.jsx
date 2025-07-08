import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Camera, Thermometer, Car, Wifi, WifiOff, X, MapPin } from 'lucide-react'

// Mock device data with coordinates
const mockDevices = [
  {
    id: "CAM-001",
    name: "Security Camera - Main St",
    type: "camera",
    status: "online",
    location: "Main Street & 1st Ave",
    x: 25,
    y: 30,
    battery: 85,
    lastSeen: "2 minutes ago"
  },
  {
    id: "ENV-045",
    name: "Air Quality Sensor",
    type: "environmental",
    status: "online",
    location: "Central Park",
    x: 60,
    y: 45,
    battery: 92,
    lastSeen: "1 minute ago"
  },
  {
    id: "TRF-123",
    name: "Traffic Flow Monitor",
    type: "traffic",
    status: "warning",
    location: "Highway 101 - Exit 15",
    x: 80,
    y: 20,
    battery: 23,
    lastSeen: "5 minutes ago"
  },
  {
    id: "CAM-087",
    name: "Security Camera - Park Ave",
    type: "camera",
    status: "offline",
    location: "Park Avenue & 3rd St",
    x: 40,
    y: 70,
    battery: 0,
    lastSeen: "2 hours ago"
  },
  {
    id: "ENV-032",
    name: "Weather Station",
    type: "environmental",
    status: "online",
    location: "City Hall",
    x: 50,
    y: 55,
    battery: 78,
    lastSeen: "30 seconds ago"
  },
  {
    id: "TRF-089",
    name: "Traffic Light Controller",
    type: "traffic",
    status: "online",
    location: "Broadway & 5th St",
    x: 35,
    y: 40,
    battery: 95,
    lastSeen: "1 minute ago"
  },
  {
    id: "CAM-156",
    name: "Security Camera - Downtown",
    type: "camera",
    status: "warning",
    location: "Downtown Plaza",
    x: 70,
    y: 60,
    battery: 15,
    lastSeen: "10 minutes ago"
  },
  {
    id: "ENV-078",
    name: "Noise Level Monitor",
    type: "environmental",
    status: "online",
    location: "Residential District",
    x: 20,
    y: 80,
    battery: 67,
    lastSeen: "3 minutes ago"
  }
]

export default function InteractiveMap() {
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [hoveredDevice, setHoveredDevice] = useState(null)

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
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0">
        {/* Grid pattern to simulate map */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Simulated city features */}
        <div className="absolute inset-0">
          {/* Main roads */}
          <div className="absolute top-1/3 left-0 right-0 h-2 bg-gray-300 opacity-60"></div>
          <div className="absolute top-2/3 left-0 right-0 h-2 bg-gray-300 opacity-60"></div>
          <div className="absolute left-1/3 top-0 bottom-0 w-2 bg-gray-300 opacity-60"></div>
          <div className="absolute left-2/3 top-0 bottom-0 w-2 bg-gray-300 opacity-60"></div>
          
          {/* Park area */}
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-200 rounded-full opacity-40 transform -translate-x-1/2 -translate-y-1/2"></div>
          
          {/* Downtown area */}
          <div className="absolute bottom-1/4 right-1/4 w-32 h-20 bg-gray-200 opacity-30 rounded-lg"></div>
        </div>
      </div>

      {/* Device Markers */}
      {mockDevices.map((device) => {
        const DeviceIcon = getDeviceIcon(device.type)
        return (
          <div
            key={device.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110"
            style={{ left: `${device.x}%`, top: `${device.y}%` }}
            onClick={() => setSelectedDevice(device)}
            onMouseEnter={() => setHoveredDevice(device)}
            onMouseLeave={() => setHoveredDevice(null)}
          >
            {/* Device marker */}
            <div className={`relative w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${getStatusColor(device.status)}`}>
              <DeviceIcon className="h-4 w-4 text-white" />
              {device.status === 'online' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              )}
            </div>
            
            {/* Hover tooltip */}
            {hoveredDevice?.id === device.id && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap z-10">
                {device.name}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
              </div>
            )}
          </div>
        )
      })}

      {/* Device Detail Modal */}
      {selectedDevice && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <Card className="w-96 max-w-[90vw]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {(() => {
                    const DeviceIcon = getDeviceIcon(selectedDevice.type)
                    return <DeviceIcon className="h-6 w-6" />
                  })()}
                  <div>
                    <CardTitle>{selectedDevice.id}</CardTitle>
                    <CardDescription>{selectedDevice.name}</CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedDevice(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                {getStatusBadge(selectedDevice.status)}
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">Location</span>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{selectedDevice.location}</span>
                </div>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">Last Seen</span>
                <p className="text-sm font-medium">{selectedDevice.lastSeen}</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Battery Level</span>
                  <span className="text-sm font-medium">{selectedDevice.battery}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${selectedDevice.battery > 50 ? 'bg-green-500' : selectedDevice.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${selectedDevice.battery}%` }}
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
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <h4 className="text-sm font-semibold mb-2">Device Status</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Online</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Warning</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Offline</span>
          </div>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button variant="outline" size="icon" className="bg-white/90 backdrop-blur-sm">
          +
        </Button>
        <Button variant="outline" size="icon" className="bg-white/90 backdrop-blur-sm">
          -
        </Button>
      </div>
    </div>
  )
}

