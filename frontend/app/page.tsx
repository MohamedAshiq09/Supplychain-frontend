import React from "react";
import { ArrowRight, BarChart2, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Next-Gen Supply Chain Automation
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Combining robotic operations with token-based incentives for
              optimal performance
            </p>
            <div className="flex justify-center gap-4">
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-blue-700"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Intelligent Supply Chain Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="mb-4 text-blue-600">
                  {/* //<Robot className="h-8 w-8" /> */}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Robotic Operations
                </h3>
                <p className="text-gray-600">
                  Advanced robotics with AI-driven decision making for efficient
                  task execution
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="mb-4 text-blue-600">
                  <BarChart2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Prediction Markets
                </h3>
                <p className="text-gray-600">
                  Token-based forecasting for supply chain optimization and risk
                  management
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="mb-4 text-blue-600">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Contracts</h3>
                <p className="text-gray-600">
                  Automated task allocation and instant settlement through
                  blockchain
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="mb-4 text-blue-600">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Real-time Analytics
                </h3>
                <p className="text-gray-600">
                  Live performance tracking and dynamic optimization of
                  operations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Task Allocation</h3>
              <p className="text-gray-600">
                Robots receive tasks based on their performance history and
                token stakes
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Market Predictions</h3>
              <p className="text-gray-600">
                Stakeholders place tokens on predicted outcomes to optimize
                routing
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Reward Distribution
              </h3>
              <p className="text-gray-600">
                Successful task completion and accurate predictions earn token
                rewards
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Supply Chain?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join the future of automated supply chain management today
          </p>
          <Button className="bg-white text-blue-900 hover:bg-blue-50">
            Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
