"use client";

import React from "react";
import { ArrowRight, Bot, BarChart2, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <div className="pt-[11vh]">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Next-Gen Supply Chain Automation
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-300">
                Combining robotic operations with token-based incentives for
                optimal performance
              </p>
              <div className="flex justify-center gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-950"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Intelligent Supply Chain Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Bot,
                  title: "Robotic Operations",
                  desc: "Advanced robotics with AI-driven decision making",
                },
                {
                  icon: BarChart2,
                  title: "Prediction Markets",
                  desc: "Token-based forecasting for optimization",
                },
                {
                  icon: Shield,
                  title: "Smart Contracts",
                  desc: "Automated task allocation and settlement",
                },
                {
                  icon: Zap,
                  title: "Real-time Analytics",
                  desc: "Live performance tracking and optimization",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors duration-300"
                >
                  <CardContent className="pt-6">
                    <div className="mb-4 text-blue-500">
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-950 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Ready to Transform Your Supply Chain?
            </h2>
            <p className="text-xl mb-8 text-gray-400">
              Join the future of automated supply chain management today
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
