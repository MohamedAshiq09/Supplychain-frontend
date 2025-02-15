"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  BarChart2,
  Box,
  Cpu,
  Database,
  Globe,
  LineChart,
  PackageSearch,
  Settings,
  Shield,
  Tablet,
  ThermometerSun,
  Truck,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import Link from "next/link"; // Import Link from next/link

// Mock data for charts
const performanceData = [
  { name: "Jan", value: 85 },
  { name: "Feb", value: 78 },
  { name: "Mar", value: 92 },
  { name: "Apr", value: 88 },
  { name: "May", value: 95 },
  { name: "Jun", value: 89 },
];

const predictionData = [
  { name: "Mon", actual: 65, predicted: 62 },
  { name: "Tue", actual: 72, predicted: 70 },
  { name: "Wed", actual: 68, predicted: 71 },
  { name: "Thu", actual: 78, predicted: 76 },
  { name: "Fri", actual: 82, predicted: 80 },
  { name: "Sat", actual: 75, predicted: 74 },
  { name: "Sun", actual: 70, predicted: 72 },
];

// Sidebar links configuration
const sidebarLinks = [
  { icon: Box, label: "Overview", href: "/dashboard" }, // Updated href
  { icon: Truck, label: "Supply Chain", href: "/supply-chain" }, // Updated href
  { icon: Globe, label: "IoT Network", href: "/iot" }, // Updated href
  { icon: Shield, label: "Smart Contracts", href: "/smart-contracts" }, // Updated href
  { icon: BarChart2, label: "Predictions", href: "/predictions" }, // Updated href
  { icon: Users, label: "Stakeholders", href: "/stakeholders" }, // Updated href
  { icon: Settings, label: "Settings", href: "/settings" }, // Updated href
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  // Stats cards data
  const statsCards = [
    {
      title: "Active Sensors",
      value: "2,847",
      change: "+12.5%",
      icon: Tablet,
      color: "text-blue-500",
    },
    {
      title: "Prediction Accuracy",
      value: "94.2%",
      change: "+2.1%",
      icon: LineChart,
      color: "text-green-500",
    },
    {
      title: "Smart Contracts",
      value: "1,286",
      change: "+5.4%",
      icon: Database,
      color: "text-purple-500",
    },
    {
      title: "Processing Power",
      value: "12.4 TH/s",
      change: "+8.7%",
      icon: Cpu,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950">
      <Header />

      <div className="flex h-screen pt-[11vh]">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 bg-opacity-60 backdrop-blur-lg p-4 border-r  border-gray-800">
          <nav className="space-y-2 mt-6">
            {sidebarLinks.map((link) => (
              <Link href={link.href} key={link.label} passHref>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6 mt-6">
          <div className="max-w-7xl mx-auto">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {statsCards.map((stat) => (
                <Card
                  key={stat.title}
                  className="bg-gray-800/50 border-gray-700"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">{stat.title}</p>
                        <h3 className="text-2xl font-bold text-white mt-1">
                          {stat.value}
                        </h3>
                        <span className="text-green-400 text-sm">
                          {stat.change}
                        </span>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tabs Section */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-gray-800 border-gray-700 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="predictions">Predictions</TabsTrigger>
                <TabsTrigger value="iot">IoT Network</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Performance Chart */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">
                        System Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsLineChart data={performanceData}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#374151"
                            />
                            <XAxis dataKey="name" stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#1F2937",
                                border: "none",
                                borderRadius: "0.375rem",
                                color: "#fff",
                              }}
                            />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="#3B82F6"
                              strokeWidth={2}
                            />
                          </RechartsLineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Active Tasks */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Active Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            task: "Route Optimization",
                            progress: 75,
                            icon: Truck,
                            color: "bg-blue-500",
                          },
                          {
                            task: "Temperature Monitoring",
                            progress: 92,
                            icon: ThermometerSun,
                            color: "bg-green-500",
                          },
                          {
                            task: "Inventory Tracking",
                            progress: 60,
                            icon: PackageSearch,
                            color: "bg-purple-500",
                          },
                          {
                            task: "Smart Contract Execution",
                            progress: 85,
                            icon: Shield,
                            color: "bg-orange-500",
                          },
                        ].map((task) => (
                          <div key={task.task} className="space-y-2">
                            <div className="flex items-center justify-between text-gray-300">
                              <div className="flex items-center gap-2">
                                <task.icon className="h-5 w-5" />
                                <span>{task.task}</span>
                              </div>
                              <span>{task.progress}%</span>
                            </div>
                            <Progress
                              value={task.progress}
                              className={task.color}
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="predictions">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Prediction Accuracy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={predictionData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#374151"
                          />
                          <XAxis dataKey="name" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1F2937",
                              border: "none",
                              borderRadius: "0.375rem",
                              color: "#fff",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="actual"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            name="Actual"
                          />
                          <Line
                            type="monotone"
                            dataKey="predicted"
                            stroke="#10B981"
                            strokeWidth={2}
                            name="Predicted"
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="iot">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Temperature Sensors",
                      value: "1,247",
                      status: "Active",
                      icon: ThermometerSun,
                    },
                    {
                      title: "Location Trackers",
                      value: "842",
                      status: "Active",
                      icon: Globe,
                    },
                    {
                      title: "Smart Containers",
                      value: "758",
                      status: "Connected",
                      icon: Box,
                    },
                  ].map((sensor) => (
                    <Card
                      key={sensor.title}
                      className="bg-gray-800/50 border-gray-700"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <sensor.icon className="h-8 w-8 text-blue-500" />
                          <span className="text-green-400 text-sm px-2 py-1 bg-green-400/20 rounded">
                            {sensor.status}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-white">
                          {sensor.title}
                        </h3>
                        <p className="text-3xl font-bold text-white mt-2">
                          {sensor.value}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
