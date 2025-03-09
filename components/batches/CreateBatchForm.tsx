import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FiX } from "react-icons/fi";

export const CreateBatchForm = ({ onCancel }: { onCancel?: () => void }) => {
  const [berryType, setBerryType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Creating batch with type: ${berryType}`);
    onCancel?.();
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          New Batch
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <FiX className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Berry Type
          </label>
          <select
            value={berryType}
            onChange={(e) => setBerryType(e.target.value)}
            className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            required
          >
            <option value="">Select Berry Type</option>
            <option value="Strawberries">Strawberries</option>
            <option value="Blueberries">Blueberries</option>
            <option value="Raspberries">Raspberries</option>
            <option value="Blackberries">Blackberries</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-700 px-6 py-3"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3"
          >
            Create Batch
          </Button>
        </div>
      </form>
    </div>
  );
};