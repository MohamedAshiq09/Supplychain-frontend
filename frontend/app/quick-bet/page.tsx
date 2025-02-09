"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaEthereum,
  FaArrowLeft,
  FaBolt,
  FaChartLine,
  FaHistory,
  FaTrophy,
} from "react-icons/fa";
import Header from "../components/Header";

interface QuickBetFormData {
  amount: string;
  team: string;
  betType: "win" | "draw" | "firstGoal" | "custom";
}

export default function QuickBet() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<QuickBetFormData>({
    amount: "",
    team: "",
    betType: "win",
  });

  const matchName = searchParams?.get("match") || "Match";
  const team1 = searchParams?.get("team1") || "Team 1";
  const team2 = searchParams?.get("team2") || "Team 2";

  const betTypes = [
    { id: "win", label: "Win", icon: <FaTrophy />, multiplier: "2.0x" },
    { id: "draw", label: "Draw", icon: <FaHistory />, multiplier: "3.5x" },
    {
      id: "firstGoal",
      label: "First Goal",
      icon: <FaBolt />,
      multiplier: "2.8x",
    },
    {
      id: "custom",
      label: "Custom Bet",
      icon: <FaChartLine />,
      multiplier: "Varies",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.betType === "custom") {
      router.push(
        `/create-your-own-bet?match=${matchName}&team1=${team1}&team2=${team2}`
      );
    } else {
      router.push("/place-your-bet");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-purple-400 mb-8 hover:text-purple-300 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <FaArrowLeft /> Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="cyber-border bg-gray-900/90 backdrop-blur-md rounded-xl p-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Quick Bet
            </h1>
            <h2 className="text-xl text-purple-300 mb-8">{matchName}</h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Team Selection */}
              <div className="space-y-4">
                <label className="block text-gray-300 mb-2 text-lg">
                  Select Team
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[team1, team2].map((team) => (
                    <motion.button
                      key={team}
                      type="button"
                      onClick={() => setFormData({ ...formData, team })}
                      className={`p-6 rounded-lg border ${
                        formData.team === team
                          ? "border-purple-500 bg-purple-500/20"
                          : "border-gray-700 hover:border-purple-500/50"
                      } transition-all`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {team}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Bet Type Selection */}
              <div className="space-y-4">
                <label className="block text-gray-300 mb-2 text-lg">
                  Bet Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {betTypes.map((type) => (
                    <motion.button
                      key={type.id}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, betType: type.id as any })
                      }
                      className={`p-6 rounded-lg border ${
                        formData.betType === type.id
                          ? "border-purple-500 bg-purple-500/20"
                          : "border-gray-700 hover:border-purple-500/50"
                      } transition-all`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-2xl text-purple-400">
                          {type.icon}
                        </span>
                        <span className="font-semibold">{type.label}</span>
                        <span className="text-sm text-gray-400">
                          Multiplier: {type.multiplier}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <label className="block text-gray-300 text-lg">
                  Bet Amount (ETH)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="w-full bg-gray-800 rounded-lg px-4 py-3 border border-gray-700 focus:border-purple-500 focus:outline-none text-lg"
                    step="0.01"
                    min="0"
                    placeholder="Enter amount"
                  />
                  <FaEthereum className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                </div>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg py-4 px-6 font-semibold text-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaBolt />
                {formData.betType === "custom"
                  ? "Create Custom Bet"
                  : "Place Quick Bet"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
