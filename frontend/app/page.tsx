// "use client";

// import React, { useState } from "react";
// import {
//   ArrowRight,
//   Bot,
//   BarChart2,
//   Shield,
//   Zap,
//   Layers,
//   Cpu,
//   Workflow,
//   Database,
//   Settings,
//   Globe,
//   Rocket,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// // import { Separator } from "@/components/ui/separator";

// const HomePage = () => {
//   const [activeTab, setActiveTab] = useState("features");

//   const features = [
//     {
//       icon: Bot,
//       title: "Robotic Operations",
//       desc: "Advanced AI-driven robotics with adaptive learning capabilities",
//       advanced: true,
//     },
//     {
//       icon: BarChart2,
//       title: "Prediction Markets",
//       desc: "Blockchain-powered forecasting with real-time token incentives",
//       advanced: true,
//     },
//     {
//       icon: Shield,
//       title: "Smart Contracts",
//       desc: "Automated task allocation, settlement, and governance",
//       advanced: true,
//     },
//     {
//       icon: Zap,
//       title: "Real-time Analytics",
//       desc: "Comprehensive performance tracking and optimization",
//       advanced: true,
//     },
//     {
//       icon: Layers,
//       title: "Multi-Layer Architecture",
//       desc: "Scalable, modular design with inter-layer communication",
//       advanced: false,
//     },
//     {
//       icon: Cpu,
//       title: "AI Integration",
//       desc: "Machine learning models for predictive maintenance",
//       advanced: false,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-white">
//       {/* Gradient Header */}
//       <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-r from-blue-800/20 to-purple-800/20 blur-[200px] opacity-50"></div>

//       {/* Hero Section */}
//       <div className="relative z-10 pt-[10vh]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           <div className="text-center">
//             <Badge
//               variant="outline"
//               className="mb-4 border-blue-500 text-3xl  text-blue-400"
//             >
//               Next-Gen Supply Chain Technology
//             </Badge>
//             <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-600">
//               Autonomous Supply Chain Ecosystem
//             </h1>
//             <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
//               Revolutionizing logistics through blockchain, robotics, and
//               AI-powered prediction markets
//             </p>
//             <div className="flex justify-center gap-4">
//               <Button
//                 size="lg"
//                 className="bg-blue-600 hover:bg-blue-700 text-white"
//               >
//                 Launch Platform <Rocket className="ml-2 h-5 w-5" />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="border-blue-500 text-blue-500 hover:bg-blue-950/30"
//               >
//                 Explore Technology <Globe className="ml-2 h-5 w-5" />
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Interactive Features Section */}
//         <div className="py-16 bg-gray-900/50 backdrop-blur-md">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <Tabs
//               value={activeTab}
//               onValueChange={setActiveTab}
//               className="w-full"
//             >
//               <TabsList className="grid w-full grid-cols-2 bg-gray-800 mb-8">
//                 <TabsTrigger value="features" className="text-lg">
//                   Platform Features
//                 </TabsTrigger>
//                 <TabsTrigger value="technology" className="text-lg">
//                   Technology Stack
//                 </TabsTrigger>
//               </TabsList>
//               <TabsContent value="features">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   {features.map((feature, index) => (
//                     <Card
//                       key={index}
//                       className="bg-gray-800/70 border-gray-700 hover:border-blue-500 transition-all duration-300 group"
//                     >
//                       <CardContent className="pt-6">
//                         <div className="mb-4 text-blue-500 group-hover:scale-110 transition-transform">
//                           <feature.icon className="h-10 w-10" />
//                         </div>
//                         <div className="flex justify-between items-center mb-2">
//                           <h3 className="text-xl font-semibold text-white">
//                             {feature.title}
//                           </h3>
//                           {feature.advanced && (
//                             <Badge
//                               variant="secondary"
//                               className="bg-blue-500/20 text-blue-400"
//                             >
//                               Advanced
//                             </Badge>
//                           )}
//                         </div>
//                         <p className="text-gray-400">{feature.desc}</p>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </TabsContent>
//               <TabsContent value="technology">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   {[
//                     {
//                       icon: Database,
//                       title: "Blockchain Infrastructure",
//                       desc: "Sonic blockchain with Injective IAGentKit integration",
//                     },
//                     {
//                       icon: Workflow,
//                       title: "Smart Contract Layer",
//                       desc: "Solidity/Rust-based autonomous contract systems",
//                     },
//                     {
//                       icon: Settings,
//                       title: "AI & Machine Learning",
//                       desc: "Predictive models for supply chain optimization",
//                     },
//                   ].map((tech, index) => (
//                     <Card
//                       key={index}
//                       className="bg-gray-800/70 border-gray-700 hover:border-green-500 transition-all duration-300"
//                     >
//                       <CardContent className="pt-6">
//                         <div className="mb-4 text-green-500">
//                           <tech.icon className="h-10 w-10" />
//                         </div>
//                         <h3 className="text-xl font-semibold text-white mb-2">
//                           {tech.title}
//                         </h3>
//                         <p className="text-gray-400">{tech.desc}</p>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </div>
//         </div>

