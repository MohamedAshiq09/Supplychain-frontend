"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Thermometer,
  Bot,
  Globe,
  ScrollText,
  LineChart,
  Zap,
  Clock,
  Box,
  MapPin,
  Warehouse,
  Leaf,
  Coins,
  GanttChartSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HomePage = () => {
  const features = [
    {
      icon: Thermometer,
      title: "Smart Cold Chain Monitoring",
      desc: "End-to-end IoT tracking with automated temperature adjustments"
    },
    {
      icon: GanttChartSquare,
      title: "AI Demand Forecasting",
      desc: "Prediction markets analyzing 15+ variables for accurate ordering"
    },
    {
      icon: ScrollText,
      title: "Auto-Executing Contracts",
      desc: "Blockchain smart contracts that trigger payments upon delivery conditions"
    },
    {
      icon: Bot,
      title: "Automated Handling",
      desc: "Robotic systems maintaining optimal storage/retrieval patterns"
    },
    {
      icon: Globe,
      title: "DAO Governance",
      desc: "Stakeholder voting on network parameters and upgrades"
    },
    {
      icon: MapPin,
      title: "Last-Mile Optimization",
      desc: "Dynamic routing with real-time quality condition tracking"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-900 to-blue-950 text-white relative overflow-hidden">
      {/* Animated Network Visualization */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        className="absolute inset-0 bg-[url('/supply-chain-visual.svg')] bg-contain bg-center bg-no-repeat"
      />

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <Badge
              variant="outline"
              className="mb-4 border-blue-500 text-lg md:text-xl text-blue-400 animate-pulse"
            >
              Decentralized Fresh Food Network
            </Badge>

            <motion.h1
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600 leading-tight"
            >
              Reinventing Fresh Produce<br className="hidden md:block" /> 
              <span className="text-blue-400">Supply Chains</span>
            </motion.h1>

            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            >
              Blockchain-coordinated network combining IoT monitoring, robotic handling, 
              and crowd-powered forecasting to eliminate fresh food waste
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-4"
            >
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg
                         transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
              >
                <Zap className="mr-2 h-5 w-5" />
                Join Network
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:border-black rounded-full px-8 py-6 text-lg transition-all hover:scale-105"
                >
                <Warehouse className="mr-2 h-5 w-5" />
                Case Studies
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Impact Metrics Section */}
      <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg py-16">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid md:grid-cols-4 gap-6 text-center">
             <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              className="p-6 border-b-4 border-emerald-500"
            >
              <div className="text-3xl font-bold text-emerald-400 mb-2">30%</div>
              <div className="text-gray-400">Reduced Transit Time</div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              className="p-6 border-b-4 border-red-500"
            >
              <div className="text-3xl font-bold text-red-400 mb-2">25%</div>
              <div className="text-gray-400">Less Food Waste</div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              className="p-6 border-b-4 border-blue-500"
            >
              <div className="text-3xl font-bold text-blue-400 mb-2">99.5%</div>
              <div className="text-gray-400">Temp Compliance</div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              className="p-6 border-b-4 border-purple-500"
            >
              <div className="text-3xl font-bold text-purple-400 mb-2">15%</div>
              <div className="text-gray-400">Margin Improvement</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-16"
          >
            <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700">
              Supply Chain Revolution
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-400 transition-all group h-full flex flex-col">
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                          <feature.icon className="h-8 w-8 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2 text-white">
                            {feature.title}
                          </h3>
                          <p className="text-gray-400">{feature.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Governance Section */}
      <div className="relative z-10 py-16 bg-gray-900/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50 }}
              whileInView={{ x: 0 }}
              className="space-y-6"
            >
              <Globe className="h-12 w-12 text-blue-400" />
              <h3 className="text-3xl font-bold">Decentralized Coordination</h3>
              <p className="text-gray-400 text-lg">
                Stakeholder-governed network with incentive-aligned:
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Farmers', 'Distributors', 'Retailers', 'Consumers'].map((role, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-gray-800 rounded-lg">
                    <Coins className="h-4 w-4 text-blue-400" />
                    <span className="text-gray-300">{role}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 50 }}
              whileInView={{ x: 0 }}
              className="bg-gray-800 p-6 rounded-xl border border-blue-500/20"
            >
              <div className="space-y-4">
                {['Automated Payments', 'Quality-based Pricing', 'Carbon Credits', 'Dispute Resolution'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 hover:bg-gray-700/50 rounded-lg">
                    <Leaf className="h-5 w-5 text-blue-400" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

