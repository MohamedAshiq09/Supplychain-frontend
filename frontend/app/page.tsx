"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Bot,
  BarChart2,
  Shield,
  Zap,
  Layers,
  Cpu,
  Workflow,
  Database,
  Settings,
  Globe,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("features");

  const features = [
    {
      icon: Bot,
      title: "Robotic Operations",
      desc: "Advanced AI-driven robotics with adaptive learning capabilities",
      advanced: true,
    },
    {
      icon: BarChart2,
      title: "Prediction Markets",
      desc: "Blockchain-powered forecasting with real-time token incentives",
      advanced: true,
    },
    {
      icon: Shield,
      title: "Smart Contracts",
      desc: "Automated task allocation, settlement, and governance",
      advanced: true,
    },
    {
      icon: Zap,
      title: "Real-time Analytics",
      desc: "Comprehensive performance tracking and optimization",
      advanced: true,
    },
    {
      icon: Layers,
      title: "Multi-Layer Architecture",
      desc: "Scalable, modular design with inter-layer communication",
      advanced: false,
    },
    {
      icon: Cpu,
      title: "AI Integration",
      desc: "Machine learning models for predictive maintenance",
      advanced: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-white">
      {/* Gradient Header */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-r from-blue-800/20 to-purple-800/20 blur-[200px] opacity-50"></div>

      {/* Hero Section */}
      <div className="relative z-10 pt-[10vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Badge
              variant="outline"
              className="mb-4 border-blue-500 text-3xl  text-blue-400"
            >
              Next-Gen Supply Chain Technology
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-600">
              Autonomous Supply Chain Ecosystem
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Revolutionizing logistics through blockchain, robotics, and
              AI-powered prediction markets
            </p>
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Launch Platform <Rocket className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-blue-500 text-blue-500 hover:bg-blue-950/30"
              >
                Explore Technology <Globe className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Interactive Features Section */}
        <div className="py-16 bg-gray-900/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-gray-800 mb-8">
                <TabsTrigger value="features" className="text-lg">
                  Platform Features
                </TabsTrigger>
                <TabsTrigger value="technology" className="text-lg">
                  Technology Stack
                </TabsTrigger>
              </TabsList>
              <TabsContent value="features">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {features.map((feature, index) => (
                    <Card
                      key={index}
                      className="bg-gray-800/70 border-gray-700 hover:border-blue-500 transition-all duration-300 group"
                    >
                      <CardContent className="pt-6">
                        <div className="mb-4 text-blue-500 group-hover:scale-110 transition-transform">
                          <feature.icon className="h-10 w-10" />
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-xl font-semibold text-white">
                            {feature.title}
                          </h3>
                          {feature.advanced && (
                            <Badge
                              variant="secondary"
                              className="bg-blue-500/20 text-blue-400"
                            >
                              Advanced
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-400">{feature.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="technology">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Database,
                      title: "Blockchain Infrastructure",
                      desc: "Sonic blockchain with Injective IAGentKit integration",
                    },
                    {
                      icon: Workflow,
                      title: "Smart Contract Layer",
                      desc: "Solidity/Rust-based autonomous contract systems",
                    },
                    {
                      icon: Settings,
                      title: "AI & Machine Learning",
                      desc: "Predictive models for supply chain optimization",
                    },
                  ].map((tech, index) => (
                    <Card
                      key={index}
                      className="bg-gray-800/70 border-gray-700 hover:border-green-500 transition-all duration-300"
                    >
                      <CardContent className="pt-6">
                        <div className="mb-4 text-green-500">
                          <tech.icon className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {tech.title}
                        </h3>
                        <p className="text-gray-400">{tech.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Transform Your Supply Chain Today
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Join the autonomous revolution. Leverage cutting-edge blockchain,
              robotics, and AI technologies.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-blue-500 text-blue-500 hover:bg-blue-950/30"
              >
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
