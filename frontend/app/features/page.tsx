// "use client";

// import React, { useState } from "react";

// // Feature components
// const BatchManagement = () => (
//   <div>
//     <h2 className="text-2xl font-bold mb-4">Batch Management</h2>
//     <p>Create, view, and track berry batches with real-time updates.</p>
//     <ul className="mt-4 space-y-2">
//       <li>Create New Batch</li>
//       <li>View All Batches</li>
//       <li>Track Batch Status</li>
//     </ul>
//   </div>
// );

// const TemperatureMonitoring = () => (
//   <div>
//     <h2 className="text-2xl font-bold mb-4">Temperature Monitoring</h2>
//     <p>Monitor temperature in real-time and view historical data.</p>
//     <ul className="mt-4 space-y-2">
//       <li>Real-time Monitoring</li>
//       <li>Temperature History</li>
//       <li>Breach Alerts</li>
//     </ul>
//   </div>
// );

// const QualityAssessment = () => (
//   <div>
//     <h2 className="text-2xl font-bold mb-4">Quality Assessment</h2>
//     <p>Assess berry quality and predict shelf life using AI.</p>
//     <ul className="mt-4 space-y-2">
//       <li>Quality Scores</li>
//       <li>Shelf Life Predictions</li>
//       <li>AI Recommendations</li>
//     </ul>
//   </div>
// );

// const ReportingAnalytics = () => (
//   <div>
//     <h2 className="text-2xl font-bold mb-4">Reporting & Analytics</h2>
//     <p>Generate reports and analyze supply chain performance.</p>
//     <ul className="mt-4 space-y-2">
//       <li>Generate Reports</li>
//       <li>Supplier Comparison</li>
//       <li>Breach Patterns</li>
//     </ul>
//   </div>
// );

// export default function FeaturesPage() {
//   const [activeFeature, setActiveFeature] = useState("batch-management");

//   const features = [
//     { id: "batch-management", label: "Batch Management", component: <BatchManagement /> },
//     { id: "temperature-monitoring", label: "Temperature Monitoring", component: <TemperatureMonitoring /> },
//     { id: "quality-assessment", label: "Quality Assessment", component: <QualityAssessment /> },
//     { id: "reporting-analytics", label: "Reporting & Analytics", component: <ReportingAnalytics /> },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-900 text-white pt-[11vh]">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-800 p-6 fixed left-0 top-[11vh] h-[calc(100vh-11vh)]">
//         <h1 className="text-2xl font-bold mb-6">Features</h1>
//         <nav className="space-y-2">
//           {features.map((feature) => (
//             <button
//               key={feature.id}
//               onClick={() => setActiveFeature(feature.id)}
//               className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
//                 activeFeature === feature.id
//                   ? "bg-blue-600 text-white"
//                   : "text-gray-300 hover:bg-gray-700"
//               }`}
//             >
//               {feature.label}
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* Content Area */}
//       <div className="flex-1 p-8 ml-64">
//         {features.find((f) => f.id === activeFeature)?.component}
//       </div>
//     </div>
//   );
// }



