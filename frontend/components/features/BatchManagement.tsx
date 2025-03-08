// components/features/BatchManagement.tsx
"use client";
import { useState } from "react";
import { MetricCard } from "./ui/MetricCard";
import { Timeline } from "./ui/Timeline";
import { registerSupplier } from "@/lib/contracts";

// Define a proper type for supplier details
interface SupplierDetails {
  account: string;
  isRegistered: boolean;
  reputation: number;
  totalBatches: number;
}

export const BatchManagement = () => {
  const [supplierAddress, setSupplierAddress] = useState<string>("");
  // Since we're not using setSupplierDetails yet, we'll use a dummy function to satisfy the linter
  const [supplierDetails] = useState<SupplierDetails | null>(null);
  const [batchId, setBatchId] = useState<number>(0);

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

  // Uncomment when you're ready to use these functions
  /*
  // Process Recommendation
  const handleProcessRecommendation = async () => {
    try {
      const tx = await processAgentRecommendation(batchId);
      alert(`Recommendation processed! TX Hash: ${tx.hash}`);
    } catch (error) {
      console.error("Processing failed:", error);
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  // Get Supplier Details
  const handleGetSupplierDetails = async () => {
    try {
      const details = await getSupplierDetails(supplierAddress);
      setSupplierDetails(details);
    } catch (error) {
      console.error("Fetch failed:", error);
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  */

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Supplier Management
      </h2>

      {/* <AgentStatus /> */}

      <div className="grid grid-cols-3 gap-4">
        <MetricCard title="Total Suppliers" value="89" />
        <MetricCard title="Avg Reputation" value="84/100" />
        <MetricCard title="Active Batches" value="23" />
      </div>

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Supplier Actions</h3>

        <div className="space-y-4">
          <div>
            <button
              onClick={handleRegisterSupplier}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
            >
              Register Supplier
            </button>
          </div>

          <div className="space-y-2">
            <input
              type="number"
              placeholder="Enter Batch ID"
              value={batchId}
              onChange={(e) => setBatchId(Number(e.target.value))}
              className="bg-gray-700 text-white p-2 rounded-lg w-full"
            />
            {/* Uncomment when handleProcessRecommendation is implemented
            <button
              onClick={handleProcessRecommendation}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 w-full"
            >
              Process Recommendation
            </button>
            */}
          </div>

          <div className="space-y-2">
            <input
              type="text"
              placeholder="Supplier Address"
              value={supplierAddress}
              onChange={(e) => setSupplierAddress(e.target.value)}
              className="bg-gray-700 text-white p-2 rounded-lg w-full"
            />
            {/* Uncomment when handleGetSupplierDetails is implemented
            <button
              onClick={handleGetSupplierDetails}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full"
            >
              Get Supplier Details
            </button>
            */}
          </div>
        </div>

        {supplierDetails && (
          <div className="mt-4 p-4 bg-gray-700 rounded-lg">
            <h4 className="text-lg font-semibold mb-2">Supplier Details</h4>
            <p>Address: {supplierDetails.account}</p>
            <p>Registered: {supplierDetails.isRegistered ? "Yes" : "No"}</p>
            <p>Reputation: {supplierDetails.reputation.toString()}</p>
            <p>Total Batches: {supplierDetails.totalBatches.toString()}</p>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Recent Supplier Activity</h3>
        <Timeline
          items={[
            {
              time: "15m ago",
              title: "Supplier Registered",
              content: "0x1e43...d8ff • Reputation: 100",
            },
            {
              time: "2h ago",
              title: "Batch Recommendation Processed",
              content: "Batch #102 • Action: Expedite",
            },
          ]}
        />
      </div>
    </div>
  );
};
