"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {  Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CompleteShipmentPageProps {
  params: { id: string };
}

const CompleteShipmentPage = ({ params }: CompleteShipmentPageProps) => {
  const router = useRouter();
  const { id: batchId } = params;

  const handleReturnToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Shipment Completed
        </h1>
        <p className="text-center mb-6">
          Batch #{batchId} has been successfully marked as completed.
        </p>
        <Button
          onClick={handleReturnToDashboard}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          Return to Dashboard
        </Button>
      </Card>
    </div>
  );
};

export default CompleteShipmentPage;