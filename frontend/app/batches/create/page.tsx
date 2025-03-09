"use client";

import { CreateBatchForm } from "@/components/batches/CreateBatchForm";

const CreateBatchPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Create New Batch
        </h1>
        <CreateBatchForm onCancel={() => console.log('Cancel button clicked')} />
      </div>
    </div>
  );
};

export default CreateBatchPage;