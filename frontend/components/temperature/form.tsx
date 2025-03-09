"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FiActivity, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

export const TemperatureForm = () => {
  const [temp, setTemp] = useState("");
  const [batchId, setBatchId] = useState("");

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-2xl glow-blue">
      <div className="flex items-center gap-3 mb-6">
        <FiActivity className="w-8 h-8 text-blue-400" />
        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          AI-Powered Temperature Recording
        </h3>
      </div>

      <div className="space-y-6">
        <div className="agent-recommendation bg-blue-900/20 p-4 rounded-lg border border-blue-700/30 mb-4">
          <div className="flex items-center gap-2 text-blue-400">
            <FiCheckCircle className="w-5 h-5" />
            <span className="text-sm">AI Agent: Optimal recording conditions detected</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Batch ID</label>
            <input
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Temperature (°C)</label>
            <div className="relative">
              <input
                type="number"
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 pr-12"
              />
              <div className="absolute right-3 top-3 text-gray-400 text-sm">
                {temp && (
                  <span className={`flex items-center gap-1 ${
                    Number(temp) > 4 || Number(temp) < 0 ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {Number(temp) > 4 || Number(temp) < 0 ? <FiAlertCircle /> : <FiCheckCircle />}
                    {Number(temp) > 4 ? 'Overheated' : Number(temp) < 0 ? 'Frozen' : 'Optimal'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="agent-action bg-gray-700/30 p-4 rounded-lg border border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400">
              <FiActivity className="w-5 h-5 animate-pulse" />
              <span className="text-sm">AI Agent: Real-time validation active</span>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
              <FiCheckCircle />
              Confirm Recording
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};