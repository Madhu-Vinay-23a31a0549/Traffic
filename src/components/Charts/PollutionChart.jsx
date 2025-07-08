import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const pollutionData = [
  { time: '00:00', pm25: 15, pm10: 25, no2: 30, o3: 45 },
  { time: '02:00', pm25: 12, pm10: 20, no2: 25, o3: 40 },
  { time: '04:00', pm25: 10, pm10: 18, no2: 22, o3: 38 },
  { time: '06:00', pm25: 18, pm10: 30, no2: 35, o3: 50 },
  { time: '08:00', pm25: 25, pm10: 40, no2: 45, o3: 60 },
  { time: '10:00', pm25: 22, pm10: 35, no2: 40, o3: 55 },
  { time: '12:00', pm25: 28, pm10: 45, no2: 50, o3: 65 },
  { time: '14:00', pm25: 30, pm10: 48, no2: 52, o3: 68 },
  { time: '16:00', pm25: 32, pm10: 50, no2: 55, o3: 70 },
  { time: '18:00', pm25: 35, pm10: 55, no2: 60, o3: 75 },
  { time: '20:00', pm25: 28, pm10: 42, no2: 48, o3: 62 },
  { time: '22:00', pm25: 20, pm10: 32, no2: 38, o3: 52 }
]

export default function PollutionChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={pollutionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis label={{ value: 'μg/m³', angle: -90, position: 'insideLeft' }} />
        <Tooltip 
          formatter={(value, name) => [
            `${value} μg/m³`, 
            name.toUpperCase().replace(/(\d+)/, ' $1')
          ]}
          labelFormatter={(label) => `Time: ${label}`}
        />
        <Legend 
          formatter={(value) => value.toUpperCase().replace(/(\d+)/, ' $1')}
        />
        <Area 
          type="monotone" 
          dataKey="pm25" 
          stackId="1"
          stroke="#8884d8" 
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Area 
          type="monotone" 
          dataKey="pm10" 
          stackId="1"
          stroke="#82ca9d" 
          fill="#82ca9d"
          fillOpacity={0.6}
        />
        <Area 
          type="monotone" 
          dataKey="no2" 
          stackId="1"
          stroke="#ffc658" 
          fill="#ffc658"
          fillOpacity={0.6}
        />
        <Area 
          type="monotone" 
          dataKey="o3" 
          stackId="1"
          stroke="#ff7300" 
          fill="#ff7300"
          fillOpacity={0.6}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

