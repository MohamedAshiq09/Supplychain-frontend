"use client";

import React, { useState } from "react";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Header = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 w-full h-[11vh] bg-gray-950 bg-opacity-60 backdrop-blur-lg shadow-lg z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
        <div className="flex items-center">
          <div className="text-blue-500 font-bold text-2xl flex items-center gap-2">
            <Bot className="h-8 w-8" />
            RoboChain
          </div>
        </div>

        <nav className="hidden md:flex space-x-8">
          <div
            onMouseEnter={() => setHoveredLink("home")}
            onMouseLeave={() => setHoveredLink(null)}
            className="relative flex items-center"
          >
            <a
              href="#"
              className="text-gray-300 hover:text-white transition duration-300 text-lg"
            >
              Home
            </a>
          </div>
          <div
            onMouseEnter={() => setHoveredLink("dashboard")}
            onMouseLeave={() => setHoveredLink(null)}
            className="relative flex items-center"
          >
            <a
              href="#"
              className="text-gray-300 hover:text-white transition duration-300 text-lg"
            >
              Dashboard
            </a>
          </div>
          <div
            onMouseEnter={() => setHoveredLink("markets")}
            onMouseLeave={() => setHoveredLink(null)}
            className="relative flex items-center"
          >
            <a
              href="#"
              className="text-gray-300 hover:text-white transition duration-300 text-lg"
            >
              Markets
            </a>
          </div>
        </nav>

        <div className="hidden md:flex items-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Connect Wallet
          </Button>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        initial={{ x: "-100%" }}
        animate={{
          x:
            hoveredLink === "home"
              ? "-25%"
              : hoveredLink === "dashboard"
              ? "0%"
              : hoveredLink === "markets"
              ? "25%"
              : "0%",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </header>
  );
};

export default Header;
