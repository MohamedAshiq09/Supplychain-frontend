// MetricCard.tsx
"use client";
import { motion } from "framer-motion";

interface MetricCardProps {
  title: string;
  value: string;
  trend?: string;
}

export const MetricCard = ({ title, value, trend }: MetricCardProps) => (
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