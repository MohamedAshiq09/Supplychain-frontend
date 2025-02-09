"use client";

import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  return (
    <div
      className={`fixed top-4 right-4 z-50 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 animate-slide-in`}
    >
      {message}
    </div>
  );
};

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type?: "success" | "error" | "info";
  } | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = (link: string) => setHoveredLink(link);
  const handleMouseLeave = () => setHoveredLink(null);

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-[11vh] bg-gray-950 bg-opacity-60 backdrop-blur-lg shadow-lg z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
          {/* Logo Positioned at the Left Corner */}
          <div className="flex items-center">
            <Link
              href="/"
              className="hover:opacity-80 transition flex items-center"
            >
              <Image
                src="/images/quicklogo.jpeg"
                alt="QuickNet Logo"
                width={80}
                height={80}
                className="rounded-full"
              />
            </Link>
          </div>

          {/* Desktop Navigation Centered */}
          <nav className="hidden md:flex space-x-8 ml-28">
            <div
              onMouseEnter={() => handleMouseEnter("home")}
              onMouseLeave={handleMouseLeave}
              className="relative flex items-center"
            >
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition duration-300 text-lg relative"
              >
                Home
              </Link>
            </div>

            <div
              onMouseEnter={() => handleMouseEnter("my-bets")}
              onMouseLeave={handleMouseLeave}
              className="relative flex items-center"
            >
              <Link
                href="/my-bets"
                className="text-gray-300 hover:text-white transition duration-300 text-lg relative"
              >
                Portfolio
              </Link>
            </div>
          </nav>

          {/* Right Corner with DynamicWidget and Connect Wallet Button (visible only on small and medium screens) */}
          <div className="hidden md:flex items-center space-x-4">
            <DynamicWidget />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-300 focus:outline-none transition"
            >
              {isOpen ? (
                <XMarkIcon className="w-7 h-7" />
              ) : (
                <Bars3Icon className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {/* Fixed Gradient Line */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-300 to-transparent"
          initial={{ x: "-100%" }}
          animate={{
            x:
              hoveredLink === "home"
                ? "-25%"
                : hoveredLink === "my-bets"
                ? "25%"
                : "0%",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-40 flex flex-col items-center justify-center space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/"
              className="text-white text-3xl font-semibold tracking-wider transition-transform transform hover:scale-105"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/my-bets"
              className="text-white text-3xl font-semibold tracking-wider transition-transform transform hover:scale-105"
              onClick={toggleMenu}
            >
              My Bets
            </Link>

            {/* Dynamic Widget (Login Button) visible only in mobile */}
            <div className="mt-8">
              <DynamicWidget />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
