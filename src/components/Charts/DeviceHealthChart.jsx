import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const deviceStatusData = [
  { name: 'Online', value: 1198, color: '#10b981' },
  { name: 'Warning', value: 26, color: '#f59e0b' },
  { name: 'Offline', value: 23, color: '#ef4444' }
]

const deviceTypeHealth = [
  { type: 'Cameras', online: 485, warning: 12, offline: 8, total: 505 },
  { type: 'Environmental', online: 298, warning: 8, offline: 4, total: 310 },
  { type: 'Traffic', online: 415, warning: 6, offline: 11, total: 432 }
]

const COLORS = ['#10b981', '#f59e0b', '#ef4444']

export default function DeviceHealthChart({ chartType = 'pie' }) {
  if (chartType === 'bar') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={deviceTypeHealth} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis label={{ value: 'Device Count', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="online" stackId="a" fill="#10b981" name="Online" />
          <Bar dataKey="warning" stackId="a" fill="#f59e0b" name="Warning" />
          <Bar dataKey="offline" stackId="a" fill="#ef4444" name="Offline" />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={deviceStatusData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {deviceStatusData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [value, 'Devices']} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

