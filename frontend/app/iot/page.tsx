"use client";

import React, { useState } from "react";
import {
  ThermometerSun,
  MapPin,
  Box,
  AlertTriangle,
  Settings,
  Battery,
  Signal,
  Radio,
  RefreshCcw,
  Plus,
  Truck,
  Globe,
  Shield,
  BarChart2,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import Header from "@/components/layout/Header";

// Mock data for temperature readings
const temperatureData = [
  { time: "00:00", temp: 22.5, humidity: 45 },
  { time: "04:00", temp: 21.8, humidity: 44 },
  { time: "08:00", temp: 23.2, humidity: 48 },
  { time: "12:00", temp: 24.5, humidity: 50 },
  { time: "16:00", temp: 25.1, humidity: 47 },
  { time: "20:00", temp: 23.8, humidity: 46 },
];

// Mock IoT devices data
const devices = [
  {
    id: "DEV001",
    type: "Temperature Sensor",
    location: "Warehouse A",
    status: "Active",
    battery: 85,
    signal: 92,
    lastUpdate: "2 mins ago",
    icon: ThermometerSun,
  },
  {
    id: "DEV002",
    type: "Location Tracker",
    location: "Delivery Van 1",
    status: "Active",
    battery: 72,
    signal: 88,
    lastUpdate: "5 mins ago",
    icon: MapPin,
  },
  {
    id: "DEV003",
    type: "Smart Container",
    location: "Storage Unit B",
    status: "Warning",
    battery: 15,
    signal: 95,
    lastUpdate: "1 min ago",
    icon: Box,
  },
  {
    id: "DEV004",
    type: "Temperature Sensor",
    location: "Cold Storage",
    status: "Active",
    battery: 90,
    signal: 96,
    lastUpdate: "Just now",
    icon: ThermometerSun,
  },
];

const sidebarLinks = [
  { icon: Box, label: "Overview", href: "#" },
  { icon: Truck, label: "Supply Chain", href: "#" },
  { icon: Globe, label: "IoT Network", href: "#" },
  { icon: Shield, label: "Smart Contracts", href: "#" },
  { icon: BarChart2, label: "Predictions", href: "#" },
  { icon: Users, label: "Stakeholders", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
];

const IoTManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950">
      <Header />

      <div className="pt-[11vh] px-6  flex ">
        {/* sidebar */}
        <div className="w-64 bg-gray-900 bg-opacity-60 backdrop-blur-lg p-4 border-r  border-gray-800">
          <nav className="space-y-2 mt-1">
            {sidebarLinks.map((link) => (
              <Button
                key={link.label}
                variant="ghost"
                className="w-full justify-start gap-2 text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Button>
            ))}
          </nav>
        </div>

        <div className="max-w-7xl mx-auto mt-5 ">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">
                IoT Device Management
              </h1>
              <p className="text-gray-400 mt-1">
                Monitor and manage your IoT device network
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-5 w-5 mr-2" /> Add New Device
            </Button>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              {
                title: "Total Devices",
                value: "3,847",
                icon: Radio,
                color: "text-blue-500",
              },
              {
                title: "Active Devices",
                value: "3,562",
                icon: Signal,
                color: "text-green-500",
              },
              {
                title: "Warning Status",
                value: "182",
                icon: AlertTriangle,
                color: "text-yellow-500",
              },
              {
                title: "Critical Status",
                value: "23",
                icon: AlertTriangle,
                color: "text-red-500",
              },
            ].map((stat, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.title}</p>
                      <h3 className="text-2xl font-bold text-white mt-1">
                        {stat.value}
                      </h3>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Temperature Chart */}
          <Card className="bg-gray-800/50 border-gray-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white">
                Temperature Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={temperatureData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
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
                      dataKey="temp"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      name="Temperature (°C)"
                    />
                    <Line
                      type="monotone"
                      dataKey="humidity"
                      stroke="#10B981"
                      strokeWidth={2}
                      name="Humidity (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Device List Section */}
          <Card className="bg-gray-800/50 border-gray-700 mb-4 ">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <CardTitle className="text-white">Connected Devices</CardTitle>
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                  <Input
                    placeholder="Search devices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Devices</SelectItem>
                      <SelectItem value="temperature">
                        Temperature Sensors
                      </SelectItem>
                      <SelectItem value="location">
                        Location Trackers
                      </SelectItem>
                      <SelectItem value="container">
                        Smart Containers
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {devices.map((device) => (
                  <Card
                    key={device.id}
                    className="bg-gray-700/50 border-gray-600 hover:border-blue-500 transition-all duration-300"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-800 rounded-lg">
                            <device.icon className="h-6 w-6 text-blue-500" />
                          </div>
                          <div>
                            <h3 className="text-white font-medium">
                              {device.type}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {device.location}
                            </p>
                          </div>
                        </div>
                        <Badge
                          className={`${
                            device.status === "Active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {device.status}
                        </Badge>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Battery className="h-4 w-4" />
                            <span>Battery</span>
                          </div>
                          <span className="text-white">{device.battery}%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Signal className="h-4 w-4" />
                            <span>Signal</span>
                          </div>
                          <span className="text-white">{device.signal}%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-gray-400">
                            <RefreshCcw className="h-4 w-4" />
                            <span>Last Update</span>
                          </div>
                          <span className="text-white">
                            {device.lastUpdate}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white"
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IoTManagement;
