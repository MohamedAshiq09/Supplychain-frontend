import { FiEye, FiTruck, FiCheckCircle, FiClock, FiAlertTriangle } from "react-icons/fi";

interface Batch {
  id: string;
  status: string;
  qualityScore: number;
  createdAt: string;
  berryType: string;
}

const RecentBatches = ({ batches }: { batches: Batch[] }) => {
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

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-2xl border-2 border-red-500">
      <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
        Recent Batches
      </h2>

      <div className="space-y-4">
        {batches.map((batch) => (
          <div
            key={batch.id}
            className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg border border-gray-600 hover:border-blue-500 transition-all"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-600 rounded-full">
                <StatusIcon status={batch.status} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">#{batch.id}</h3>
                <p className="text-sm text-gray-400">{batch.berryType}</p>
              </div>
            </div>

            <button
              onClick={() => window.location.href = `/batches/${batch.id}`}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition-all"
            >
              <FiEye className="w-4 h-4" />
              <span>View</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBatches;