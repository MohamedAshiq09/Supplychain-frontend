"use client";

import React from "react";
import { motion } from "framer-motion";
import { registerSupplier } from "../../lib/contracts";

// Utility Components
interface MetricCardProps {
  title: string;
  value: string;
  trend?: string;
}

const MetricCard = ({ title, value, trend }: MetricCardProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 shadow-lg"
  >
    <h3 className="text-sm text-gray-400">{title}</h3>
    <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      {value}
    </p>
    {trend && <p className="text-sm text-gray-400">{trend}</p>}
  </motion.div>
);

// Agent Status Component
const AgentStatus = () => (
  <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 p-4 rounded-lg border border-blue-700/50 shadow-lg">
    <h3 className="text-lg font-semibold">ZerePy Agent Status</h3>
    <p className="text-sm text-gray-400">All systems operational</p>
    <div className="flex items-center mt-2">
      <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
      <p className="text-sm text-gray-400">Active</p>
    </div>
  </div>
);

// Feature Components
const FeaturesPage = () => {
  // Register Supplier
  const handleRegisterSupplier = async () => {
    try {
      const tx = await registerSupplier();
      alert(`Supplier registered! TX Hash: ${tx.hash}`);
    } catch (error) {
      console.error("Registration failed:", error);
      alert(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Supplier Management
      </h2>

      <AgentStatus />

      <div className="grid grid-cols-3 gap-4">
        <MetricCard title="Total Suppliers" value="89" />
        <MetricCard title="Avg Reputation" value="84/100" />
        <MetricCard title="Active Batches" value="23" />
      </div>

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Supplier Actions</h3>

        <div className="space-y-4">
          <button
            onClick={handleRegisterSupplier}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
          >
            Register Supplier
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
