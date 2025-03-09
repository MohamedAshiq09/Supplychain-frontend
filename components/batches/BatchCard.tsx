import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FiTruck, FiCheckCircle, FiClock, FiAlertTriangle } from "react-icons/fi";

interface BatchCardProps {
  id: string;
  status: string;
  qualityScore: number;
  createdAt: string;
  berryType: string;
  onView?: () => void;
}

const StatusIcon = ({ status }: { status: string }) => {
  const iconClass = "w-5 h-5 mr-2";
  switch (status.toLowerCase()) {
    case "in transit":
      return <FiTruck className={iconClass} />;
    case "delivered":
      return <FiCheckCircle className={iconClass} />;
    case "pending":
      return <FiClock className={iconClass} />;
    default:
      return <FiAlertTriangle className={iconClass} />;
  }
};

export const BatchCard = ({ id, status, qualityScore, createdAt, berryType, onView }: BatchCardProps) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-2xl hover:shadow-blue-500/10 transition-all"
  >
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            #{id}
          </h3>
          <p className="text-sm text-gray-400">{berryType}</p>
        </div>
        <span className="px-3 py-1 text-sm rounded-full bg-blue-500/20 text-blue-400 flex items-center">
          <StatusIcon status={status} />
          {status}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Quality Score</span>
          <span className={`text-lg font-semibold ${
            qualityScore > 80 ? 'text-green-400' : qualityScore > 60 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {qualityScore}/100
          </span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-500"
            style={{ width: `${qualityScore}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-400">
        <span>Created</span>
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      </div>

      <Button
        onClick={onView}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/20 transition-all"
      >
        View Details
      </Button>
    </div>
  </motion.div>
);