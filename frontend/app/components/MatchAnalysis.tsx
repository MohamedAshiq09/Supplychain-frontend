"use client";

import { motion } from "framer-motion";
import {
  FaChartLine,
  FaChartBar,
  FaUsers,
  FaPercent,
  FaHistory,
} from "react-icons/fa";

interface AnalysisData {
  winProbability: number;
  recentPerformance: number;
  playerForm: number;
  crowdSentiment: number;
  historicalData: number;
}

interface MatchAnalysisProps {
  matchId: string;
  team1: string;
  team2: string;
  analysisData: AnalysisData;
}

export default function MatchAnalysis({
  matchId,
  team1,
  team2,
  analysisData,
}: MatchAnalysisProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="cyber-border bg-gradient-to-br from-gray-800/50 via-gray-900 to-gray-950 p-6 rounded-xl"
    >
      <h3 className="text-xl font-semibold mb-6 neon-text flex items-center gap-2">
        <FaChartLine className="text-purple-400" />
        AI Match Analysis
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Win Probability */}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Win Probability</span>
            <span className="text-purple-400">
              {analysisData.winProbability}%
            </span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${analysisData.winProbability}%` }}
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Recent Performance */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Recent Form</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`w-2 h-2 rounded-full ${
                    i < analysisData.recentPerformance
                      ? "bg-purple-500"
                      : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="col-span-2 grid grid-cols-3 gap-4 mt-4">
          <MetricCard
            icon={<FaUsers />}
            label="Player Form"
            value={`${analysisData.playerForm}%`}
            color="text-blue-400"
          />
          <MetricCard
            icon={<FaPercent />}
            label="Crowd Impact"
            value={`${analysisData.crowdSentiment}%`}
            color="text-purple-400"
          />
          <MetricCard
            icon={<FaHistory />}
            label="Historical Edge"
            value={`${analysisData.historicalData}%`}
            color="text-cyan-400"
          />
        </div>

        {/* Live Recommendations */}
        <div className="col-span-2 mt-6">
          <h4 className="text-lg font-semibold mb-4 text-purple-300">
            AI Recommendations
          </h4>
          <div className="space-y-3">
            {generateRecommendations(analysisData, team1, team2).map(
              (rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 text-sm text-gray-300"
                >
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  {rec}
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const MetricCard = ({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) => (
  <motion.div
    whileHover={{ y: -2 }}
    className="bg-gray-800/50 p-4 rounded-lg border border-gray-700"
  >
    <div className={`${color} mb-2`}>{icon}</div>
    <div className="text-sm text-gray-400">{label}</div>
    <div className="text-lg font-semibold text-white">{value}</div>
  </motion.div>
);

function generateRecommendations(
  data: AnalysisData,
  team1: string,
  team2: string
): string[] {
  const recommendations = [];

  if (data.winProbability > 70) {
    recommendations.push(
      `High confidence prediction: ${team1} has a strong advantage`
    );
  }

  if (data.playerForm > 80) {
    recommendations.push("Key players showing exceptional form");
  }

  if (data.crowdSentiment > 60) {
    recommendations.push(
      "Positive crowd sentiment could influence performance"
    );
  }

  if (data.historicalData > 75) {
    recommendations.push(
      `Historical data favors ${team1} in similar conditions`
    );
  }

  return recommendations;
}
