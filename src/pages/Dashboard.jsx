import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Activity, AlertTriangle, Camera, Cpu, MapPin, Thermometer, TrafficCone, Clock, CheckCircle, Bell } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Smart city edge computing system overview
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Last updated</div>
          <div className="text-sm font-medium">12:00:00 PM</div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">
              234 online, 13 offline
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">2</div>
            <p className="text-xs text-muted-foreground">
              5 total incidents
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">99.7%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days average
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3 min</div>
            <p className="text-xs text-muted-foreground">
              Average incident response
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Device Status by Type</CardTitle>
          <CardDescription>
            Real-time status of edge computing devices across the city
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Security Cameras</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Online: 85</span>
                  <span>Total: 89</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-green-600" />
                <span className="font-medium">Environmental Sensors</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Online: 72</span>
                  <span>Total: 76</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrafficCone className="h-5 w-5 text-orange-600" />
                <span className="font-medium">Traffic Systems</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Online: 77</span>
                  <span>Total: 82</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Alerts
            </CardTitle>
            <CardDescription>
              Latest system alerts and notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium">High Traffic Volume</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    Highway 101 North
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant="outline" className="text-yellow-600">
                    medium
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    5 min ago
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium">Camera Offline</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    Main St & 5th Ave
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant="outline" className="text-blue-600">
                    low
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    12 min ago
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium">Air Quality Alert</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    Industrial District
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant="outline" className="text-red-600">
                    high
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    25 min ago
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Alerts
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Frequently used dashboard operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <MapPin className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">View City Map</div>
                  <div className="text-xs text-muted-foreground">Interactive device map</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Activity className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">System Health</div>
                  <div className="text-xs text-muted-foreground">Run diagnostics</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <AlertTriangle className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Emergency Mode</div>
                  <div className="text-xs text-muted-foreground">Activate protocols</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Cpu className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Analytics</div>
                  <div className="text-xs text-muted-foreground">View reports</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

