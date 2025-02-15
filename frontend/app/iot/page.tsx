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
  Plus,
  Truck,
  Globe,
  Shield,
  BarChart2,
  Users,
  Wind,
  Sun,
  Moon,
  CloudRain,
  Search,
  MoreVertical,
  Filter,
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
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Header from "@/components/layout/Header";
import Link from "next/link";

const temperatureData = [
  { time: "00:00", temp: 22.5, humidity: 45, pressure: 1012 },
  { time: "04:00", temp: 21.8, humidity: 44, pressure: 1013 },
  { time: "08:00", temp: 23.2, humidity: 48, pressure: 1014 },
  { time: "12:00", temp: 24.5, humidity: 50, pressure: 1015 },
  { time: "16:00", temp: 25.1, humidity: 47, pressure: 1013 },
  { time: "20:00", temp: 23.8, humidity: 46, pressure: 1012 },
];

const deviceHealthData = [
  { name: "Healthy", value: 75, color: "#22C55E" },
  { name: "Warning", value: 15, color: "#EAB308" },
  { name: "Critical", value: 10, color: "#EF4444" },
];

const devices = [
  {
    id: "DEV001",
    name: "Temperature Sensor A1",
    type: "Temperature Sensor",
    location: "Warehouse A",
    status: "Active",
    battery: 85,
    signal: 92,
    lastUpdate: "2 mins ago",
    metrics: {
      temperature: "23.5°C",
      humidity: "45%",
      pressure: "1013 hPa",
    },
    icon: ThermometerSun,
    alerts: [],
  },
  {
    id: "DEV002",
    name: "Fleet Tracker V1",
    type: "Location Tracker",
    location: "Delivery Van 1",
    status: "Active",
    battery: 72,
    signal: 88,
    lastUpdate: "5 mins ago",
    metrics: {
      speed: "45 km/h",
      direction: "NE",
      distance: "127 km",
    },
    icon: MapPin,
    alerts: ["Low battery warning"],
  },
  {
    id: "DEV003",
    name: "Smart Container B2",
    type: "Smart Container",
    location: "Storage Unit B",
    status: "Warning",
    battery: 15,
    signal: 95,
    lastUpdate: "1 min ago",
    metrics: {
      fullness: "78%",
      weight: "342 kg",
      temperature: "19.2°C",
    },
    icon: Box,
    alerts: ["Critical battery level", "Temperature above threshold"],
  },
  {
    id: "DEV004",
    name: "Cold Storage Monitor",
    type: "Temperature Sensor",
    location: "Cold Storage",
    status: "Active",
    battery: 90,
    signal: 96,
    lastUpdate: "Just now",
    metrics: {
      temperature: "-18.5°C",
      humidity: "35%",
      door: "Closed",
    },
    icon: ThermometerSun,
    alerts: [],
  },
];

