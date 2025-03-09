"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FiAlertTriangle, FiInfo, FiActivity } from "react-icons/fi";

interface TemperatureData {
  timestamp: string;
  temperature: number;
}

interface TemperatureChartProps {
  data: TemperatureData[];
}

export const TemperatureChart = ({ data }: TemperatureChartProps) => (
  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-2xl glow-blue">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <FiActivity className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          AI-Analyzed Temperature History
        </h3>
      </div>
      <div className="flex items-center gap-2 text-blue-400">
        <FiInfo className="w-5 h-5" />
        <span className="text-sm">AI-Powered Insights</span>
      </div>
    </div>

    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="timestamp" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip 
            contentStyle={{ 
              background: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value) => [`${value}°C`, 'Temperature']}
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 6,
              fill: "#3B82F6",
              stroke: "#1E40AF",
              strokeWidth: 2
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>

    <div className="mt-6 flex items-center gap-4 text-sm text-gray-400">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full" />
        <span>Current Temperature</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full" />
        <span>Breach Threshold</span>
      </div>
    </div>
  </div>
);