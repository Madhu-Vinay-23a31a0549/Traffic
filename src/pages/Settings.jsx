import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  User, 
  Shield, 
  Bell, 
  Monitor, 
  Database, 
  Wifi,
  Settings as SettingsIcon,
  Save,
  RefreshCw
} from 'lucide-react'

export default function Settings() {
  const settingsCategories = [
    {
      id: "user-profile",
      name: "User Profile",
      description: "Manage your account settings and preferences",
      icon: User,
      settings: [
        { name: "Display Name", value: "City Administrator", type: "text" },
        { name: "Email", value: "admin@smartcity.gov", type: "email" },
        { name: "Role", value: "System Administrator", type: "readonly" },
        { name: "Department", value: "IT Infrastructure", type: "text" }
      ]
    },
    {
      id: "security",
      name: "Security Settings",
      description: "Configure authentication and access controls",
      icon: Shield,
      settings: [
        { name: "Two-Factor Authentication", value: "Enabled", type: "toggle" },
        { name: "Session Timeout", value: "30 minutes", type: "select" },
        { name: "Password Policy", value: "Strong", type: "select" },
        { name: "Login Attempts", value: "5 attempts", type: "number" }
      ]
    },
    {
      id: "notifications",
      name: "Notification Preferences",
      description: "Control how and when you receive alerts",
      icon: Bell,
      settings: [
        { name: "Email Notifications", value: "Enabled", type: "toggle" },
        { name: "SMS Alerts", value: "Critical Only", type: "select" },
        { name: "Desktop Notifications", value: "Enabled", type: "toggle" },
        { name: "Alert Sound", value: "Enabled", type: "toggle" }
      ]
    },
    {
      id: "display",
      name: "Display Settings",
      description: "Customize the dashboard appearance",
      icon: Monitor,
      settings: [
        { name: "Theme", value: "Light", type: "select" },
        { name: "Refresh Rate", value: "30 seconds", type: "select" },
        { name: "Chart Animation", value: "Enabled", type: "toggle" },
        { name: "Compact Mode", value: "Disabled", type: "toggle" }
      ]
    }
  ]

  const systemSettings = [
    { name: "Data Retention Period", value: "90 days", icon: Database },
    { name: "API Rate Limiting", value: "1000 req/min", icon: Wifi },
    { name: "Backup Frequency", value: "Daily", icon: RefreshCw },
    { name: "System Monitoring", value: "Active", icon: Monitor }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Configure your dashboard preferences and system settings
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Settings Categories */}
      <div className="grid gap-6 lg:grid-cols-2">
        {settingsCategories.map((category) => {
          const CategoryIcon = category.icon
          return (
            <Card key={category.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CategoryIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.settings.map((setting, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{setting.name}</span>
                    <div className="flex items-center gap-2">
                      {setting.type === 'toggle' ? (
                        <Badge className={setting.value === 'Enabled' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {setting.value}
                        </Badge>
                      ) : setting.type === 'readonly' ? (
                        <Badge variant="outline">{setting.value}</Badge>
                      ) : (
                        <span className="text-sm text-muted-foreground">{setting.value}</span>
                      )}
                      {setting.type !== 'readonly' && (
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* System Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            System Configuration
          </CardTitle>
          <CardDescription>
            Advanced system settings and configuration options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {systemSettings.map((setting, index) => {
              const SettingIcon = setting.icon
              return (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <SettingIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{setting.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{setting.value}</span>
                    <Button variant="ghost" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-800">Danger Zone</CardTitle>
          <CardDescription className="text-red-700">
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-red-200 rounded-lg">
            <div>
              <div className="font-medium text-red-800">Reset All Settings</div>
              <div className="text-sm text-red-600">Restore all settings to factory defaults</div>
            </div>
            <Button variant="destructive" size="sm">
              Reset
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 border border-red-200 rounded-lg">
            <div>
              <div className="font-medium text-red-800">Clear All Data</div>
              <div className="text-sm text-red-600">Permanently delete all stored data and logs</div>
            </div>
            <Button variant="destructive" size="sm">
              Clear Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

