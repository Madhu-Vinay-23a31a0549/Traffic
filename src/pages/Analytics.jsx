import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, Activity, Zap, Wind } from 'lucide-react'
import TrafficFlowChart from '@/components/Charts/TrafficFlowChart'
import PollutionChart from '@/components/Charts/PollutionChart'
import DeviceHealthChart from '@/components/Charts/DeviceHealthChart'
import PowerConsumptionChart from '@/components/Charts/PowerConsumptionChart'

export default function Analytics() {
  const [activeTab, setActiveTab] = useState('traffic')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Data insights and performance metrics for your smart city infrastructure
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">1H</Button>
          <Button variant="default" size="sm">24H</Button>
          <Button variant="outline" size="sm">7D</Button>
          <Button variant="outline" size="sm">30D</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Traffic Flow</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Air Quality Index</CardTitle>
            <Wind className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-yellow-600">Moderate</span> conditions
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.1%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.3%</span> from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Power Efficiency</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5.3%</span> from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Navigation */}
      <div className="flex gap-2 border-b">
        <Button 
          variant={activeTab === 'traffic' ? 'default' : 'ghost'} 
          onClick={() => setActiveTab('traffic')}
        >
          Traffic Flow
        </Button>
        <Button 
          variant={activeTab === 'environment' ? 'default' : 'ghost'} 
          onClick={() => setActiveTab('environment')}
        >
          Environment
        </Button>
        <Button 
          variant={activeTab === 'devices' ? 'default' : 'ghost'} 
          onClick={() => setActiveTab('devices')}
        >
          Device Health
        </Button>
        <Button 
          variant={activeTab === 'power' ? 'default' : 'ghost'} 
          onClick={() => setActiveTab('power')}
        >
          Power & Energy
        </Button>
      </div>

      {/* Charts */}
      {activeTab === 'traffic' && (
        <Card>
          <CardHeader>
            <CardTitle>Traffic Flow Analysis</CardTitle>
            <CardDescription>
              Real-time traffic volume across major city routes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <TrafficFlowChart />
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'environment' && (
        <Card>
          <CardHeader>
            <CardTitle>Air Quality Monitoring</CardTitle>
            <CardDescription>
              Pollution levels and air quality metrics throughout the day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <PollutionChart />
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'devices' && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Device Status Distribution</CardTitle>
              <CardDescription>
                Overall health status of all edge devices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <DeviceHealthChart chartType="pie" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Device Health by Type</CardTitle>
              <CardDescription>
                Status breakdown by device category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <DeviceHealthChart chartType="bar" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'power' && (
        <Card>
          <CardHeader>
            <CardTitle>Power Consumption & Efficiency</CardTitle>
            <CardDescription>
              Energy usage patterns and system efficiency metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <PowerConsumptionChart />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Insights */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Peak Traffic Hours</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Morning Rush</span>
              <span className="text-sm font-medium">8:00 - 9:00 AM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Evening Rush</span>
              <span className="text-sm font-medium">6:00 - 7:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Peak Volume</span>
              <span className="text-sm font-medium">720 vehicles/hour</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Environmental Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">PM2.5 High</span>
              <span className="text-sm font-medium text-yellow-600">2 locations</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">NO2 Elevated</span>
              <span className="text-sm font-medium text-orange-600">1 location</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Overall AQI</span>
              <span className="text-sm font-medium text-green-600">Good</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Uptime</span>
              <span className="text-sm font-medium">99.7%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Response Time</span>
              <span className="text-sm font-medium">200ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Data Accuracy</span>
              <span className="text-sm font-medium">98.9%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

