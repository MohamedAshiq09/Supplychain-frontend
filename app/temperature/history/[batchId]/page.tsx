"use client";

type TemperatureRecord = {
  timestamp: string;
  temperature: number;
  status: "optimal" | "breach";
  txHash: string;
};

import { useRouter } from "next/navigation";
import { TemperatureChart } from "@/components/temperature/chart";
import { TemperatureTable } from "@/components/temperature/table";
import { FiArrowLeft } from "react-icons/fi";

const TemperatureHistoryPage = ({ params }: { params: { batchId: string } }) => {
  const router = useRouter();

  const mockData: TemperatureRecord[] = [
    { timestamp: "2024-03-05 12:00", temperature: 2.0, status: "optimal", txHash: "0x9cca...1b57" },
    { timestamp: "2024-03-05 13:00", temperature: 2.5, status: "optimal", txHash: "0xc4c8...ff53" },
    { timestamp: "2024-03-05 14:00", temperature: 3.8, status: "breach", txHash: "0x65bb...70ad" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push("/features")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Temperature History for Batch #{params.batchId}
          </h1>
        </div>

        <div className="space-y-8">
          <TemperatureChart data={mockData} />
          <TemperatureTable data={mockData} />
        </div>
      </div>
    </div>
  );
};

export default TemperatureHistoryPage;