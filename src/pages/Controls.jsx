import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { TrafficCone, Megaphone, Activity, Settings, Shield, AlertTriangle } from 'lucide-react'
import TrafficLightControl from '@/components/Controls/TrafficLightControl'
import EmergencyBroadcast from '@/components/Controls/EmergencyBroadcast'
import SystemDiagnostics from '@/components/Controls/SystemDiagnostics'

export default function Controls() {
  const [activeTab, setActiveTab] = useState('traffic')

  const controlSections = [
    {
      id: 'traffic',
      title: 'Traffic Control',
      description: 'Manage traffic lights and road systems',
      icon: TrafficCone,
      count: 12,
      status: 'operational'
    },
    {
      id: 'emergency',
      title: 'Emergency Broadcast',
      description: 'Send emergency alerts and notifications',
      icon: Megaphone,
      count: 5,
      status: 'ready'
    },
    {
      id: 'diagnostics',
      title: 'System Diagnostics',
      description: 'Monitor and test system health',
      icon: Activity,
      count: 3,
      status: 'healthy'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
      case 'healthy':
      case 'ready':
        return 'text-green-600'
      case 'warning':
        return 'text-yellow-600'
      case 'critical':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'operational':
      case 'healthy':
      case 'ready':
        return 'default'
      case 'warning':
        return 'secondary'
      case 'critical':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Remote Controls</h1>
        <p className="text-muted-foreground">
          Manage and control city infrastructure systems remotely
        </p>
      </div>

      {/* Control Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {controlSections.map((section) => {
          const Icon = section.icon
          
          return (
            <Card key={section.id} className="relative">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{section.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{section.count}</div>
                <p className="text-xs text-muted-foreground mb-2">
                  {section.description}
                </p>
                <Badge 
                  variant={getStatusBadge(section.status)} 
                  className={getStatusColor(section.status)}
                >
                  {section.status}
                </Badge>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Security Notice */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-orange-600" />
            <div>
              <h4 className="font-medium text-orange-800">Security Notice</h4>
              <p className="text-sm text-orange-700">
                All control actions are logged and require proper authorization. 
                Critical operations may require additional confirmation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Control Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="traffic" className="flex items-center gap-2">
            <TrafficCone className="h-4 w-4" />
            Traffic Control
          </TabsTrigger>
          <TabsTrigger value="emergency" className="flex items-center gap-2">
            <Megaphone className="h-4 w-4" />
            Emergency Broadcast
          </TabsTrigger>
          <TabsTrigger value="diagnostics" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            System Diagnostics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrafficCone className="h-5 w-5" />
                Traffic Light Management
              </CardTitle>
              <CardDescription>
                Control traffic lights and monitor intersection status across the city
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TrafficLightControl />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-4">
          <EmergencyBroadcast />
        </TabsContent>

        <TabsContent value="diagnostics" className="space-y-4">
          <SystemDiagnostics />
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Frequently used control operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="text-center space-y-2">
                <AlertTriangle className="h-6 w-6 mx-auto text-red-600" />
                <div className="font-medium text-sm">Emergency Mode</div>
                <div className="text-xs text-muted-foreground">
                  Activate city-wide emergency protocols
                </div>
              </div>
            </Card>
            
            <Card className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="text-center space-y-2">
                <TrafficCone className="h-6 w-6 mx-auto text-orange-600" />
                <div className="font-medium text-sm">Traffic Override</div>
                <div className="text-xs text-muted-foreground">
                  Override all traffic lights to red
                </div>
              </div>
            </Card>
            
            <Card className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="text-center space-y-2">
                <Activity className="h-6 w-6 mx-auto text-blue-600" />
                <div className="font-medium text-sm">System Restart</div>
                <div className="text-xs text-muted-foreground">
                  Restart all edge computing nodes
                </div>
              </div>
            </Card>
            
            <Card className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="text-center space-y-2">
                <Megaphone className="h-6 w-6 mx-auto text-green-600" />
                <div className="font-medium text-sm">Test Broadcast</div>
                <div className="text-xs text-muted-foreground">
                  Send test message to all channels
                </div>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

