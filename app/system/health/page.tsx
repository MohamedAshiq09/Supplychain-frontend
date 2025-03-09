"use client";

import {  TransactionStatus } from "@/components/system/TransactionStatus";
import { HealthMetrics } from "@/components/system/HealthMetrics";
import { FiActivity, FiServer, FiClock } from "react-icons/fi";

const SystemHealthPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            System Health Dashboard
          </h1>
          <div className="flex items-center gap-2 text-blue-400">
            <FiActivity className="w-6 h-6 animate-pulse" />
            <span className="text-sm">AI Agent: Active</span>
          </div>
        </div>

        {/* Health Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <HealthMetrics
            title="Uptime"
            value="99.9%"
            icon={<FiClock className="w-6 h-6 text-blue-400" />}
            trend="Stable"
          />
          <HealthMetrics
            title="Active Nodes"
            value="12/12"
            icon={<FiServer className="w-6 h-6 text-green-400" />}
            trend="Optimal"
          />
          <HealthMetrics
            title="Response Time"
            value="112ms"
            icon={<FiActivity className="w-6 h-6 text-purple-400" />}
            trend="Improving"
          />
        </div>

        {/* Transaction Status */}
        <TransactionStatus />
      </div>
    </div>
  );
};

export default SystemHealthPage;