"use client";

import { FiAlertCircle, FiCheckCircle, FiClock, FiActivity } from "react-icons/fi";

interface TemperatureRecord {
  timestamp: string;
  temperature: number;
  status: 'breach' | 'optimal';
  analysis?: string;
  txHash: string;
}

interface TemperatureTableProps {
  data: TemperatureRecord[];
}

export const TemperatureTable = ({ data }: TemperatureTableProps) => (
  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-2xl glow-blue">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        AI-Processed Records
      </h3>
      <div className="flex items-center gap-2 text-blue-400">
        <FiActivity className="w-5 h-5" />
        <span className="text-sm">Blockchain-Verified Data</span>
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
            <th className="pb-3">Timestamp</th>
            <th className="pb-3">Temperature</th>
            <th className="pb-3">Status</th>
            <th className="pb-3">AI Analysis</th>
            <th className="pb-3">TX Hash</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={index} className="border-b border-gray-800 hover:bg-gray-700/20 transition-colors">
              <td className="py-3">{record.timestamp}</td>
              <td className="py-3">
                <span className={`flex items-center gap-2 ${
                  record.status === 'breach' ? 'text-red-400' : 'text-green-400'
                }`}>
                  {record.temperature}°C
                  {record.status === 'breach' ? <FiAlertCircle /> : <FiCheckCircle />}
                </span>
              </td>
              <td className="py-3">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  record.status === 'breach' 
                    ? 'bg-red-500/20 text-red-400' 
                    : 'bg-green-500/20 text-green-400'
                }`}>
                  {record.status === 'breach' ? 'Breach Detected' : 'Optimal'}
                </span>
              </td>
              <td className="py-3 text-gray-400 text-sm">
                {record.analysis || 'AI Analysis Pending...'}
              </td>
              <td className="py-3 text-blue-400 text-sm font-mono">
                {record.txHash.slice(0, 6)}...{record.txHash.slice(-4)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);