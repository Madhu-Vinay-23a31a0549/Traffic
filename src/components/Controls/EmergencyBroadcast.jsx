import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertTriangle, Megaphone, Clock, CheckCircle, X, Radio } from 'lucide-react'

const broadcastChannels = [
  { id: 'all', name: 'All Channels', description: 'Broadcast to all available channels' },
  { id: 'traffic', name: 'Traffic Displays', description: 'Highway and street digital signs' },
  { id: 'mobile', name: 'Mobile Alerts', description: 'Emergency mobile notifications' },
  { id: 'radio', name: 'Emergency Radio', description: 'Emergency radio frequencies' },
  { id: 'social', name: 'Social Media', description: 'Official city social media accounts' }
]

const messageTemplates = [
  {
    id: 'traffic_incident',
    title: 'Traffic Incident',
    message: 'TRAFFIC ALERT: Major incident on [LOCATION]. Expect delays. Use alternate routes. Emergency services on scene.'
  },
  {
    id: 'weather_warning',
    title: 'Weather Warning', 
    message: 'WEATHER ALERT: [WEATHER_TYPE] warning in effect for [AREA]. Take necessary precautions. Stay indoors if possible.'
  },
  {
    id: 'evacuation',
    title: 'Evacuation Notice',
    message: 'EVACUATION NOTICE: Immediate evacuation required for [AREA] due to [REASON]. Follow designated evacuation routes.'
  },
  {
    id: 'utility_outage',
    title: 'Utility Outage',
    message: 'UTILITY ALERT: [UTILITY_TYPE] outage affecting [AREA]. Estimated restoration: [TIME]. Updates to follow.'
  },
  {
    id: 'public_safety',
    title: 'Public Safety',
    message: 'PUBLIC SAFETY ALERT: [DESCRIPTION]. Avoid [AREA]. Follow instructions from local authorities.'
  }
]

const priorityLevels = [
  { value: 'low', label: 'Low Priority', color: 'bg-blue-500', description: 'General information' },
  { value: 'medium', label: 'Medium Priority', color: 'bg-yellow-500', description: 'Important updates' },
  { value: 'high', label: 'High Priority', color: 'bg-orange-500', description: 'Urgent notifications' },
  { value: 'critical', label: 'Critical', color: 'bg-red-500', description: 'Emergency situations' }
]

export default function EmergencyBroadcast() {
  const [message, setMessage] = useState('')
  const [selectedChannels, setSelectedChannels] = useState(['all'])
  const [priority, setPriority] = useState('medium')
  const [duration, setDuration] = useState('30')
  const [isSending, setIsSending] = useState(false)
  const [sentMessages, setSentMessages] = useState([])
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleTemplateSelect = (template) => {
    setMessage(template.message)
  }

  const handleChannelToggle = (channelId) => {
    if (channelId === 'all') {
      setSelectedChannels(['all'])
    } else {
      setSelectedChannels(prev => {
        const filtered = prev.filter(id => id !== 'all')
        if (filtered.includes(channelId)) {
          return filtered.filter(id => id !== channelId)
        } else {
          return [...filtered, channelId]
        }
      })
    }
  }

  const handleSendBroadcast = async () => {
    setIsSending(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newMessage = {
      id: Date.now(),
      message,
      channels: selectedChannels,
      priority,
      duration: parseInt(duration),
      timestamp: new Date(),
      status: 'sent'
    }
    
    setSentMessages(prev => [newMessage, ...prev])
    setMessage('')
    setSelectedChannels(['all'])
    setPriority('medium')
    setDuration('30')
    setIsSending(false)
    setShowConfirmation(false)
  }

  const getPriorityConfig = (level) => {
    return priorityLevels.find(p => p.value === level) || priorityLevels[1]
  }

  const getChannelNames = (channelIds) => {
    if (channelIds.includes('all')) return 'All Channels'
    return channelIds.map(id => 
      broadcastChannels.find(c => c.id === id)?.name
    ).join(', ')
  }

  return (
    <div className="space-y-6">
      {/* Broadcast Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5" />
            Emergency Broadcast System
          </CardTitle>
          <CardDescription>
            Send emergency messages and alerts to city communication channels
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Message Templates */}
          <div className="space-y-3">
            <Label>Quick Templates</Label>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              {messageTemplates.map((template) => (
                <Button
                  key={template.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleTemplateSelect(template)}
                  className="justify-start h-auto p-3"
                >
                  <div className="text-left">
                    <div className="font-medium">{template.title}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {template.message.substring(0, 50)}...
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <Label htmlFor="message">Emergency Message</Label>
            <Textarea
              id="message"
              placeholder="Enter your emergency message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <div className="text-xs text-muted-foreground">
              {message.length}/500 characters
            </div>
          </div>

          {/* Broadcast Channels */}
          <div className="space-y-3">
            <Label>Broadcast Channels</Label>
            <div className="grid gap-3 md:grid-cols-2">
              {broadcastChannels.map((channel) => (
                <div
                  key={channel.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedChannels.includes(channel.id) || selectedChannels.includes('all')
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleChannelToggle(channel.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{channel.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {channel.description}
                      </div>
                    </div>
                    <Radio className={`h-4 w-4 ${
                      selectedChannels.includes(channel.id) || selectedChannels.includes('all')
                        ? 'text-blue-500'
                        : 'text-gray-400'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Priority and Duration */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Priority Level</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorityLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${level.color}`} />
                        <div>
                          <div>{level.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {level.description}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                min="5"
                max="120"
              />
            </div>
          </div>

          {/* Send Button */}
          <div className="flex gap-2 pt-4 border-t">
            <Button
              onClick={() => setShowConfirmation(true)}
              disabled={!message.trim() || isSending}
              className="flex-1"
            >
              <Megaphone className="h-4 w-4 mr-2" />
              Send Emergency Broadcast
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Broadcasts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Broadcasts</CardTitle>
          <CardDescription>
            History of sent emergency messages
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sentMessages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No broadcasts sent yet
            </div>
          ) : (
            <div className="space-y-4">
              {sentMessages.slice(0, 5).map((msg) => {
                const priorityConfig = getPriorityConfig(msg.priority)
                
                return (
                  <div key={msg.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${priorityConfig.color}`} />
                        <Badge variant="outline">{priorityConfig.label}</Badge>
                        <Badge variant="secondary">{getChannelNames(msg.channels)}</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {msg.timestamp.toLocaleString()}
                      </div>
                    </div>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Confirm Emergency Broadcast
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div><strong>Message:</strong> {message}</div>
                <div><strong>Channels:</strong> {getChannelNames(selectedChannels)}</div>
                <div><strong>Priority:</strong> {getPriorityConfig(priority).label}</div>
                <div><strong>Duration:</strong> {duration} minutes</div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1"
                  disabled={isSending}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendBroadcast}
                  className="flex-1"
                  disabled={isSending}
                >
                  {isSending ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Send Now
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