const sidebarLinks = [
  { icon: Box, label: "Overview", href: "/dashboard" },
  { icon: Truck, label: "Supply Chain", href: "/supply-chain" },
  { icon: Globe, label: "IoT Network", href: "/iot" },
  { icon: Shield, label: "Smart Contracts", href: "/smart-contracts" },
  { icon: BarChart2, label: "Predictions", href: "/predictions" },
  { icon: Users, label: "Stakeholders", href: "/stakeholders" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const icons = {
  sunny: Sun,
  cloudy: CloudRain,
  night: Moon,
  windy: Wind,
};

const WeatherIcon = ({ condition }: { condition: keyof typeof icons }) => {
  const Icon = icons[condition as keyof typeof icons] || Sun;
  return <Icon className="h-6 w-6 text-blue-400" />;
};

const IoTManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedDevice, setSelectedDevice] = useState<
    (typeof devices)[0] | null
  >(null);

  const handleDeviceClick = (device: (typeof devices)[0]) => {
    setSelectedDevice(device);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950">
      <Header />

      <div className="pt-[11vh] px-6 flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 bg-opacity-60 backdrop-blur-lg p-4 border-r border-gray-800">
          <div className="mb-6">
            {/* <h2 className="text-lg font-semibold text-white mb-2">Dashboard</h2> */}
            <div className="space-y-1 mt-5">
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
            </div>
          </div>

          {/* Quick Stats */}
          <div className="border-t border-gray-800 pt-6">
            <h3 className="text-sm font-medium text-gray-400 mb-4">
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">System Health</span>
                  <Badge className="bg-green-500/20 text-green-400">98%</Badge>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Active Alerts</span>
                  <Badge className="bg-yellow-500/20 text-yellow-400">7</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 px-6 mt-5">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">
                IoT Command Center
              </h1>
              <p className="text-gray-400 mt-1">
                Real-time monitoring and control
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Device
              </Button>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Environmental Monitoring */}
            <Card className="col-span-8 bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">
                    Environmental Monitoring
                  </CardTitle>
                  <div className="flex gap-2">
                    <WeatherIcon condition="sunny" />
                    <span className="text-gray-300">23°C</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={temperatureData}>
                      <defs>
                        <linearGradient
                          id="tempGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#3B82F6"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#3B82F6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
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
                      <Area
                        type="monotone"
                        dataKey="temp"
                        stroke="#3B82F6"
                        fill="url(#tempGradient)"
                        name="Temperature (°C)"
                      />
                      <Line
                        type="monotone"
                        dataKey="humidity"
                        stroke="#10B981"
                        strokeWidth={2}
                        name="Humidity (%)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Device Health Overview */}
            <Card className="col-span-4 bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Device Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceHealthData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {deviceHealthData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "none",
                          borderRadius: "0.375rem",
                          color: "#fff",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-4 mt-4">
                    {deviceHealthData.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-gray-300 text-sm">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Device List */}
            <div className="col-span-12">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white">
                      Connected Devices
                    </CardTitle>
                    <div className="flex gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search devices..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white w-64 pl-10"
                        />
                      </div>
                      <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white w-[180px]">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {devices.map((device) => (
                      <Card
                        key={device.id}
                        className="bg-gray-700/50 border-gray-600 hover:border-blue-500 transition-all duration-300 cursor-pointer"
                        onClick={() => handleDeviceClick(device)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-gray-800 rounded-lg">
                                <device.icon className="h-6 w-6 text-blue-500" />
                              </div>
                              <div>
                                <h3 className="text-white font-medium">
                                  {device.name}
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

                          <div className="mt-4 grid grid-cols-2 gap-4">
                            {Object.entries(device.metrics).map(
                              ([key, value]) => (
                                <div
                                  key={key}
                                  className="bg-gray-800/50 p-2 rounded-lg"
                                >
                                  <div className="text-xs text-gray-400">
                                    {key}
                                  </div>
                                  <div className="text-sm text-white font-medium">
                                    {value}
                                  </div>
                                </div>
                              )
                            )}
                          </div>

                          <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2 text-gray-400">
                                <Battery className="h-4 w-4" />
                                <span>Battery</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-20 h-2 bg-gray-600 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${
                                      device.battery > 70
                                        ? "bg-green-500"
                                        : device.battery > 30
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                    }`}
                                    style={{ width: `${device.battery}%` }}
                                  />
                                </div>
                                <span className="text-white">
                                  {device.battery}%
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2 text-gray-400">
                                <Signal className="h-4 w-4" />
                                <span>Signal</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-20 h-2 bg-gray-600 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-blue-500 rounded-full"
                                    style={{ width: `${device.signal}%` }}
                                  />
                                </div>
                                <span className="text-white">
                                  {device.signal}%
                                </span>
                              </div>
                            </div>
                          </div>

                          {device.alerts.length > 0 && (
                            <div className="mt-4 p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                              <div className="flex items-start gap-2">
                                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5" />
                                <div className="flex-1">
                                  <div className="text-red-400 text-sm font-medium">
                                    Alerts
                                  </div>
                                  <ul className="mt-1 text-xs text-red-300">
                                    {device.alerts.map((alert, index) => (
                                      <li key={index}>{alert}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="mt-4 flex justify-between items-center">
                            <span className="text-xs text-gray-400">
                              Last update: {device.lastUpdate}
                            </span>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:text-white"
                              >
                                <Settings className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:text-white"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Device Detail Modal */}
          {selectedDevice && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <Card className="w-full max-w-2xl bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">
                        {selectedDevice.name}
                      </CardTitle>
                      <p className="text-gray-400 mt-1">
                        {selectedDevice.location}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                      onClick={() => setSelectedDevice(null)}
                    >
                      ×
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(selectedDevice.metrics).map(
                        ([key, value]) => (
                          <div key={key} className="bg-gray-700 p-4 rounded-lg">
                            <div className="text-sm text-gray-400">{key}</div>
                            <div className="text-lg text-white font-medium mt-1">
                              {value}
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-400">
                            Battery Level
                          </div>
                          <span className="text-white">
                            {selectedDevice.battery}%
                          </span>
                        </div>
                        <div className="mt-2 h-2 bg-gray-600 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              selectedDevice.battery > 70
                                ? "bg-green-500"
                                : selectedDevice.battery > 30
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${selectedDevice.battery}%` }}
                          />
                        </div>
                      </div>

                      <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-400">
                            Signal Strength
                          </div>
                          <span className="text-white">
                            {selectedDevice.signal}%
                          </span>
                        </div>
                        <div className="mt-2 h-2 bg-gray-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${selectedDevice.signal}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {selectedDevice.alerts.length > 0 && (
                      <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                        <h4 className="text-red-400 font-medium mb-2">
                          Active Alerts
                        </h4>
                        <ul className="space-y-2">
                          {selectedDevice.alerts.map((alert, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 text-red-300"
                            >
                              <AlertTriangle className="h-4 w-4" />
                              {alert}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex justify-end gap-3">
                      <Button
                        variant="outline"
                        className="border-gray-600 text-gray-300"
                      >
                        View History
                      </Button>
                      <Button
                        variant="outline"
                        className="border-gray-600 text-gray-300"
                      >
                        Configure
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IoTManagement;
