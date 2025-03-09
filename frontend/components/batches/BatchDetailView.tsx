import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";

interface BatchDetailViewProps {
  batch: {
    id: string;
    status: string;
    qualityScore: number;
    createdAt: string;
    temperatureHistory: { timestamp: string; temperature: number }[];
  };
}

export const BatchDetailView = ({ batch }: BatchDetailViewProps) => (
  <div className="space-y-6">
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <h3 className="text-sm text-gray-400">Status</h3>
        <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {batch.status}
        </p>
      </Card>
      <Card>
        <h3 className="text-sm text-gray-400">Quality Score</h3>
        <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {batch.qualityScore}/100
        </p>
      </Card>
      <Card>
        <h3 className="text-sm text-gray-400">Created At</h3>
        <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {batch.createdAt}
        </p>
      </Card>
    </div>

    <Card>
      <h2 className="text-xl font-bold mb-4">Temperature History</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={batch.temperatureHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="timestamp" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151" }} />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ r: 4, fill: "#3B82F6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  </div>
);