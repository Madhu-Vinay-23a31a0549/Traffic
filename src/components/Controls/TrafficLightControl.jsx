import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TrafficCone, Clock, MapPin, AlertTriangle, CheckCircle } from 'lucide-react'

const mockTrafficLights = [
  {
    id: 'TL_001',
    name: 'Main St & 1st Ave',
    location: 'Main Street & 1st Avenue',
    status: 'operational',
    currentPhase: 'green_ns',
    mode: 'automatic',
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: 'TL_002', 
    name: 'Oak St & 2nd Ave',
    location: 'Oak Street & 2nd Avenue',
    status: 'maintenance',
    currentPhase: 'red_all',
    mode: 'manual',
    coordinates: { lat: 40.7130, lng: -74.0058 }
  },
  {
    id: 'TL_003',
    name: 'Park Ave & 3rd St',
    location: 'Park Avenue & 3rd Street', 
    status: 'operational',
    currentPhase: 'yellow_ns',
    mode: 'automatic',
    coordinates: { lat: 40.7125, lng: -74.0065 }
  }
]

const phaseOptions = [
  { value: 'green_ns', label: 'Green North-South', color: 'bg-green-500' },
  { value: 'yellow_ns', label: 'Yellow North-South', color: 'bg-yellow-500' },
  { value: 'red_ns', label: 'Red North-South', color: 'bg-red-500' },
  { value: 'green_ew', label: 'Green East-West', color: 'bg-green-500' },
  { value: 'yellow_ew', label: 'Yellow East-West', color: 'bg-yellow-500' },
  { value: 'red_ew', label: 'Red East-West', color: 'bg-red-500' },
  { value: 'red_all', label: 'Red All Directions', color: 'bg-red-600' }
]

export default function TrafficLightControl() {
  const [trafficLights, setTrafficLights] = useState(mockTrafficLights)
  const [selectedLight, setSelectedLight] = useState(null)
  const [newPhase, setNewPhase] = useState('')
  const [duration, setDuration] = useState('60')
  const [isChanging, setIsChanging] = useState(false)

  const handlePhaseChange = async (lightId, phase, durationSec) => {
    setIsChanging(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setTrafficLights(prev => 
      prev.map(light => 
        light.id === lightId 
          ? { ...light, currentPhase: phase, mode: 'manual' }
          : light
      )
    )
    
    setIsChanging(false)
    setSelectedLight(null)
    setNewPhase('')
  }

  const handleModeToggle = async (lightId) => {
    setTrafficLights(prev => 
      prev.map(light => 
        light.id === lightId 
          ? { ...light, mode: light.mode === 'automatic' ? 'manual' : 'automatic' }
          : light
      )
    )
  }

  const getPhaseDisplay = (phase) => {
    const phaseConfig = phaseOptions.find(p => p.value === phase)
    return phaseConfig || { label: phase, color: 'bg-gray-500' }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-green-600'
      case 'maintenance': return 'text-orange-600'
      case 'offline': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {trafficLights.map((light) => {
          const phaseDisplay = getPhaseDisplay(light.currentPhase)
          
          return (
            <Card key={light.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrafficCone className="h-5 w-5 text-orange-600" />
                    <CardTitle className="text-lg">{light.name}</CardTitle>
                  </div>
                  <Badge 
                    variant={light.status === 'operational' ? 'default' : 'secondary'}
                    className={getStatusColor(light.status)}
                  >
                    {light.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{light.location}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Current Phase */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Current Phase:</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${phaseDisplay.color}`} />
                    <span className="text-sm">{phaseDisplay.label}</span>
                  </div>
                </div>
                
                {/* Mode */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Mode:</span>
                  <Badge variant={light.mode === 'automatic' ? 'default' : 'secondary'}>
                    {light.mode}
                  </Badge>
                </div>
                
                {/* Controls */}
                <div className="space-y-3 pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleModeToggle(light.id)}
                    className="w-full"
                    disabled={light.status !== 'operational'}
                  >
                    Switch to {light.mode === 'automatic' ? 'Manual' : 'Automatic'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedLight(light)}
                    className="w-full"
                    disabled={light.status !== 'operational'}
                  >
                    Change Phase
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Phase Change Modal */}
      {selectedLight && (
        <Card className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center gap-2">
                <TrafficCone className="h-5 w-5" />
                Change Traffic Light Phase
              </CardTitle>
              <CardDescription>
                {selectedLight.name} - {selectedLight.location}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-0 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phase">New Phase</Label>
                <Select value={newPhase} onValueChange={setNewPhase}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select phase" />
                  </SelectTrigger>
                  <SelectContent>
                    {phaseOptions.map((phase) => (
                      <SelectItem key={phase.value} value={phase.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${phase.color}`} />
                          {phase.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (seconds)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  min="10"
                  max="300"
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedLight(null)}
                  className="flex-1"
                  disabled={isChanging}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handlePhaseChange(selectedLight.id, newPhase, duration)}
                  className="flex-1"
                  disabled={!newPhase || isChanging}
                >
                  {isChanging ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Changing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Apply Change
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      )}
    </div>
  )
}