//         {/* CTA Section */}
//         <div className="py-16 text-center">
//           <div className="max-w-4xl mx-auto px-4">
//             <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
//               Transform Your Supply Chain Today
//             </h2>
//             <p className="text-xl mb-8 text-gray-300">
//               Join the autonomous revolution. Leverage cutting-edge blockchain,
//               robotics, and AI technologies.
//             </p>
//             <div className="flex justify-center gap-4">
//               <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
//                 Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="border-blue-500 text-blue-500 hover:bg-blue-950/30"
//               >
//                 Request Demo
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;


// "use client";

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   ArrowRight,
//   Box,
//   Truck,
//   Shield,
//   Zap,
//   Layers,
//   Cpu,
//   Workflow,
//   Database,
//   Settings,
//   Globe,
//   Rocket,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";

// const HomePage = () => {
//   const [activeTab, setActiveTab] = useState("features");

//   const features = [
//     { icon: Box, title: "Inventory Management", desc: "Real-time tracking across global nodes" },
//     { icon: Truck, title: "Logistics AI", desc: "Self-optimizing routes & carrier matching" },
//     { icon: Shield, title: "Smart Contracts", desc: "Auto-executing supply agreements" },
//     { icon: Zap, title: "Live Monitoring", desc: "IoT-enabled condition tracking" },
//     { icon: Layers, title: "DeFi Integration", desc: "Tokenized inventory financing" },
//     { icon: Cpu, title: "Predictive AI", desc: "Demand forecasting & risk mitigation" },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-white relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.3 }}
//         transition={{ duration: 1 }}
//         className="absolute inset-0 bg-[url('/phone-mockup.svg')] bg-contain bg-no-repeat bg-center opacity-30"
//       />
      
//       {/* Floating Grid */}
//       <div className="absolute inset-0 bg-[length:50px_50px] bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]" />

//       {/* Hero Section */}
//       <div className="relative z-10 min-h-screen flex items-center">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="text-center space-y-8"
//           >
//             <Badge
//               variant="outline"
//               className="mb-4 border-blue-500 text-lg md:text-xl text-blue-400 animate-pulse"
//             >
//               Web3 Supply Chain Orchestration
//             </Badge>

//             <motion.h1
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 leading-tight"
//             >
//               Autonomous Supply<br className="hidden md:block" /> 
//               <span className="text-blue-400">Chain 3.0</span>
//             </motion.h1>

