"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useRouter } from "next/navigation";
import { FiActivity, FiCheckCircle, FiPlusCircle, FiClock, FiThermometer, FiChevronRight, FiPackage, FiEye, FiDownload, FiChevronDown, FiBox, FiFilter, FiSearch, FiBarChart2, FiShield, FiZap, FiServer, FiCheck, FiAlertTriangle, FiCpu, FiRefreshCw, FiGrid, FiDatabase, FiSettings, FiXCircle, FiAlertOctagon, FiAlertCircle, FiExternalLink, FiArrowUpRight, FiFileText, FiTrendingDown } from "react-icons/fi";
import {  TransactionStatus } from "@/components/system/TransactionStatus";
import { HealthMetrics as ImportedHealthMetrics } from "@/components/system/HealthMetrics";
import {  Card } from "@/components/ui/card";
import {  Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
// import { registerSupplier, processAgentRecommendation, getSupplierDetails } from "../../lib/contracts";
import ConnectWallet from "@/components/wallet/ConnectWallet";




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

interface TimelineItem {
  time: string;
  title: string;
  content: string;
}

const Timeline = ({ items }: { items: TimelineItem[] }) => (
  <div className="space-y-4">
    {items.map((item, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="flex items-start space-x-4"
      >
        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
        <div>
          <p className="text-sm text-gray-400">{item.time}</p>
          <p className="font-medium">{item.title}</p>
          <p className="text-sm text-gray-400">{item.content}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

interface StatusIndicatorProps {
  title: string;
  value: string;
  status: "optimal" | "warning";
  location: string;
}

const StatusIndicator = ({ title, value, status, location }: StatusIndicatorProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 shadow-lg"
  >
    <h3 className="text-sm text-gray-400">{title}</h3>
    <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      {value}
    </p>
    <p className="text-sm text-gray-400">{location}</p>
    <div className={`w-2 h-2 rounded-full mt-2 ${status === "optimal" ? "bg-green-500" : "bg-yellow-500"}`} />
  </motion.div>
);

interface BreachCounterProps {
  totalReadings: number;
  breaches: number;
  percentage: string;
}

const BreachCounter = ({ totalReadings, breaches, percentage }: BreachCounterProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 shadow-lg"
  >
    <h3 className="text-sm text-gray-400">Temperature Breaches</h3>
    <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      {breaches}/{totalReadings}
    </p>
    <p className="text-sm text-gray-400">{percentage} breach rate</p>
  </motion.div>
);

interface AlertCardProps {
  title: string;
  content: string;
  action: string;
  timestamp: string;
}

const AlertCard = ({ title, content, action, timestamp }: AlertCardProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gradient-to-br from-red-900/20 to-red-800/20 p-4 rounded-lg border border-red-700/50 shadow-lg"
  >
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-gray-400">{content}</p>
    <p className="text-sm text-red-400 mt-2">{action}</p>
    <p className="text-xs text-gray-400 mt-2">{timestamp}</p>
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
const BatchManagement = () => {
  const router = useRouter();

  const handleCreateBatch = () => {
    router.push("/batches/create");
  };

  const handleViewBatch = (batchId: string) => {
    router.push(`/batches/${batchId}`);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen relative overflow-hidden">
      {/* Neural Network Background Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="absolute top-40 left-30 w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="absolute top-60 left-20 w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="absolute top-80 left-40 w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="absolute top-20 left-50 w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="absolute top-40 right-30 w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="absolute top-60 right-20 w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="absolute top-80 right-40 w-2 h-2 bg-blue-400 rounded-full"></div>
        {/* Neural network lines */}
        <svg width="100%" height="100%" className="absolute inset-0">
          <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1" />
          <line x1="30%" y1="40%" x2="20%" y2="60%" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1" />
          <line x1="20%" y1="60%" x2="40%" y2="80%" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1" />
          <line x1="20%" y1="20%" x2="50%" y2="20%" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1" />
          <line x1="40%" y1="40%" x2="70%" y2="30%" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1" />
          <line x1="60%" y1="60%" x2="80%" y2="20%" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1" />
          <line x1="80%" y1="40%" x2="60%" y2="80%" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header with AI Status */}
        <div className="flex items-center justify-between backdrop-blur-sm bg-black/30 p-4 rounded-2xl border border-blue-900/50 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <FiBox className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Batch <span>Management</span>
              </h1>
              <p className="text-xs text-gray-400">AI-powered logistics system</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-blue-900/30 px-4 py-2 rounded-full border border-blue-700/50">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-50"></div>
              <FiActivity className="w-5 h-5 text-blue-400 relative z-10" />
            </div>
            <span className="text-blue-300 font-medium">AI Agent: Active</span>
          </div>
        </div>


        {/* Metrics Section - Smaller and more compact */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-4 border border-gray-700 relative overflow-hidden group hover:border-blue-500 transition-all backdrop-blur-sm">
            <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-blue-500/10 rounded-full blur-lg"></div>
            <h3 className="text-xs font-medium text-gray-400 mb-1">Total Batches</h3>
            <div className="flex items-end gap-1">
              <p className="text-2xl font-bold text-white">23</p>
              <span className="text-xs text-green-400 mb-1">+4.2%</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-4 border border-gray-700 relative overflow-hidden group hover:border-blue-500 transition-all backdrop-blur-sm">
            <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-blue-500/10 rounded-full blur-lg"></div>
            <h3 className="text-xs font-medium text-gray-400 mb-1">Active Batches</h3>
            <div className="flex items-end gap-1">
              <p className="text-2xl font-bold text-white">15</p>
              <span className="text-xs text-blue-400 mb-1">65%</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-4 border border-gray-700 relative overflow-hidden group hover:border-blue-500 transition-all backdrop-blur-sm">
            <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-blue-500/10 rounded-full blur-lg"></div>
            <h3 className="text-xs font-medium text-gray-400 mb-1">Quality Score</h3>
            <div className="flex items-center">
              <p className="text-2xl font-bold text-white">84</p>
              <div className="ml-2 w-full max-w-16 bg-gray-700 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-6 rounded-2xl border border-blue-700/30 shadow-lg backdrop-blur-sm mb-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <FiBox className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold text-blue-300">BatchAI Processing</h3>
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                  Processing
                </span>
              </div>
              
              {/* Cool Animated Graph - Visual Element */}
              <div className="h-32 relative mb-4">
                {/* Simulated graph - Replace with actual chart library as needed */}
                <div className="absolute bottom-0 inset-x-0 h-px bg-gray-700"></div>
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="absolute bottom-0" style={{ left: `${i * (100/6)}%`, height: `${20 + Math.random() * 70}%`, width: '8px' }}>
                    <div className="w-full h-full bg-gradient-to-t from-blue-500 to-blue-400/30 rounded-t-sm opacity-80"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-blue-400/30 blur-sm"></div>
                  </div>
                ))}
                <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-t from-transparent to-gray-800/80 opacity-40"></div>

                {/* AI Prediction Overlay */}
                <svg className="absolute inset-0" width="100%" height="100%">
                  <path 
                    d="M0,100 C50,70 100,90 150,40 C200,60 250,30 300,50" 
                    stroke="rgba(16, 185, 129, 0.7)" 
                    strokeWidth="2" 
                    strokeDasharray="5,5" 
                    fill="none"
                  />
                </svg>
              </div>
              
              <div className="text-xs text-gray-400 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-blue-900/40 text-blue-400 rounded-full">AI Analysis: Batch Processing Trends</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Section - More compact */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleCreateBatch}
            className="group relative bg-gradient-to-r from-blue-600 to-blue-500 p-4 rounded-lg border border-blue-400/30 shadow-lg hover:shadow-blue-500/20 transition-all overflow-hidden flex items-center"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-md group-hover:bg-white/20 transition-all">
                <FiPlusCircle className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-bold">Create New Batch</h3>
                <p className="text-xs text-blue-200">AI-assisted setup</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-blue-400/10 rounded-full blur-xl"></div>
            {/* Cool highlight effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
          <button
            onClick={() => handleViewBatch("123")}
            className="group relative bg-gradient-to-r from-gray-800/50 to-blue-900/20 p-4 rounded-lg border border-gray-700 hover:border-blue-500 shadow-lg transition-all overflow-hidden flex items-center"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-md group-hover:bg-blue-500/20 transition-all">
                <FiEye className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-bold">View Batch Details</h3>
                <p className="text-xs text-gray-400">Analyze batches</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-blue-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            {/* Cool highlight effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </div>

        {/* Recent Batches Section with AI integration */}
        <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-gray-700/50 p-6 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
          
          <div className="flex items-center justify-between mb-4 relative">
            <h2 className="text-sm font-bold">Recent Batches</h2>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs text-blue-400">Live Updates</span>
            </div>
          </div>
          
          <div className="space-y-2 relative">
            <div
              onClick={() => handleViewBatch("123")}
              className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-800/50 to-black/50 rounded-lg border border-gray-700 hover:border-blue-500 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                  <FiPackage className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Batch #123</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Strawberries</span>
                    <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                    <span className="text-xs px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded-full">In Transit</span>
                  </div>
                </div>
              </div>
              <div className="relative group-hover:translate-x-1 transition-transform">
                <FiChevronRight className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
                <div className="absolute -inset-1 scale-x-0 group-hover:scale-100 transition-transform h-px w-4 bg-blue-500/50"></div>
              </div>
            </div>
            
            <div
              onClick={() => handleViewBatch("124")}
              className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-800/50 to-black/50 rounded-lg border border-gray-700 hover:border-blue-500 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                  <FiPackage className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Batch #124</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Blueberries</span>
                    <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                    <span className="text-xs px-1.5 py-0.5 bg-green-500/10 text-green-400 rounded-full">Delivered</span>
                  </div>
                </div>
              </div>
              <div className="relative group-hover:translate-x-1 transition-transform">
                <FiChevronRight className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
                <div className="absolute -inset-1 scale-x-0 group-hover:scale-100 transition-transform h-px w-4 bg-blue-500/50"></div>
              </div>
            </div>
            
            {/* AI Insights Bar */}
            <div className="mt-4 pt-4 border-t border-gray-700/50 flex items-start gap-2">
              <div className="p-1 mt-0.5 bg-blue-900/30 rounded-full">
                <FiBox className="w-3 h-3 text-blue-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-blue-400 font-medium">AI Insight:</span>
                </div>
                <p className="text-xs text-gray-300 mt-1">
                  Batch processing efficiency has increased by 12% this week. Recommending optimization for Strawberry shipments based on predictive analysis.
                </p>
              </div>
            </div>
            
            {/* Quick access buttons row */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-700/50">
              <button className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-800/80 to-black/80 rounded-md p-3 hover:bg-blue-500/10 transition-colors group">
                <FiFilter className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                <span className="text-xs mt-1 text-gray-400 group-hover:text-blue-400 transition-colors">Filter</span>
              </button>
              <button className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-800/80 to-black/80 rounded-md p-3 hover:bg-blue-500/10 transition-colors group">
                <FiSearch className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                <span className="text-xs mt-1 text-gray-400 group-hover:text-blue-400 transition-colors">Search</span>
              </button>
              <button className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-800/80 to-black/80 rounded-md p-3 hover:bg-blue-500/10 transition-colors group">
                <FiDownload className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                <span className="text-xs mt-1 text-gray-400 group-hover:text-blue-400 transition-colors">Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const TemperatureTracking = () => {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen relative overflow-hidden">
      {/* AI Neural Network Background Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="absolute top-40 left-30 w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="absolute top-60 left-20 w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="absolute top-80 left-40 w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="absolute top-20 left-50 w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="absolute top-40 right-30 w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="absolute top-60 right-20 w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="absolute top-80 right-40 w-2 h-2 bg-blue-400 rounded-full"></div>
        {/* Neural network lines */}
        <svg width="100%" height="100%" className="absolute inset-0">
          <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1" />
          <line x1="30%" y1="40%" x2="20%" y2="60%" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1" />
          <line x1="20%" y1="60%" x2="40%" y2="80%" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1" />
          <line x1="20%" y1="20%" x2="50%" y2="20%" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1" />
          <line x1="40%" y1="40%" x2="70%" y2="30%" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1" />
          <line x1="60%" y1="60%" x2="80%" y2="20%" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1" />
          <line x1="80%" y1="40%" x2="60%" y2="80%" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header with AI Status */}
        <div className="flex items-center justify-between backdrop-blur-sm bg-black/30 p-4 rounded-2xl border border-blue-900/50">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Temperature Tracking
            </h2>
            <p className="text-gray-400 text-sm">AI-powered monitoring system</p>
          </div>
          
          <div className="flex items-center gap-3 bg-blue-900/30 px-4 py-2 rounded-full border border-blue-700/50">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-50"></div>
              <FiActivity className="w-5 h-5 text-blue-400 relative z-10" />
            </div>
            <span className="text-blue-300 font-medium">AI Agent: Active</span>
          </div>
        </div>

        {/* AI Assistant Panel */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-6 rounded-2xl border border-blue-700/30 shadow-lg backdrop-blur-sm">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <FiCpu className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-blue-300">TempAI Assistant</h3>
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                  Online
                </span>
              </div>
              <p className="text-gray-300 mb-4">
                All systems are operating at optimal efficiency. Temperature sensors are calibrated and monitoring 24 data points across your facility.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-black/30 p-3 rounded-lg border border-blue-900/30">
                  <p className="text-xs text-gray-400">Active Sensors</p>
                  <p className="text-xl font-mono font-bold text-blue-400">24</p>
                </div>
                <div className="bg-black/30 p-3 rounded-lg border border-blue-900/30">
                  <p className="text-xs text-gray-400">Average Temp</p>
                  <p className="text-xl font-mono font-bold text-teal-400">2.4°C</p>
                </div>
                <div className="bg-black/30 p-3 rounded-lg border border-blue-900/30">
                  <p className="text-xs text-gray-400">Last Check</p>
                  <p className="text-xl font-mono font-bold text-purple-400">2min</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <FiCheckCircle className="w-5 h-5 text-green-400" />
                <div className="flex-1 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-full"></div>
                <span className="text-xs text-gray-400">100% System Integrity</span>
              </div>
            </div>
          </div>
        </div>

        {/* Temperature Tracking Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => router.push("/temperature/record")}
            className="group relative backdrop-blur-sm bg-gradient-to-br from-blue-900/30 to-blue-800/10 p-6 rounded-2xl border border-blue-700/30 shadow-lg cursor-pointer hover:border-blue-500/60 hover:shadow-blue-500/10 transition-all overflow-hidden"
          >
            {/* Animated glow effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity"></div>
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-blue-900/70 rounded-lg flex items-center justify-center group-hover:bg-blue-800 transition-colors">
                <FiPlusCircle className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold group-hover:text-blue-300 transition-colors">Record Temperature</h3>
                <p className="text-sm text-gray-400">AI will analyze and categorize new readings</p>
              </div>
            </div>
            
            {/* Animated circuit lines */}
            <svg width="100%" height="100%" className="absolute inset-0 opacity-30 pointer-events-none">
              <path d="M20,80 L40,80 L60,60 L180,60" stroke="rgba(96, 165, 250, 0.3)" strokeWidth="1" fill="none" />
              <path d="M20,100 L180,100" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1" fill="none" />
            </svg>
          </div>
          
          <div
            onClick={() => router.push("/temperature/history/123")}
            className="group relative backdrop-blur-sm bg-gradient-to-br from-purple-900/30 to-purple-800/10 p-6 rounded-2xl border border-purple-700/30 shadow-lg cursor-pointer hover:border-purple-500/60 hover:shadow-purple-500/10 transition-all overflow-hidden"
          >
            {/* Animated glow effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity"></div>
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-purple-900/70 rounded-lg flex items-center justify-center group-hover:bg-purple-800 transition-colors">
                <FiClock className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold group-hover:text-purple-300 transition-colors">View History</h3>
                <p className="text-sm text-gray-400">AI predictive analytics and pattern detection</p>
              </div>
            </div>
            
            {/* Animated circuit lines */}
            <svg width="100%" height="100%" className="absolute inset-0 opacity-30 pointer-events-none">
              <path d="M20,80 L40,80 L60,60 L180,60" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1" fill="none" />
              <path d="M20,100 L180,100" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" fill="none" />
            </svg>
          </div>
        </div>

        {/* Recent Temperature Recordings */}
        <div className="backdrop-blur-sm bg-gradient-to-br from-gray-900/70 to-black/70 p-6 rounded-2xl border border-gray-700/50 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Recent Temperature Recordings</h3>
            <div className="text-xs text-gray-400 flex items-center gap-2">
              <FiRefreshCw className="w-4 h-4" />
              <span>AI Auto-refresh: 5 min</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div
              onClick={() => router.push("/temperature/history/123")}
              className="group flex justify-between items-center p-4 bg-black/30 rounded-xl border border-gray-800 hover:border-blue-700/50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-cyan-900 rounded-lg flex items-center justify-center">
                    <FiThermometer className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-black"></div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-semibold group-hover:text-blue-300 transition-colors">Batch #123</h4>
                    <span className="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full border border-green-900/50">Optimal</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-gray-400">2.2°C</p>
                    <div className="flex items-center gap-1 text-xs text-blue-400">
                      <FiCpu className="w-3 h-3" />
                      <span>AI Verified</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right text-xs text-gray-500">
                  <div>Last check: 5m ago</div>
                  <div>By: TempAI</div>
                </div>
                <FiChevronRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
              </div>
            </div>
            
            <div
              onClick={() => router.push("/temperature/history/124")}
              className="group flex justify-between items-center p-4 bg-black/30 rounded-xl border border-gray-800 hover:border-red-700/50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-900 to-orange-900 rounded-lg flex items-center justify-center">
                    <FiThermometer className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-black animate-pulse"></div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-semibold group-hover:text-red-300 transition-colors">Batch #124</h4>
                    <span className="text-xs bg-red-900/30 text-red-400 px-2 py-0.5 rounded-full border border-red-900/50">Alert</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-gray-400">3.8°C</p>
                    <div className="flex items-center gap-1 text-xs text-red-400">
                      <FiAlertTriangle className="w-3 h-3" />
                      <span>Overheated</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right text-xs text-gray-500">
                  <div>Last check: 2m ago</div>
                  <div>By: TempAI</div>
                </div>
                <FiChevronRight className="w-5 h-5 text-gray-500 group-hover:text-red-400 transition-colors" />
              </div>
            </div>
          </div>
          
          {/* AI Insights */}
          <div className="mt-6 pt-4 border-t border-gray-800">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <FiZap className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 font-medium">AI Insight:</span>
            </div>
            <p className="text-sm text-gray-300">
              Temperature trends show 97% stability over the past 24 hours. Batch #124 requires attention - AI has dispatched automated cooling protocols.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SystemHealthPage = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen relative overflow-hidden">
      {/* AI Neural Network Background Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full"></div>
        <div className="absolute top-40 left-30 w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="absolute top-60 left-20 w-2 h-2 bg-cyan-400 rounded-full"></div>
        <div className="absolute top-80 left-40 w-2 h-2 bg-teal-400 rounded-full"></div>
        <div className="absolute top-20 right-40 w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="absolute top-40 right-30 w-2 h-2 bg-purple-400 rounded-full"></div>
        <div className="absolute top-60 right-20 w-2 h-2 bg-cyan-400 rounded-full"></div>
        <div className="absolute top-80 right-40 w-2 h-2 bg-teal-400 rounded-full"></div>
        {/* Neural network lines */}
        <svg width="100%" height="100%" className="absolute inset-0">
          <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1" />
          <line x1="30%" y1="40%" x2="20%" y2="60%" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1" />
          <line x1="20%" y1="60%" x2="40%" y2="80%" stroke="rgba(45, 212, 191, 0.2)" strokeWidth="1" />
          <line x1="20%" y1="20%" x2="50%" y2="20%" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1" />
          <line x1="40%" y1="40%" x2="70%" y2="30%" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1" />
          <line x1="60%" y1="60%" x2="80%" y2="20%" stroke="rgba(45, 212, 191, 0.2)" strokeWidth="1" />
          <line x1="80%" y1="40%" x2="60%" y2="80%" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto p-6 pt-12 space-y-8">
        {/* Header with AI Agent Status */}
        <div className="flex items-center justify-between backdrop-blur-sm bg-black/30 p-5 rounded-2xl border border-purple-900/50">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              System Health Dashboard
            </h1>
            <p className="text-gray-400 text-sm">AI-powered monitoring and management</p>
          </div>
          
          <div className="flex items-center gap-3 bg-purple-900/30 px-4 py-2 rounded-full border border-purple-700/50">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-50"></div>
              <FiCpu className="w-5 h-5 text-purple-400 relative z-10" />
            </div>
            <span className="text-purple-300 font-medium">SysAI: Active & Learning</span>
          </div>
        </div>

        {/* AI Assistant Panel */}
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-6 rounded-2xl border border-purple-700/30 shadow-lg backdrop-blur-sm">
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <FiCpu className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-purple-300">SysAI Assistant</h3>
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                  Learning
                </span>
              </div>
              <p className="text-gray-300 mb-4">
                All critical systems are functioning optimally. I've detected a 12% improvement in response times over the last 24 hours and have automatically optimized server resources accordingly.
              </p>
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="bg-black/30 p-3 rounded-lg border border-purple-900/30">
                  <p className="text-xs text-gray-400">System Uptime</p>
                  <p className="text-xl font-mono font-bold text-purple-400">99.9%</p>
                </div>
                <div className="bg-black/30 p-3 rounded-lg border border-blue-900/30">
                  <p className="text-xs text-gray-400">Active Nodes</p>
                  <p className="text-xl font-mono font-bold text-blue-400">12/12</p>
                </div>
                <div className="bg-black/30 p-3 rounded-lg border border-cyan-900/30">
                  <p className="text-xs text-gray-400">Response Time</p>
                  <p className="text-xl font-mono font-bold text-cyan-400">112ms</p>
                </div>
                <div className="bg-black/30 p-3 rounded-lg border border-teal-900/30">
                  <p className="text-xs text-gray-400">AI Confidence</p>
                  <p className="text-xl font-mono font-bold text-teal-400">98.2%</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <FiZap className="w-5 h-5 text-yellow-400" />
                <div className="flex-1 h-1.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-full relative">
                  <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xs text-gray-400">AI-Driven Optimization Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Health Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Server Performance */}
          <div className="backdrop-blur-sm bg-gradient-to-br from-blue-900/20 to-blue-800/10 p-6 rounded-2xl border border-blue-700/30 shadow-lg overflow-hidden relative group">
            {/* Animated glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity"></div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-900/70 rounded-lg flex items-center justify-center">
                <FiServer className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-300">Server Performance</h3>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-400">AI-optimized resources</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="relative pt-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs text-gray-400">CPU Load</div>
                  <div className="text-xs text-blue-400 font-medium">42%</div>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full">
                  <div className="w-5/12 h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full relative">
                    <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-blue-500/50 to-cyan-500/50 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              <div className="relative pt-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs text-gray-400">Memory Usage</div>
                  <div className="text-xs text-blue-400 font-medium">68%</div>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full">
                  <div className="w-8/12 h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full relative">
                    <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-blue-500/50 to-cyan-500/50 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              <div className="relative pt-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs text-gray-400">Network I/O</div>
                  <div className="text-xs text-blue-400 font-medium">54%</div>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full">
                  <div className="w-6/12 h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full relative">
                    <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-blue-500/50 to-cyan-500/50 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-blue-900/30">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-gray-400">
                  <FiRefreshCw className="w-3 h-3" />
                  <span>Last updated: 43s ago</span>
                </div>
                <div className="flex items-center gap-1 text-cyan-400">
                  <FiCpu className="w-3 h-3" />
                  <span>AI-optimized</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Security Status */}
          <div className="backdrop-blur-sm bg-gradient-to-br from-purple-900/20 to-purple-800/10 p-6 rounded-2xl border border-purple-700/30 shadow-lg overflow-hidden relative group">
            {/* Animated glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity"></div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-900/70 rounded-lg flex items-center justify-center">
                <FiShield className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-300">Security Status</h3>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-400">AI threat detection active</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-black/30 p-3 rounded-lg border border-purple-900/30">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">Threat Level</p>
                  <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/30">Low</span>
                </div>
                <p className="text-xl font-mono font-bold text-purple-400">1/10</p>
              </div>
              <div className="bg-black/30 p-3 rounded-lg border border-purple-900/30">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">Blocked Events</p>
                  <FiCheckCircle className="w-3 h-3 text-green-400" />
                </div>
                <p className="text-xl font-mono font-bold text-purple-400">247</p>
              </div>
            </div>
            
            <div className="bg-black/30 p-3 rounded-lg border border-purple-900/30 mb-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-gray-400">Active Protections</p>
                <div className="text-xs text-purple-400 flex items-center gap-1">
                  <FiZap className="w-3 h-3" />
                  <span>AI Enhanced</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-blue-900/30 text-blue-400 text-xs rounded-full">Firewall</span>
                <span className="px-2 py-0.5 bg-teal-900/30 text-teal-400 text-xs rounded-full">DDOS</span>
                <span className="px-2 py-0.5 bg-purple-900/30 text-purple-400 text-xs rounded-full">ML Predict</span>
              </div>
            </div>
            
            <div className="mt-2 pt-3 border-t border-purple-900/30">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-gray-400">
                  <FiRefreshCw className="w-3 h-3" />
                  <span>Continuous scanning</span>
                </div>
                <div className="flex items-center gap-1 text-purple-400">
                  <FiCpu className="w-3 h-3" />
                  <span>AI-protected</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Service Health */}
          <div className="backdrop-blur-sm bg-gradient-to-br from-teal-900/20 to-teal-800/10 p-6 rounded-2xl border border-teal-700/30 shadow-lg overflow-hidden relative group">
            {/* Animated glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-cyan-600 opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity"></div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-teal-900/70 rounded-lg flex items-center justify-center">
                <FiActivity className="w-6 h-6 text-teal-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-teal-300">Service Health</h3>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-400">All services operational</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between p-2.5 bg-black/30 rounded-lg border border-teal-900/30 group">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-300">API Gateway</span>
                </div>
                <div className="text-xs text-gray-400">
                  <span className="text-teal-400">112ms</span> response
                </div>
              </div>
              
              <div className="flex items-center justify-between p-2.5 bg-black/30 rounded-lg border border-teal-900/30 group">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-300">Database Cluster</span>
                </div>
                <div className="text-xs text-gray-400">
                  <span className="text-teal-400">98ms</span> response
                </div>
              </div>
              
              <div className="flex items-center justify-between p-2.5 bg-black/30 rounded-lg border border-teal-900/30 group">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-300">AI Processing</span>
                </div>
                <div className="text-xs text-gray-400">
                  <span className="text-teal-400">145ms</span> response
                </div>
              </div>
            </div>
            
            <div className="mt-2 pt-3 border-t border-teal-900/30">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-gray-400">
                  <FiRefreshCw className="w-3 h-3" />
                  <span>Updated 28s ago</span>
                </div>
                <div className="flex items-center gap-1 text-teal-400">
                  <FiCpu className="w-3 h-3" />
                  <span>AI-monitored</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent System Activity */}
        <div className="backdrop-blur-sm bg-gradient-to-br from-gray-900/70 to-black/70 p-6 rounded-2xl border border-gray-700/50 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Recent System Activity</h3>
            <div className="text-xs text-gray-400 flex items-center gap-2">
              <FiRefreshCw className="w-4 h-4" />
              <span>AI Auto-refresh: 2 min</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="group flex justify-between items-center p-4 bg-black/30 rounded-xl border border-gray-800 hover:border-green-700/50 transition-all">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-900 to-teal-900 rounded-lg flex items-center justify-center">
                    <FiDatabase className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-black"></div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-semibold group-hover:text-green-300 transition-colors">Database Optimization</h4>
                    <span className="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full border border-green-900/50">Automated</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-gray-400">Query performance improved by 18%</p>
                    <div className="flex items-center gap-1 text-xs text-blue-400">
                      <FiCpu className="w-3 h-3" />
                      <span>AI Initiated</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right text-xs text-gray-500">
                <div>2m ago</div>
                <div>By: SysAI</div>
              </div>
            </div>
            
            <div className="group flex justify-between items-center p-4 bg-black/30 rounded-xl border border-gray-800 hover:border-blue-700/50 transition-all">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg flex items-center justify-center">
                    <FiGrid className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border border-black"></div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-semibold group-hover:text-blue-300 transition-colors">Resource Allocation</h4>
                    <span className="text-xs bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded-full border border-blue-900/50">Predictive</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-gray-400">Scaled computing resources for predicted traffic increase</p>
                    <div className="flex items-center gap-1 text-xs text-purple-400">
                      <FiBarChart2 className="w-3 h-3" />
                      <span>AI Predicted</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right text-xs text-gray-500">
                <div>15m ago</div>
                <div>By: SysAI</div>
              </div>
            </div>
            
            <div className="group flex justify-between items-center p-4 bg-black/30 rounded-xl border border-gray-800 hover:border-yellow-700/50 transition-all">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-900 to-orange-900 rounded-lg flex items-center justify-center">
                    <FiAlertTriangle className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border border-black"></div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-semibold group-hover:text-yellow-300 transition-colors">Unusual Traffic Pattern</h4>
                    <span className="text-xs bg-yellow-900/30 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-900/50">Resolved</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-gray-400">Detected and mitigated unusual access pattern</p>
                    <div className="flex items-center gap-1 text-xs text-orange-400">
                      <FiShield className="w-3 h-3" />
                      <span>AI Defended</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right text-xs text-gray-500">
                <div>43m ago</div>
                <div>By: SysAI</div>
              </div>
            </div>
          </div>
          
          {/* AI Insights */}
          <div className="mt-6 pt-4 border-t border-gray-800">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <FiZap className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 font-medium">AI Insight:</span>
            </div>
            <p className="text-sm text-gray-300">
              Based on current traffic patterns, I've identified an opportunity to optimize cached resources that could improve response times by an additional 8-12%. Would you like me to implement this optimization automatically?
            </p>
            <div className="mt-3 flex items-center gap-3">
              <button className="px-3 py-1.5 bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 text-sm rounded-lg border border-purple-600/50 transition-colors">
                Approve Optimization
              </button>
              <button className="px-3 py-1.5 bg-gray-800/50 hover:bg-gray-800 text-gray-400 text-sm rounded-lg border border-gray-700 transition-colors">
                Review Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for rendering individual health metrics (can be used if needed)
interface LocalHealthMetricsProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}

const LocalHealthMetrics = ({ title, value, icon, trend }: LocalHealthMetricsProps) => {
  interface TrendColorProps {
    trend: string;
  }

  const getTrendColor = ({ trend }: TrendColorProps): string => {
    switch(trend.toLowerCase()) {
      case 'stable': return 'text-blue-400';
      case 'optimal': return 'text-green-400';
      case 'improving': return 'text-purple-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-5 rounded-xl border border-gray-700/50">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="text-xl font-medium">{title}</h3>
        </div>
        <div className={`text-sm ${getTrendColor({ trend })}`}>{trend}</div>
      </div>
      <p className="text-3xl font-bold mt-3">{value}</p>
    </div>
  );
};

const QualityAssessment = () => {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen relative overflow-hidden">
      {/* AI Neural Network Background Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full"></div>
        <div className="absolute top-40 left-30 w-2 h-2 bg-purple-400 rounded-full"></div>
        <div className="absolute top-60 left-20 w-2 h-2 bg-purple-400 rounded-full"></div>
        <div className="absolute top-80 left-40 w-2 h-2 bg-purple-400 rounded-full"></div>
        <div className="absolute top-20 left-50 w-2 h-2 bg-purple-400 rounded-full"></div>
        <div className="absolute top-40 right-30 w-2 h-2 bg-purple-400 rounded-full"></div>
        <div className="absolute top-60 right-20 w-2 h-2 bg-purple-400 rounded-full"></div>
        <div className="absolute top-80 right-40 w-2 h-2 bg-purple-400 rounded-full"></div>
        {/* Neural network lines */}
        <svg width="100%" height="100%" className="absolute inset-0">
          <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />
          <line x1="30%" y1="40%" x2="20%" y2="60%" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />
          <line x1="20%" y1="60%" x2="40%" y2="80%" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />
          <line x1="20%" y1="20%" x2="50%" y2="20%" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />
          <line x1="40%" y1="40%" x2="70%" y2="30%" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />
          <line x1="60%" y1="60%" x2="80%" y2="20%" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />
          <line x1="80%" y1="40%" x2="60%" y2="80%" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header with AI Status */}
        <div className="flex items-center justify-between backdrop-blur-sm bg-black/30 p-4 rounded-2xl border border-purple-900/50">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Quality Assessment
            </h2>
            <p className="text-gray-400 text-sm">AI-powered quality control system</p>
          </div>
          
          <div className="flex items-center gap-3 bg-purple-900/30 px-4 py-2 rounded-full border border-purple-700/50">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-50"></div>
              <FiActivity className="w-5 h-5 text-purple-400 relative z-10" />
            </div>
            <span className="text-purple-300 font-medium">AI Agent: Active</span>
          </div>
        </div>

        {/* AI Assistant Panel */}
        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-6 rounded-2xl border border-purple-700/30 shadow-lg backdrop-blur-sm">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <FiCpu className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-purple-300">QualityAI Assistant</h3>
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                  Online
                </span>
              </div>
              <p className="text-gray-300 mb-4">
                All quality assessment systems are operational. AI quality verification is monitoring 16 production lines with real-time analysis and defect detection.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-black/30 p-3 rounded-lg border border-purple-900/30">
                  <p className="text-xs text-gray-400">Active Batches</p>
                  <p className="text-xl font-mono font-bold text-purple-400">16</p>
                </div>
                <div className="bg-black/30 p-3 rounded-lg border border-purple-900/30">
                  <p className="text-xs text-gray-400">Avg Quality</p>
                  <p className="text-xl font-mono font-bold text-pink-400">94.2%</p>
                </div>
                <div className="bg-black/30 p-3 rounded-lg border border-purple-900/30">
                  <p className="text-xs text-gray-400">Last Scan</p>
                  <p className="text-xl font-mono font-bold text-fuchsia-400">3min</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <FiAlertTriangle className="w-5 h-5 text-red-400" />
                <div className="flex-1 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full">
                  <div className="h-full w-1/5 bg-red-500 rounded-full"></div>
                </div>
                <span className="text-xs text-gray-400">1 Critical Alert</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Assessment Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => router.push("/quality/scan")}
            className="group relative backdrop-blur-sm bg-gradient-to-br from-purple-900/30 to-purple-800/10 p-6 rounded-2xl border border-purple-700/30 shadow-lg cursor-pointer hover:border-purple-500/60 hover:shadow-purple-500/10 transition-all overflow-hidden"
          >
            {/* Animated glow effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity"></div>
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-purple-900/70 rounded-lg flex items-center justify-center group-hover:bg-purple-800 transition-colors">
                <FiSearch className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold group-hover:text-purple-300 transition-colors">Run Quality Scan</h3>
                <p className="text-sm text-gray-400">AI will analyze product quality in real-time</p>
              </div>
            </div>
            
            {/* Animated circuit lines */}
            <svg width="100%" height="100%" className="absolute inset-0 opacity-30 pointer-events-none">
              <path d="M20,80 L40,80 L60,60 L180,60" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1" fill="none" />
              <path d="M20,100 L180,100" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" fill="none" />
            </svg>
          </div>
          
          <div
            onClick={() => router.push("/quality/reports")}
            className="group relative backdrop-blur-sm bg-gradient-to-br from-pink-900/30 to-pink-800/10 p-6 rounded-2xl border border-pink-700/30 shadow-lg cursor-pointer hover:border-pink-500/60 hover:shadow-pink-500/10 transition-all overflow-hidden"
          >
            {/* Animated glow effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity"></div>
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-pink-900/70 rounded-lg flex items-center justify-center group-hover:bg-pink-800 transition-colors">
                <FiBarChart2 className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold group-hover:text-pink-300 transition-colors">Quality Reports</h3>
                <p className="text-sm text-gray-400">AI trend analysis and predictive quality insights</p>
              </div>
            </div>
            
            {/* Animated circuit lines */}
            <svg width="100%" height="100%" className="absolute inset-0 opacity-30 pointer-events-none">
              <path d="M20,80 L40,80 L60,60 L180,60" stroke="rgba(236, 72, 153, 0.3)" strokeWidth="1" fill="none" />
              <path d="M20,100 L180,100" stroke="rgba(236, 72, 153, 0.2)" strokeWidth="1" fill="none" />
            </svg>
          </div>
        </div>

        {/* Quality Scores Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="backdrop-blur-sm bg-gradient-to-br from-green-900/20 to-green-800/10 p-6 rounded-2xl border border-green-700/30 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-900/70 rounded-lg flex items-center justify-center">
                <FiCheck className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Batch #102</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full border border-green-900/50">Perfect</span>
                  <span className="text-xs text-gray-400">Last scan: 5m ago</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-400">Quality Score</span>
                  <span className="text-sm font-semibold text-green-400">100/100</span>
                </div>
                <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-400">Error Rate</span>
                  <span className="text-sm font-semibold text-green-400">0%</span>
                </div>
                <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-400">Consistency</span>
                  <span className="text-sm font-semibold text-green-400">100%</span>
                </div>
                <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-green-400">
                <FiCpu className="w-3 h-3" />
                <span>AI Certified</span>
              </div>
              <button className="text-xs bg-black/30 px-3 py-1 rounded-full border border-green-700/50 text-green-400 hover:bg-green-900/30 transition-colors">
                View Details
              </button>
            </div>
          </div>
          
          <div className="backdrop-blur-sm bg-gradient-to-br from-red-900/20 to-red-800/10 p-6 rounded-2xl border border-red-700/30 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-900/70 rounded-lg flex items-center justify-center">
                <FiAlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Batch #0</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-red-900/30 text-red-400 px-2 py-0.5 rounded-full border border-red-900/50 animate-pulse">Critical</span>
                  <span className="text-xs text-gray-400">Last scan: 2m ago</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-400">Quality Score</span>
                  <span className="text-sm font-semibold text-red-400">0/100</span>
                </div>
                <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-400">Error Rate</span>
                  <span className="text-sm font-semibold text-red-400">38%</span>
                </div>
                <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                  <div className="h-full w-2/5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-400">Consistency</span>
                  <span className="text-sm font-semibold text-red-400">12%</span>
                </div>
                <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                  <div className="h-full w-1/12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-red-400">
                <FiShield className="w-3 h-3" />
                <span>Reject Recommended</span>
              </div>
              <button className="text-xs bg-red-900/30 px-3 py-1 rounded-full border border-red-700/50 text-red-400 hover:bg-red-800/30 transition-colors">
                Take Action
              </button>
            </div>
          </div>
        </div>

        {/* AI Analysis and Actions */}
        <div className="backdrop-blur-sm bg-gradient-to-br from-gray-900/70 to-black/70 p-6 rounded-2xl border border-gray-700/50 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">AI Quality Analysis</h3>
            <div className="text-xs text-gray-400 flex items-center gap-2">
              <FiRefreshCw className="w-4 h-4" />
              <span>AI Auto-analysis: 3 min</span>
            </div>
          </div>
          
          <div className="bg-red-900/20 p-4 rounded-xl border border-red-700/30 mb-6 animate-pulse">
            <div className="flex items-center gap-3 mb-2">
              <FiAlertOctagon className="w-5 h-5 text-red-400" />
              <h4 className="font-semibold text-red-300">Critical Alert: Batch #0</h4>
            </div>
            <p className="text-sm text-gray-300 mb-3">
              AI analysis detected significant quality issues with Batch #0. Immediate action is required to prevent further production of defective items.
            </p>
            <div className="flex items-center gap-3">
              <button className="bg-red-900/40 hover:bg-red-900/60 text-red-300 text-sm px-4 py-2 rounded-lg border border-red-700/50 transition-colors flex items-center gap-2">
                <FiXCircle className="w-4 h-4" />
                <span>Reject Batch</span>
              </button>
              <button className="bg-black/40 hover:bg-black/60 text-gray-300 text-sm px-4 py-2 rounded-lg border border-gray-700/50 transition-colors flex items-center gap-2">
                <FiAlertCircle className="w-4 h-4" />
                <span>Schedule Inspection</span>
              </button>
            </div>
          </div>
          
          {/* AI Insights */}
          <div className="pt-4 border-t border-gray-800">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <FiZap className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 font-medium">AI Insight:</span>
            </div>
            <p className="text-sm text-gray-300">
              Anomaly detected in production line 3. Quality variance increased by 32% in the last hour. AI prediction model suggests a calibration issue in sensor module B-7.
            </p>
            <div className="mt-3 flex items-center justify-between">
              <div className="text-xs text-gray-400">Confidence: 94.2%</div>
              <button className="text-xs bg-purple-900/20 px-3 py-1 rounded-full border border-purple-700/50 text-purple-400 hover:bg-purple-900/40 transition-colors flex items-center gap-2">
                <FiSettings className="w-3 h-3" />
                <span>Auto-fix</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReportingAnalytics = () => {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen relative overflow-hidden">
      {/* AI Neural Network Background Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-teal-400 rounded-full"></div>
        <div className="absolute top-40 left-30 w-2 h-2 bg-teal-400 rounded-full"></div>
        <div className="absolute top-60 left-20 w-2 h-2 bg-teal-400 rounded-full"></div>
        <div className="absolute top-80 left-40 w-2 h-2 bg-teal-400 rounded-full"></div>
        <div className="absolute top-20 left-50 w-2 h-2 bg-teal-400 rounded-full"></div>
        <div className="absolute top-40 right-30 w-2 h-2 bg-teal-400 rounded-full"></div>
        <div className="absolute top-60 right-20 w-2 h-2 bg-teal-400 rounded-full"></div>
        <div className="absolute top-80 right-40 w-2 h-2 bg-teal-400 rounded-full"></div>
        {/* Neural network lines */}
        <svg width="100%" height="100%" className="absolute inset-0">
          <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="rgba(45, 212, 191, 0.2)" strokeWidth="1" />
          <line x1="30%" y1="40%" x2="20%" y2="60%" stroke="rgba(45, 212, 191, 0.2)" strokeWidth="1" />
          <line x1="20%" y1="60%" x2="40%" y2="80%" stroke="rgba(45, 212, 191, 0.2)" strokeWidth="1" />
          <line x1="20%" y1="20%" x2="50%" y2="20%" stroke="rgba(45, 212, 191, 0.2)" strokeWidth="1" />
          <line x1="40%" y1="40%" x2="70%" y2="30%" stroke="rgba(45, 212, 191, 0.2)" strokeWidth="1" />
          <line x1="60%" y1="60%" x2="80%" y2="20%" stroke="rgba(45, 212, 191, 0.2)" strokeWidth="1" />
          <line x1="80%" y1="40%" x2="60%" y2="80%" stroke="rgba(45, 212, 191, 0.2)" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header with AI Status */}
        <div className="flex items-center justify-between backdrop-blur-sm bg-black/30 p-4 rounded-2xl border border-teal-900/50">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
              Reporting Analytics
            </h2>
            <p className="text-gray-400 text-sm">AI-powered data analysis system</p>
          </div>
          
          <div className="flex items-center gap-3 bg-teal-900/30 px-4 py-2 rounded-full border border-teal-700/50">
            <div className="relative">
              <div className="absolute inset-0 bg-teal-400 rounded-full animate-ping opacity-50"></div>
              <FiActivity className="w-5 h-5 text-teal-400 relative z-10" />
            </div>
            <span className="text-teal-300 font-medium">AI Agent: Active</span>
          </div>
        </div>

        {/* AI Assistant Panel */}
        <div className="bg-gradient-to-r from-teal-900/20 to-emerald-900/20 p-6 rounded-2xl border border-teal-700/30 shadow-lg backdrop-blur-sm">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <FiCpu className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-teal-300">AnalyticsAI Assistant</h3>
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                  Online
                </span>
              </div>
              <p className="text-gray-300 mb-4">
                Analytics systems fully operational. AI is continuously monitoring transaction data across all networks with 99.8% accuracy and predictive modeling active.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-black/30 p-3 rounded-lg border border-teal-900/30">
                  <p className="text-xs text-gray-400">Monitored TXs</p>
                  <p className="text-xl font-mono font-bold text-teal-400">1,482</p>
                </div>
                <div className="bg-black/30 p-3 rounded-lg border border-teal-900/30">
                  <p className="text-xs text-gray-400">Processing</p>
                  <p className="text-xl font-mono font-bold text-emerald-400">97.4%</p>
                </div>
                <div className="bg-black/30 p-3 rounded-lg border border-teal-900/30">
                  <p className="text-xs text-gray-400">Refresh Rate</p>
                  <p className="text-xl font-mono font-bold text-green-400">2min</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <FiCheckCircle className="w-5 h-5 text-green-400" />
                <div className="flex-1 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full">
                  <div className="h-full w-4/5 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-xs text-gray-400">System Health: 98%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => router.push("/analytics/real-time")}
            className="group relative backdrop-blur-sm bg-gradient-to-br from-teal-900/30 to-teal-800/10 p-6 rounded-2xl border border-teal-700/30 shadow-lg cursor-pointer hover:border-teal-500/60 hover:shadow-teal-500/10 transition-all overflow-hidden"
          >
            {/* Animated glow effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity"></div>
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-teal-900/70 rounded-lg flex items-center justify-center group-hover:bg-teal-800 transition-colors">
                <FiActivity className="w-6 h-6 text-teal-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold group-hover:text-teal-300 transition-colors">Real-time Dashboard</h3>
                <p className="text-sm text-gray-400">Live transaction monitoring with AI analysis</p>
              </div>
            </div>
            
            {/* Animated circuit lines */}
            <svg width="100%" height="100%" className="absolute inset-0 opacity-30 pointer-events-none">
              <path d="M20,80 L40,80 L60,60 L180,60" stroke="rgba(45, 212, 191, 0.3)" strokeWidth="1" fill="none" />
              <path d="M20,100 L180,100" stroke="rgba(45, 212, 191, 0.2)" strokeWidth="1" fill="none" />
            </svg>
          </div>
          
          <div
            onClick={() => router.push("/analytics/reports")}
            className="group relative backdrop-blur-sm bg-gradient-to-br from-emerald-900/30 to-emerald-800/10 p-6 rounded-2xl border border-emerald-700/30 shadow-lg cursor-pointer hover:border-emerald-500/60 hover:shadow-emerald-500/10 transition-all overflow-hidden"
          >
            {/* Animated glow effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity"></div>
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-emerald-900/70 rounded-lg flex items-center justify-center group-hover:bg-emerald-800 transition-colors">
                <FiFileText className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold group-hover:text-emerald-300 transition-colors">Generate Reports</h3>
                <p className="text-sm text-gray-400">AI-generated insights and compliance documentation</p>
              </div>
            </div>
            
            {/* Animated circuit lines */}
            <svg width="100%" height="100%" className="absolute inset-0 opacity-30 pointer-events-none">
              <path d="M20,80 L40,80 L60,60 L180,60" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1" fill="none" />
              <path d="M20,100 L180,100" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1" fill="none" />
            </svg>
          </div>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="backdrop-blur-sm bg-gradient-to-br from-teal-900/20 to-teal-800/10 p-6 rounded-2xl border border-teal-700/30 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold">Total Gas Used</h3>
              <div className="w-8 h-8 bg-teal-900/50 rounded-lg flex items-center justify-center">
                <FiZap className="w-4 h-4 text-teal-400" />
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex items-end gap-2">
                <p className="text-3xl font-mono font-bold text-teal-400">0.047</p>
                <p className="text-lg font-mono font-semibold text-gray-400">SNC</p>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <FiArrowUpRight className="w-3 h-3 text-green-400" />
                <p className="text-xs text-green-400">+12% from last period</p>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>7-Day Trend</span>
                <span>AI Analysis: Normal Usage</span>
              </div>
              <div className="h-1 bg-black/50 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="backdrop-blur-sm bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 p-6 rounded-2xl border border-emerald-700/30 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold">Avg TX Time</h3>
              <div className="w-8 h-8 bg-emerald-900/50 rounded-lg flex items-center justify-center">
                <FiClock className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex items-end gap-2">
                <p className="text-3xl font-mono font-bold text-emerald-400">11.2</p>
                <p className="text-lg font-mono font-semibold text-gray-400">sec</p>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <FiCheck className="w-3 h-3 text-blue-400" />
                <p className="text-xs text-blue-400">Stable</p>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>7-Day Trend</span>
                <span>AI Analysis: Optimized</span>
              </div>
              <div className="h-1 bg-black/50 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="backdrop-blur-sm bg-gradient-to-br from-green-900/20 to-green-800/10 p-6 rounded-2xl border border-green-700/30 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold">Failure Rate</h3>
              <div className="w-8 h-8 bg-green-900/50 rounded-lg flex items-center justify-center">
                <FiAlertCircle className="w-4 h-4 text-green-400" />
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex items-end gap-2">
                <p className="text-3xl font-mono font-bold text-green-400">1.2</p>
                <p className="text-lg font-mono font-semibold text-gray-400">%</p>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <FiTrendingDown className="w-3 h-3 text-green-400" />
                <p className="text-xs text-green-400">Improving</p>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>7-Day Trend</span>
                <span>AI Analysis: Excellent</span>
              </div>
              <div className="h-1 bg-black/50 rounded-full overflow-hidden">
                <div className="h-full w-11/12 bg-gradient-to-r from-green-500 to-lime-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Trail */}
        <div className="backdrop-blur-sm bg-gradient-to-br from-gray-900/70 to-black/70 p-6 rounded-2xl border border-gray-700/50 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">AI Verified Audit Trail</h3>
            <div className="text-xs text-gray-400 flex items-center gap-2">
              <FiShield className="w-4 h-4 text-teal-400" />
              <span>Blockchain Secured</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="group flex justify-between items-center p-4 bg-black/30 rounded-xl border border-gray-800 hover:border-teal-700/50 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-900 to-emerald-900 rounded-lg flex items-center justify-center">
                    <FiFileText className="w-5 h-5 text-teal-400" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-black"></div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-semibold group-hover:text-teal-300 transition-colors">Batch #102 Final Report</h4>
                    <span className="text-xs bg-teal-900/30 text-teal-400 px-2 py-0.5 rounded-full border border-teal-900/50">Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-400">2024-03-05 20:45:12</p>
                    <div className="flex items-center gap-1 text-xs text-teal-400">
                      <FiClock className="w-3 h-3" />
                      <span>AI Certified</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right text-xs">
                  <div className="text-sm font-mono text-teal-400">0x5684...4007</div>
                  <div className="text-gray-500">Transaction Hash</div>
                </div>
                <button className="p-2 rounded-lg bg-black/30 border border-teal-700/30 hover:bg-teal-900/20 transition-colors">
                  <FiExternalLink className="w-4 h-4 text-teal-400" />
                </button>
              </div>
            </div>
            
            <div className="group flex justify-between items-center p-4 bg-black/30 rounded-xl border border-gray-800 hover:border-teal-700/50 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-900 to-emerald-900 rounded-lg flex items-center justify-center">
                    <FiFileText className="w-5 h-5 text-teal-400" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-black"></div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-semibold group-hover:text-teal-300 transition-colors">Daily System Metrics</h4>
                    <span className="text-xs bg-teal-900/30 text-teal-400 px-2 py-0.5 rounded-full border border-teal-900/50">Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-400">2024-03-05 00:00:00</p>
                    <div className="flex items-center gap-1 text-xs text-teal-400">
                      <FiClock className="w-3 h-3" />
                      <span>AI Certified</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right text-xs">
                  <div className="text-sm font-mono text-teal-400">0x7291...8532</div>
                  <div className="text-gray-500">Transaction Hash</div>
                </div>
                <button className="p-2 rounded-lg bg-black/30 border border-teal-700/30 hover:bg-teal-900/20 transition-colors">
                  <FiExternalLink className="w-4 h-4 text-teal-400" />
                </button>
              </div>
            </div>
          </div>
          
          {/* AI Insights */}
          <div className="mt-6 pt-4 border-t border-gray-800">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <FiZap className="w-4 h-4 text-teal-400" />
              <span className="text-teal-400 font-medium">AI Insight:</span>
            </div>
            <p className="text-sm text-gray-300">
              Transaction volume has increased by 27% over the past week. AI prediction models suggest optimizing gas allocation would reduce costs by approximately 14% while maintaining current performance metrics.
            </p>
            <div className="mt-3 flex items-center">
              <button className="text-xs bg-teal-900/20 px-3 py-1 rounded-full border border-teal-700/50 text-teal-400 hover:bg-teal-900/40 transition-colors flex items-center gap-2">
                <FiDownload className="w-3 h-3" />
                <span>Download Full AI Analysis</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default function FeaturesPage() {
  const [activeFeature, setActiveFeature] = useState("batch-management");

  const features = [
    { id: "batch-management", label: "Batch Management", component: <BatchManagement /> },
    { id: "temperature-tracking", label: "Temperature Tracking", component: <TemperatureTracking /> },
    { id: "system-health", label: "System Health", component: <SystemHealthPage /> },
    { id: "quality-assessment", label: "Quality Assessment", component: <QualityAssessment /> },
    { id: "reporting-analytics", label: "Reporting & Analytics", component: <ReportingAnalytics /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900 text-white pt-[11vh]">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-br from-gray-800 to-gray-900 p-6 fixed left-0 top-[11vh] h-[calc(100vh-11vh)] border-r border-gray-700 shadow-xl">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
          Features
        </h1>
        <nav className="space-y-2">
          {features.map((feature) => (
            <motion.button
              key={feature.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveFeature(feature.id)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                activeFeature === feature.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              {feature.label}
            </motion.button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 ml-64">
        {features.find((f) => f.id === activeFeature)?.component}
      </div>
    </div>
  );
}