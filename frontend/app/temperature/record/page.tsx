"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TemperatureForm } from "@/components/temperature/form";
import { FiArrowLeft } from "react-icons/fi";

const RecordTemperaturePage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push("/features")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Record Temperature
          </h1>
        </div>

        <TemperatureForm />
      </div>
    </div>
  );
};

export default RecordTemperaturePage;