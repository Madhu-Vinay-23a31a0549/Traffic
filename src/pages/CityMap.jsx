import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Camera, Thermometer, Car } from 'lucide-react'
import InteractiveMap from '@/components/Map/InteractiveMap'

export default function CityMap() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">City Map</h1>
        <p className="text-muted-foreground">
          Interactive map showing edge device locations and status
        </p>
      </div>

      {/* Map Container */}
      <div className="grid gap-4 lg:grid-cols-4">
        {/* Map */}
        <div className="lg:col-span-3">
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle>Live City Map</CardTitle>
              <CardDescription>
                Click on device markers to view details and status
              </CardDescription>
            </CardHeader>
            <CardContent className="h-full p-0">
              <div className="w-full h-[500px]">
                <InteractiveMap />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Device Legend */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Device Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <Camera className="h-4 w-4" />
                <span className="text-sm">Security Cameras</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <Thermometer className="h-4 w-4" />
                <span className="text-sm">Environmental Sensors</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <Car className="h-4 w-4" />
                <span className="text-sm">Traffic Sensors</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Online</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Warning</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">Offline</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Total Devices</span>
                <span className="text-sm font-medium">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Online</span>
                <span className="text-sm font-medium text-green-600">1,198</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Offline</span>
                <span className="text-sm font-medium text-red-600">49</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Map Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                • Click markers to view device details
              </p>
              <p className="text-sm text-muted-foreground">
                • Hover for quick device info
              </p>
              <p className="text-sm text-muted-foreground">
                • Use zoom controls to navigate
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

