"use client";

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { FiArrowLeft, FiAlertCircle, FiCheckCircle, FiClock } from "react-icons/fi";

const BatchDetailPage = ({ params }: { params: { id: string } }) => {
  const [showModal, setShowModal] = useState(false);
  const [mockTemperature] = useState([
    { time: "00:00", temp: 2.0 },
    { time: "02:00", temp: 2.5 },
    { time: "04:00", temp: 3.0 },
  ]);

  const mockBatch = {
    id: params.id,
    status: "In Transit",
    qualityScore: 84,
    createdAt: "2024-03-05T12:00:00Z",
    berryType: "Strawberries",
    temperatureHistory: mockTemperature,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-24"> {/* Adjusted pt for navbar */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => window.history.back()}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Batch #{mockBatch.id}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-2xl">
            <h3 className="text-sm text-gray-400">Status</h3>
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {mockBatch.status}
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-2xl">
            <h3 className="text-sm text-gray-400">Quality Score</h3>
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {mockBatch.qualityScore}/100
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-2xl">
            <h3 className="text-sm text-gray-400">Created At</h3>
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {new Date(mockBatch.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-2xl mb-8">
          <h2 className="text-xl font-bold mb-4">Temperature History</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockBatch.temperatureHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151" }} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#3B82F6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-lg flex items-center gap-2"
          >
            <FiCheckCircle className="w-5 h-5" />
            Complete Shipment
          </Button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-2xl w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Confirm Completion</h2>
              <p className="mb-4">Are you sure you want to mark this shipment as completed?</p>
              <div className="flex justify-end space-x-3">
                <Button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 px-6 py-3"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setShowModal(false)}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchDetailPage;