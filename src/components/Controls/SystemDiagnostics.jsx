import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Battery, 
  RefreshCw, 
  Play, 
  Square, 
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'

const systemNodes = [
  {
    id: 'node_001',
    name: 'Edge Node Alpha',
    location: 'Downtown Data Center',
    status: 'healthy',
    cpu: 45,
    memory: 62,
    storage: 78,
    network: 95,
    uptime: '15d 8h 23m',
    services: ['traffic_analysis', 'camera_processing', 'environmental_monitoring']
  },
  {
    id: 'node_002', 
    name: 'Edge Node Beta',
    location: 'Industrial District',
    status: 'warning',
    cpu: 78,
    memory: 89,
    storage: 45,
    network: 87,
    uptime: '12d 15h 45m',
    services: ['pollution_monitoring', 'traffic_control', 'emergency_systems']
  },
  {
    id: 'node_003',
    name: 'Edge Node Gamma',
    location: 'Residential Area',
    status: 'healthy',
    cpu: 32,
    memory: 54,
    storage: 67,
    network: 92,
    uptime: '8d 3h 12m',
    services: ['smart_lighting', 'waste_management', 'security_monitoring']
  }
]

const diagnosticTests = [
  { id: 'connectivity', name: 'Network Connectivity', duration: 30 },
  { id: 'performance', name: 'Performance Benchmark', duration: 120 },
  { id: 'security', name: 'Security Scan', duration: 180 },
  { id: 'storage', name: 'Storage Health Check', duration: 60 },
  { id: 'services', name: 'Service Status Check', duration: 45 }
]

export default function SystemDiagnostics() {
  const [selectedNode, setSelectedNode] = useState('all')
  const [runningTests, setRunningTests] = useState({})
  const [testResults, setTestResults] = useState({})
  const [isRefreshing, setIsRefreshing] = useState(false)

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'critical': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'healthy': return 'default'
      case 'warning': return 'secondary'
      case 'critical': return 'destructive'
      default: return 'outline'
    }
  }

  const getMetricColor = (value) => {
    if (value >= 90) return 'text-red-600'
    if (value >= 75) return 'text-yellow-600'
    return 'text-green-600'
  }

  const runDiagnosticTest = async (testId, nodeId = 'all') => {
    const testKey = `${testId}_${nodeId}`
    setRunningTests(prev => ({ ...prev, [testKey]: true }))
    
    const test = diagnosticTests.find(t => t.id === testId)
    
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, test.duration * 10)) // Shortened for demo
    
    // Generate mock results
    const success = Math.random() > 0.2 // 80% success rate
    const result = {
      testId,
      nodeId,
      status: success ? 'passed' : 'failed',
      timestamp: new Date(),
      details: success 
        ? `${test.name} completed successfully. All systems operating normally.`
        : `${test.name} detected issues. Review recommended.`,
      metrics: {
        responseTime: Math.floor(Math.random() * 100) + 50,
        throughput: Math.floor(Math.random() * 1000) + 500,
        errorRate: Math.random() * 5
      }
    }
    
    setTestResults(prev => ({ ...prev, [testKey]: result }))
    setRunningTests(prev => ({ ...prev, [testKey]: false }))
  }

  const refreshSystemData = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  const filteredNodes = selectedNode === 'all' ? systemNodes : systemNodes.filter(node => node.id === selectedNode)

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Diagnostics
          </CardTitle>
          <CardDescription>
            Monitor system health and run diagnostic tests on edge computing nodes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Select value={selectedNode} onValueChange={setSelectedNode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Nodes</SelectItem>
                  {systemNodes.map((node) => (
                    <SelectItem key={node.id} value={node.id}>
                      {node.name} - {node.location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              onClick={refreshSystemData}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Nodes */}
      <div className="grid gap-6 lg:grid-cols-2">
        {filteredNodes.map((node) => (
          <Card key={node.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="h-5 w-5" />
                    {node.name}
                  </CardTitle>
                  <CardDescription>{node.location}</CardDescription>
                </div>
                <Badge variant={getStatusBadge(node.status)} className={getStatusColor(node.status)}>
                  {node.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* System Metrics */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Cpu className="h-4 w-4" />
                      CPU Usage
                    </span>
                    <span className={getMetricColor(node.cpu)}>{node.cpu}%</span>
                  </div>
                  <Progress value={node.cpu} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Memory
                    </span>
                    <span className={getMetricColor(node.memory)}>{node.memory}%</span>
                  </div>
                  <Progress value={node.memory} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <HardDrive className="h-4 w-4" />
                      Storage
                    </span>
                    <span className={getMetricColor(node.storage)}>{node.storage}%</span>
                  </div>
                  <Progress value={node.storage} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Wifi className="h-4 w-4" />
                      Network
                    </span>
                    <span className={getMetricColor(100 - node.network)}>{node.network}%</span>
                  </div>
                  <Progress value={node.network} className="h-2" />
                </div>
              </div>

              {/* Uptime */}
              <div className="flex items-center justify-between text-sm border-t pt-4">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Uptime
                </span>
                <span className="font-medium">{node.uptime}</span>
              </div>

              {/* Services */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Active Services</div>
                <div className="flex flex-wrap gap-1">
                  {node.services.map((service) => (
                    <Badge key={service} variant="outline" className="text-xs">
                      {service.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Diagnostic Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Diagnostic Tests</CardTitle>
          <CardDescription>
            Run comprehensive tests to verify system health and performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {diagnosticTests.map((test) => {
              const testKey = `${test.id}_${selectedNode}`
              const isRunning = runningTests[testKey]
              const result = testResults[testKey]
              
              return (
                <Card key={test.id} className="relative">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{test.name}</h4>
                        {result && (
                          result.status === 'passed' ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                          )
                        )}
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        Duration: ~{test.duration}s
                      </div>
                      
                      {result && (
                        <div className="space-y-1">
                          <Badge 
                            variant={result.status === 'passed' ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {result.status}
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            {result.timestamp.toLocaleString()}
                          </div>
                        </div>
                      )}
                      
                      <Button
                        size="sm"
                        onClick={() => runDiagnosticTest(test.id, selectedNode)}
                        disabled={isRunning}
                        className="w-full"
                      >
                        {isRunning ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Running...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Run Test
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

