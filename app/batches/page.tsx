"use client";

import { useState } from "react";
import RecentBatches from "@/components/batches/RecentBatches";
import { Button } from "@/components/ui/button";

const BatchesPage = () => {
  const [mockBatches] = useState([
    { id: "123", status: "In Transit", qualityScore: 84, createdAt: "2024-03-05", berryType: "Strawberries" },
    { id: "124", status: "Delivered", qualityScore: 92, createdAt: "2024-03-04", berryType: "Blueberries" },
  ]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Batch Management
          </h1>
          <Button 
            onClick={() => window.location.href = "/batches/create"}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-lg flex items-center gap-2"
          >
            <span>+</span> Create New Batch
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-2xl">
            <h3 className="text-sm text-gray-400">Total Batches</h3>
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              23
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-2xl">
            <h3 className="text-sm text-gray-400">Active Batches</h3>
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              15
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-2xl">
            <h3 className="text-sm text-gray-400">Avg Quality Score</h3>
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              84/100
            </p>
          </div>
        </div>

        <RecentBatches batches={mockBatches} />
      </div>
    </div>
  );
};

export default BatchesPage;