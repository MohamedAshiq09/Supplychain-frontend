import { ReactNode } from "react";

interface HealthMetricsProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend: string;
}

export const HealthMetrics = ({ title, value, icon, trend }: HealthMetricsProps) => (
  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-2xl">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-gray-700/30 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-sm text-gray-400">{title}</h3>
        <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {value}
        </p>
        <p className="text-sm text-gray-400">{trend}</p>
      </div>
    </div>
  </div>
);