//             <motion.p
//               initial={{ y: 10, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
//             >
//               Blockchain-powered supply chain automation with AI-driven optimization
//               and decentralized governance
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4 }}
//               className="flex justify-center gap-4"
//             >
//               <Button
//                 size="lg"
//                 className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg
//                          transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
//               >
//                 <Rocket className="mr-2 h-5 w-5" />
//                 Launch Dashboard
//               </Button>
//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="border-blue-500 text-blue-500 hover:bg-blue-950/30 rounded-full px-8 py-6 text-lg
//                          transition-all hover:scale-105"
//               >
//                 <Globe className="mr-2 h-5 w-5" />
//                 Explore Network
//               </Button>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="relative z-10 pb-32">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             className="space-y-16"
//           >
//             {/* Feature Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {features.map((feature, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ y: 20, opacity: 0 }}
//                   whileInView={{ y: 0, opacity: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-blue-500 transition-all">
//                     <CardContent className="p-6">
//                       <div className="flex items-start gap-4">
//                         <div className="p-3 bg-blue-500/10 rounded-lg">
//                           <feature.icon className="h-8 w-8 text-blue-400" />
//                         </div>
//                         <div>
//                           <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                           <p className="text-gray-400">{feature.desc}</p>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Stats Banner */}
//             <motion.div
//               initial={{ scaleX: 0 }}
//               whileInView={{ scaleX: 1 }}
//               className="bg-blue-900/30 p-8 rounded-2xl backdrop-blur-lg border border-blue-500/20"
//             >
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//                 {[
//                   { value: "12K+", label: "Daily Transactions" },
//                   { value: "240+", label: "Global Nodes" },
//                   { value: "99.9%", label: "Uptime SLA" },
//                   { value: "0.5s", label: "Avg. Response" },
//                 ].map((stat, index) => (
//                   <div key={index} className="space-y-2">
//                     <div className="text-3xl font-bold text-blue-400">{stat.value}</div>
//                     <div className="text-sm text-gray-400">{stat.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Floating Phone Mockup */}
//       <motion.div
//         initial={{ x: "100vw" }}
//         animate={{ x: "-20%" }}
//         transition={{ duration: 2, type: "spring" }}
//         className="absolute top-1/4 -right-96 w-[800px] h-[800px] bg-[url('/phone-mockup.png')] bg-contain bg-no-repeat opacity-50 mix-blend-soft-light"
//       />
//     </div>
//   );
// };

// export default HomePage;

// "use client";

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Thermometer,
//   AlertCircle,
//   ShieldCheck,
//   Clock,
//   Database,
//   LineChart,
//   Zap,
//   Snowflake,
//   Box,
//   Globe
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// const HomePage = () => {
//   const features = [
//     {
//       icon: Thermometer,
//       title: "Real-Time Temperature Monitoring",
//       desc: "Continuous 0-4°C tracking with IoT sensors and blockchain recording"
//     },
//     {
//       icon: AlertCircle,
//       title: "Breach Detection & Alerts",
//       desc: "Instant notifications for temperature deviations with location tracking"
//     },
//     {
//       icon: ShieldCheck,
//       title: "Quality Certification",
//       desc: "Blockchain-verified quality scores based on cumulative temperature impact"
//     },
//     {
//       icon: Clock,
//       title: "Shelf Life Prediction",
//       desc: "AI-powered freshness forecasting using duration and severity of exposures"
//     },
//     {
//       icon: Database,
//       title: "Immutable Records",
//       desc: "Tamper-proof temperature history stored on blockchain"
//     },
//     {
//       icon: LineChart,
//       title: "Supply Chain Analytics",
//       desc: "Identify weak points in cold chain logistics with detailed reports"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-white relative overflow-hidden">
//       {/* Animated Cold Chain Visualization */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.1 }}
//         className="absolute inset-0 bg-[url('/cold-chain-visual.svg')] bg-contain bg-center bg-no-repeat"
//       />

//       {/* Hero Section */}
//       <div className="relative z-10 min-h-screen flex items-center">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="text-center space-y-8"
//           >
//             <Badge
//               variant="outline"
//               className="mb-4 border-teal-500 text-lg md:text-xl text-teal-400 animate-pulse"
//             >
//               Blockchain-Powered Cold Chain Assurance
//             </Badge>

//             <motion.h1
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-600 leading-tight"
//             >
//               Preserving Freshness<br className="hidden md:block" /> 
//               <span className="text-teal-400">From Farm to Consumer</span>
//             </motion.h1>

