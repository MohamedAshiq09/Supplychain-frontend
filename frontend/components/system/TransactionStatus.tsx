import { FiCheckCircle, FiAlertCircle, FiClock } from "react-icons/fi";

export const TransactionStatus = () => {
  const mockTransactions = [
    { id: "TX123", status: "success", time: "12:34 PM", details: "Batch #123 Created" },
    { id: "TX124", status: "pending", time: "12:35 PM", details: "Batch #124 Temperature Recorded" },
    { id: "TX125", status: "failed", time: "12:36 PM", details: "Batch #125 Quality Check Failed" },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-2xl">
      <h3 className="text-xl font-bold mb-6">Transaction Status</h3>
      <div className="space-y-4">
        {mockTransactions.map((tx) => (
          <div
            key={tx.id}
            className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg border border-gray-600 hover:border-blue-500 transition-all"
          >
            <div className="flex items-center gap-4">
              {tx.status === "success" && <FiCheckCircle className="w-6 h-6 text-green-400" />}
              {tx.status === "pending" && <FiClock className="w-6 h-6 text-yellow-400" />}
              {tx.status === "failed" && <FiAlertCircle className="w-6 h-6 text-red-400" />}
              <div>
                <h4 className="text-lg font-semibold">{tx.details}</h4>
                <p className="text-sm text-gray-400">{tx.time}</p>
              </div>
            </div>
            <span className="text-sm text-gray-400">{tx.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
};