import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const trafficData = [
  { time: '00:00', mainSt: 120, parkAve: 80, broadway: 95, highway101: 200 },
  { time: '02:00', mainSt: 80, parkAve: 45, broadway: 60, highway101: 150 },
  { time: '04:00', mainSt: 60, parkAve: 30, broadway: 40, highway101: 120 },
  { time: '06:00', mainSt: 200, parkAve: 150, broadway: 180, highway101: 350 },
  { time: '08:00', mainSt: 450, parkAve: 380, broadway: 420, highway101: 650 },
  { time: '10:00', mainSt: 350, parkAve: 280, broadway: 320, highway101: 500 },
  { time: '12:00', mainSt: 400, parkAve: 320, broadway: 380, highway101: 580 },
  { time: '14:00', mainSt: 380, parkAve: 300, broadway: 360, highway101: 550 },
  { time: '16:00', mainSt: 420, parkAve: 350, broadway: 400, highway101: 600 },
  { time: '18:00', mainSt: 500, parkAve: 420, broadway: 480, highway101: 720 },
  { time: '20:00', mainSt: 320, parkAve: 250, broadway: 300, highway101: 450 },
  { time: '22:00', mainSt: 180, parkAve: 120, broadway: 150, highway101: 280 }
]

export default function TrafficFlowChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={trafficData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis label={{ value: 'Vehicles/Hour', angle: -90, position: 'insideLeft' }} />
        <Tooltip 
          formatter={(value, name) => [value, name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())]}
          labelFormatter={(label) => `Time: ${label}`}
        />
        <Legend 
          formatter={(value) => value.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
        />
        <Line 
          type="monotone" 
          dataKey="mainSt" 
          stroke="#8884d8" 
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line 
          type="monotone" 
          dataKey="parkAve" 
          stroke="#82ca9d" 
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line 
          type="monotone" 
          dataKey="broadway" 
          stroke="#ffc658" 
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line 
          type="monotone" 
          dataKey="highway101" 
          stroke="#ff7300" 
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