//             <motion.p
//               initial={{ y: 10, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
//             >
//               End-to-end cold chain monitoring solution combining IoT sensors, blockchain technology, 
//               and AI-powered quality prediction to reduce spoilage and ensure food safety
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4 }}
//               className="flex justify-center gap-4"
//             >
//               <Button
//                 size="lg"
//                 className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 py-6 text-lg
//                          transition-all hover:scale-105 shadow-lg shadow-teal-500/30"
//               >
//                 <Zap className="mr-2 h-5 w-5" />
//                 Start Monitoring
//               </Button>
//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white hover:border-black rounded-full px-8 py-6 text-lg transition-all hover:scale-105"
//                 >
//                 <Snowflake className="mr-2 h-5 w-5" />
//                 View Demo
//               </Button>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Industry Impact Section */}
//       <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-3 gap-8 text-center">
//             <motion.div
//               initial={{ scale: 0.9 }}
//               whileInView={{ scale: 1 }}
//               className="p-6 border-b-4 border-teal-500"
//             >
//               <div className="text-4xl font-bold text-teal-400 mb-2">$250B+</div>
//               <div className="text-gray-400">Global Cold Chain Market</div>
//             </motion.div>
//             <motion.div
//               initial={{ scale: 0.9 }}
//               whileInView={{ scale: 1 }}
//               className="p-6 border-b-4 border-red-500"
//             >
//               <div className="text-4xl font-bold text-red-400 mb-2">20%</div>
//               <div className="text-gray-400">Annual Perishable Losses</div>
//             </motion.div>
//             <motion.div
//               initial={{ scale: 0.9 }}
//               whileInView={{ scale: 1 }}
//               className="p-6 border-b-4 border-green-500"
//             >
//               <div className="text-4xl font-bold text-green-400 mb-2">$35B</div>
//               <div className="text-gray-400">Potential Annual Savings</div>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="relative z-10 py-16">
//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//     <motion.div
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       className="space-y-16"
//     >
//       <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-600">
//         Cold Chain Assurance Features
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {features.map((feature, index) => (
//           <motion.div
//             key={index}
//             initial={{ y: 20, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             transition={{ delay: index * 0.1 }}
//             className="h-full" // Add this for equal height
//           >
//             <Card className="bg-gray-800/50 border-gray-700 hover:border-teal-500 transition-all group h-full flex flex-col">
//               <CardContent className="p-6 flex-1 flex flex-col">
//                 <div className="flex items-start gap-4 flex-1">
//                   <div className="p-3 bg-teal-500/10 rounded-lg group-hover:bg-teal-500/20 transition-colors">
//                     <feature.icon className="h-8 w-8 text-teal-400" />
//                   </div>
//                   <div className="flex-1">
//                     {/* Changed heading color to white */}
//                     <h3 className="text-xl font-semibold mb-2 text-white">
//                       {feature.title}
//                     </h3>
//                     <p className="text-gray-400">{feature.desc}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   </div>
// </div>
//       {/* Compliance Section */}
//       <div className="relative z-10 py-16 bg-gray-900/50 backdrop-blur-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ x: -50 }}
//               whileInView={{ x: 0 }}
//               className="space-y-6"
//             >
//               <ShieldCheck className="h-12 w-12 text-teal-400" />
//               <h3 className="text-3xl font-bold">Regulatory Compliance Made Simple</h3>
//               <p className="text-gray-400 text-lg">
//                 Automated compliance reporting with blockchain-verified temperature records 
//                 that meet FDA, EU, and global food safety standards
//               </p>
//             </motion.div>
//             <motion.div
//               initial={{ x: 50 }}
//               whileInView={{ x: 0 }}
//               className="bg-gray-800 p-6 rounded-xl border border-teal-500/20"
//             >
//               <div className="space-y-4">
//                 {['FDA CFR 21', 'EU GDP Guidelines', 'HACCP', 'ISO 22000'].map((standard, i) => (
//                   <div key={i} className="flex items-center gap-3 p-3 hover:bg-gray-700/50 rounded-lg">
//                     <Box className="h-5 w-5 text-teal-400" />
//                     <span className="text-gray-300">{standard}</span>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;



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