"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getBatchDetails, createBatch, recordTemperature } from "../../lib/contracts";


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
  const [batchId, setBatchId] = useState<number>(0);
  const [batchDetails, setBatchDetails] = useState<any>(null);
  const [newBatchType, setNewBatchType] = useState<string>("Strawberry");

  // Fetch batch details
  const fetchBatchDetails = async () => {
    const details = await getBatchDetails(batchId);
    setBatchDetails(details);
  };

  // Create a new batch
  const handleCreateBatch = async () => {
    const tx = await createBatch(newBatchType);
    alert(`Batch created successfully! TX Hash: ${tx.hash}`);
  };

  // Record temperature
  const handleRecordTemperature = async () => {
    const temperature = 2.5; // Example temperature
    const location = "Cold Storage"; // Example location
    const tx = await recordTemperature(batchId, temperature, location);
    alert(`Temperature recorded successfully! TX Hash: ${tx.hash}`);
  };

  useEffect(() => {
    if (batchId) {
      fetchBatchDetails();
    }
  }, [batchId]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Active Batches
      </h2>

      {/* Agent Status */}
      <AgentStatus />

      {/* Batch Creation Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard title="Total Batches" value="103" />
        <MetricCard title="Avg Creation Time" value="12.13s" />
        <MetricCard title="Avg Gas Cost" value="0.00189 SNC" />
        <MetricCard title="Success Rate" value="100%" />
      </div>

      {/* Create New Batch */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Create New Batch</h3>
        <input
          type="text"
          placeholder="Enter Berry Type"
          value={newBatchType}
          onChange={(e) => setNewBatchType(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded-lg mb-2"
        />
        <button
          onClick={handleCreateBatch}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Create Batch
        </button>
      </div>

      {/* Fetch Batch Details */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Fetch Batch Details</h3>
        <input
          type="number"
          placeholder="Enter Batch ID"
          value={batchId}
          onChange={(e) => setBatchId(Number(e.target.value))}
          className="bg-gray-700 text-white p-2 rounded-lg mb-2"
        />
        <button
          onClick={fetchBatchDetails}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Fetch Details
        </button>
        {batchDetails && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Batch Details</h4>
            <p>Batch ID: {batchDetails.batchId}</p>
            <p>Berry Type: {batchDetails.berryType}</p>
            <p>Quality Score: {batchDetails.qualityScore}</p>
          </div>
        )}
      </div>

      {/* Record Temperature */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Record Temperature</h3>
        <button
          onClick={handleRecordTemperature}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Record Temperature
        </button>
      </div>

      {/* Recent Batch Timeline */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Recent Batch Activity</h3>
        <Timeline items={[
          {
            time: "2m ago",
            title: "Batch #103 Created",
            content: "Strawberry • 0x2b73...c481"
          },
          {
            time: "15m ago",
            title: "Batch #102 Completed",
            content: "6 temp recordings • 72h shelf life"
          }
        ]}/>
      </div>
    </div>
  );
};
// Temperature Data for Graph
const temperatureData = [
  { time: "00:00", temp: 2.0 },
  { time: "00:15", temp: 2.5 },
  { time: "00:30", temp: 3.0 },
  { time: "00:45", temp: 3.5 },
  { time: "01:00", temp: 2.8 },
  { time: "01:15", temp: 2.2 },
];

const TemperatureMonitoring = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      Temperature Analysis
    </h2>
    
    {/* Agent Status */}
    <AgentStatus />

    {/* Current Status Grid */}
    <div className="grid grid-cols-3 gap-4">
      <StatusIndicator 
        title="Batch #102 Current Temp"
        value="2.2°C"
        status="optimal"
        location="Delivery Center"
      />
      <StatusIndicator 
        title="Batch #0 Current Temp"
        value="3.8°C"
        status="warning"
        location="Delivery Center"
      />
      <BreachCounter 
        totalReadings={79}
        breaches={30}
        percentage="38%"
      />
    </div>

    {/* Temperature Graph */}
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Temperature History</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={temperatureData}>
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

    {/* Recent Temperature Readings Table */}
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Recent Temperature Recordings</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left text-sm text-gray-400">Time</th>
              <th className="text-left text-sm text-gray-400">Batch</th>
              <th className="text-left text-sm text-gray-400">Temp</th>
              <th className="text-left text-sm text-gray-400">Location</th>
              <th className="text-left text-sm text-gray-400">TX Hash</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2">11.14s</td>
              <td className="py-2">#0</td>
              <td className="py-2">3.8°C</td>
              <td className="py-2">Delivery</td>
              <td className="py-2 text-blue-400">0x9cca...1b57</td>
            </tr>
            <tr>
              <td className="py-2">10.88s</td>
              <td className="py-2">#0</td>
              <td className="py-2">3.1°C</td>
              <td className="py-2">Delivery</td>
              <td className="py-2 text-blue-400">0xc4c8...ff53</td>
            </tr>
            <tr>
              <td className="py-2">11.14s</td>
              <td className="py-2">#102</td>
              <td className="py-2">2.2°C</td>
              <td className="py-2">Delivery</td>
              <td className="py-2 text-blue-400">0x65bb...70ad</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const QualityAssessment = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      Quality Control
    </h2>
    
    {/* Agent Status */}
    <AgentStatus />

    {/* Quality Score Distribution */}
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 shadow-lg">
        <h3 className="text-sm text-gray-400">Batch #102 Quality Score</h3>
        <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          100/100
        </p>
      </div>
      <div className="bg-gradient-to-br from-red-900/20 to-red-800/20 p-4 rounded-lg border border-red-700/50 shadow-lg">
        <h3 className="text-sm text-gray-400">Batch #0 Quality Score</h3>
        <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          0/100
        </p>
      </div>
    </div>

    {/* Action Recommendations */}
    <div className="bg-gradient-to-br from-red-900/20 to-red-800/20 p-4 rounded-lg border border-red-700/50 shadow-lg">
      <h3 className="text-lg font-semibold mb-2">Critical Alerts</h3>
      <AlertCard
        title="Batch #0 - Immediate Action Required"
        content="Quality score 0/100 • 38% breach rate"
        action="Reject Shipment"
        timestamp="Last assessed 2m ago"
      />
    </div>
  </div>
);

const ReportingAnalytics = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      Analytics Overview
    </h2>
    
    {/* Agent Status */}
    <AgentStatus />

    {/* System Health Metrics */}
    <div className="grid grid-cols-3 gap-4">
      <MetricCard 
        title="Total Gas Used"
        value="0.047 SNC"
        trend="+12% from last period"
      />
      <MetricCard 
        title="Avg TX Time"
        value="11.2s"
        trend="Stable"
      />
      <MetricCard 
        title="Failure Rate"
        value="1.2%"
        trend="Improving"
      />
    </div>

    {/* Compliance Report */}
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 shadow-lg">
      <h3 className="text-lg font-semibold mb-2">Audit Trail</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm">Batch #102 Final Report</p>
          <p className="text-sm text-blue-400">0x5684...4007</p>
        </div>
        <p className="text-xs text-gray-400">2024-03-05 20:45:12</p>
      </div>
    </div>
  </div>
);

export default function FeaturesPage() {
  const [activeFeature, setActiveFeature] = useState("batch-management");

  const features = [
    { id: "batch-management", label: "Batch Management", component: <BatchManagement /> },
    { id: "temperature-monitoring", label: "Temperature Monitoring", component: <TemperatureMonitoring /> },
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