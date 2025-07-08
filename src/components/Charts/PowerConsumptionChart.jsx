import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const powerData = [
  { time: '00:00', consumption: 850, efficiency: 95.2, cost: 102 },
  { time: '02:00', consumption: 720, efficiency: 96.1, cost: 86 },
  { time: '04:00', consumption: 680, efficiency: 96.8, cost: 82 },
  { time: '06:00', consumption: 920, efficiency: 94.5, cost: 110 },
  { time: '08:00', consumption: 1200, efficiency: 92.3, cost: 144 },
  { time: '10:00', consumption: 1100, efficiency: 93.1, cost: 132 },
  { time: '12:00', consumption: 1150, efficiency: 92.8, cost: 138 },
  { time: '14:00', consumption: 1180, efficiency: 92.5, cost: 142 },
  { time: '16:00', consumption: 1220, efficiency: 92.1, cost: 146 },
  { time: '18:00', consumption: 1350, efficiency: 91.2, cost: 162 },
  { time: '20:00', consumption: 1050, efficiency: 93.8, cost: 126 },
  { time: '22:00', consumption: 900, efficiency: 94.9, cost: 108 }
]

export default function PowerConsumptionChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={powerData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis yAxisId="left" label={{ value: 'kWh', angle: -90, position: 'insideLeft' }} />
        <YAxis yAxisId="right" orientation="right" label={{ value: 'Efficiency %', angle: 90, position: 'insideRight' }} />
        <Tooltip 
          formatter={(value, name) => {
            if (name === 'consumption') return [`${value} kWh`, 'Power Consumption']
            if (name === 'efficiency') return [`${value}%`, 'Efficiency']
            if (name === 'cost') return [`$${value}`, 'Cost']
            return [value, name]
          }}
          labelFormatter={(label) => `Time: ${label}`}
        />
        <Legend />
        <Bar 
          yAxisId="left"
          dataKey="consumption" 
          fill="#8884d8" 
          name="Power Consumption"
          opacity={0.8}
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="efficiency" 
          stroke="#82ca9d" 
          strokeWidth={3}
          name="Efficiency"
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="cost" 
          stroke="#ff7300" 
          strokeWidth={2}
          name="Cost ($)"
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

