"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEthereum,
  FaTrophy,
  FaChartLine,
  FaArrowRight,
  FaGlobe,
  FaBolt,
  FaChartBar,
  FaUsers,
  FaRobot,
  FaShieldAlt,
  FaWallet,
  FaDiscord,
  FaTelegram,
  FaTwitter,
  FaRegCalendar,
} from "react-icons/fa";
import MatchAnalysis from "./components/MatchAnalysis";
import AiBettingSuggestions from "./components/AiBettingSuggestions";
import Header from "./components/Header";

interface Match {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  score: string;
  teams: string[];
  captains: {
    team1: {
      name: string;
      image: string;
    };
    team2: {
      name: string;
      image: string;
    };
  };
}

const BorderAnimationWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="relative group">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-300 animate-gradient-x"></div>
    <div className="relative">{children}</div>
  </div>
);

const MatchCard = ({ match }: { match: Match }) => {
  const router = useRouter();
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showBettingSuggestions, setShowBettingSuggestions] = useState(false);

  // Mock analysis data - in a real app, this would come from your AI backend
  const analysisData = {
    winProbability: 75,
    recentPerformance: 4,
    playerForm: 85,
    crowdSentiment: 70,
    historicalData: 80,
  };

  const handlePlaceBet = (suggestion?: any) => {
    // Navigate to create-your-own-bet page with match details
    router.push(
      `/create-your-own-bet?match=${match.name}&team1=${match.captains.team1.name}&team2=${match.captains.team2.name}`
    );
  };

  return (
    <BorderAnimationWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        className="cyber-border float-effect bg-gradient-to-br from-gray-800/50 via-gray-900 to-gray-950 p-6 rounded-xl backdrop-blur-sm relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                {match.name}
              </h3>
              <p className="text-gray-400 flex items-center gap-2">
                <FaGlobe className="text-purple-400" />
                {match.venue}
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`relative ${
                match.status === "Live" ? "animate-pulse" : ""
              }`}
            >
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold relative z-10 ${
                  match.status === "Live"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                }`}
              >
                {match.status}
              </span>
              {match.status === "Live" && (
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-md animate-pulse" />
              )}
            </motion.div>
          </div>

          <div className="flex justify-between  items-center mb-6">
            <div className="flex items-center gap-8">
              <motion.div
                whileHover={{ scale: 1.1, rotateZ: 5 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-md" />
                <Image
                  src={match.captains.team1.image}
                  alt={match.captains.team1.name}
                  width={60}
                  height={60}
                  className="rounded-full ring-2 ring-purple-500/50 relative z-10"
                />
              </motion.div>
              <div className="relative">
                <motion.span
                  className="text-purple-400 font-bold text-2xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  VS
                </motion.span>
                <div className="absolute inset-0 blur-xl bg-purple-500/20" />
              </div>
              <motion.div
                whileHover={{ scale: 1.1, rotateZ: -5 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-md" />
                <Image
                  src={match.captains.team2.image}
                  alt={match.captains.team2.name}
                  width={60}
                  height={60}
                  className="rounded-full ring-2 ring-purple-500/50 relative z-10"
                />
              </motion.div>
            </div>
            {match.score && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-green-500/20 rounded-lg blur-md" />
                <span className="text-green-400 font-medium bg-green-500/10 px-4 py-2 rounded-lg border border-green-500/30 relative z-10">
                  {match.score}
                </span>
              </motion.div>
            )}
          </div>

          <div className="flex justify-between items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                router.push(
                  `/quick-bet?match=${match.name}&team1=${match.captains.team1.name}&team2=${match.captains.team2.name}`
                )
              }
              className="relative group/btn flex-1 overflow-hidden bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-3 rounded-lg text-sm font-semibold"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FaBolt className="text-purple-300" />
                Quick Bet
                <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                router.push(
                  `/create-your-own-bet?match=${match.name}&team1=${match.captains.team1.name}&team2=${match.captains.team2.name}`
                )
              }
              className="relative group/btn flex-1 overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 rounded-lg text-sm font-semibold"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FaChartLine className="text-blue-300" />
                Custom Bet
                <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </div>

          <motion.button
            onClick={() => setShowAnalysis(!showAnalysis)}
            className="mt-4 w-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-2 rounded-lg text-sm font-semibold border border-purple-500/30 hover:border-purple-500/50 transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaChartLine className="text-purple-400" />
            {showAnalysis ? "Hide Analysis" : "Show AI Analysis"}
          </motion.button>

          <AnimatePresence>
            {showAnalysis && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                <MatchAnalysis
                  matchId={match.id}
                  team1={match.captains.team1.name}
                  team2={match.captains.team2.name}
                  analysisData={analysisData}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showBettingSuggestions && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setShowBettingSuggestions(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="w-full max-w-6xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <AiBettingSuggestions
                    matchId={match.id}
                    team1={match.captains.team1.name}
                    team2={match.captains.team2.name}
                    onSelectBet={(suggestion) => {
                      // Handle the selected bet
                      console.log("Selected bet:", suggestion);
                      setShowBettingSuggestions(false);
                      router.push("/place-your-bet");
                    }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </BorderAnimationWrapper>
  );
};

const FeatureCard = ({ feature, index }: { feature: any; index: number }) => (
  <BorderAnimationWrapper>
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
      }}
      className="cyber-border shine-effect relative group/feature overflow-hidden"
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 via-gray-900 to-gray-950 rounded-xl transform transition-transform duration-500 group-hover/feature:scale-105" />
      <div className="relative z-10 p-8 backdrop-blur-sm">
        <motion.div
          className="mb-6 flex justify-center"
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="absolute inset-0 blur-xl bg-purple-500/20" />
            {feature.icon}
          </div>
        </motion.div>
        <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          {feature.title}
        </h3>
        <p className="text-gray-400 relative z-10">{feature.description}</p>

        <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-purple-500/30 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-purple-500/30 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-purple-500/30 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-purple-500/30 rounded-br-lg" />
      </div>
    </motion.div>
  </BorderAnimationWrapper>
);

export default function HomePage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [matches] = useState<Match[]>([
    {
      id: "1",
      name: "India vs Australia",
      matchType: "T20",
      status: "Live",
      venue: "Melbourne Cricket Ground",
      date: "2024-01-28",
      dateTimeGMT: "2024-01-28T09:30:00.000Z",
      score: "IND: 185/4 (18.2 ov)",
      teams: ["India", "Australia"],
      captains: {
        team1: { name: "Rohit Sharma", image: "/images/rohit.jpeg" },
        team2: { name: "Pat Cummins", image: "/images/cummins.jpeg" },
      },
    },
    {
      id: "2",
      name: "England vs South Africa",
      matchType: "ODI",
      status: "Upcoming",
      venue: "Lord's Cricket Ground",
      date: "2024-01-29",
      dateTimeGMT: "2024-01-29T14:00:00.000Z",
      score: "",
      teams: ["England", "South Africa"],
      captains: {
        team1: { name: "Jos Buttler", image: "/captains/buttler.jpg" },
        team2: { name: "Temba Bavuma", image: "/captains/bavuma.jpg" },
      },
    },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Header />
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src="/images/cricket.webp"
            alt="Cricket Stadium"
            layout="fill"
            objectFit="cover"
            className="filter blur-sm hover:blur-none transition-all duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        </motion.div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 neon-text"
              whileHover={{ scale: 1.02 }}
            >
              Bet Against AI
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-purple-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Challenge our AI in predicting cricket match outcomes
            </motion.p>
            <motion.button
              onClick={() => router.push("/create-your-own-bet")}
              className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all shadow-xl hover:shadow-purple-500/30 flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Betting Now
              <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        />
      </section>

      {/* Live Matches Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-12 flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <FaTrophy className="text-yellow-500" />
            Live & Upcoming Matches
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence>
              {matches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Bet With Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI vs Human",
                description:
                  "Challenge our advanced AI system in predicting match outcomes",
                icon: <FaGlobe className="text-purple-400 text-4xl" />,
              },
              {
                title: "Real-time Updates",
                description:
                  "Get live match updates and betting odds instantly",
                icon: <FaBolt className="text-yellow-400 text-4xl" />,
              },
              {
                title: "Secure Platform",
                description: "Your bets are secured by blockchain technology",
                icon: <FaEthereum className="text-blue-400 text-4xl" />,
              },
            ].map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Platform Statistics
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                label: "Total Bets",
                value: "10,234+",
                icon: <FaChartBar className="text-purple-400 text-3xl" />,
              },
              {
                label: "Active Users",
                value: "2,451",
                icon: <FaUsers className="text-purple-400 text-3xl" />,
              },
              {
                label: "AI Win Rate",
                value: "76%",
                icon: <FaRobot className="text-purple-400 text-3xl" />,
              },
              {
                label: "Total Volume",
                value: "1,234 ETH",
                icon: <FaEthereum className="text-purple-400 text-3xl" />,
              },
            ].map((stat, index) => (
              <BorderAnimationWrapper key={stat.label}>
                <motion.div
                  className="bg-gradient-to-br from-gray-800/50 via-gray-900 to-gray-950 p-6 rounded-xl backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.5, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    bounce: 0.4,
                  }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    {stat.value}
                  </h3>
                  <p className="text-gray-400">{stat.label}</p>
                </motion.div>
              </BorderAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Latest Updates
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Model Update",
                description:
                  "Our prediction model now includes player performance metrics",
                icon: <FaRobot className="text-purple-400 text-2xl" />,
                date: "2 days ago",
              },
              {
                title: "New Features",
                description:
                  "Enhanced wallet protection with multi-sig support",
                icon: <FaShieldAlt className="text-purple-400 text-2xl" />,
                date: "5 days ago",
              },
              {
                title: "Community Milestone",
                description: "Reached 10,000 active users on the platform",
                icon: <FaUsers className="text-purple-400 text-2xl" />,
                date: "1 week ago",
              },
            ].map((update, index) => (
              <BorderAnimationWrapper key={update.title}>
                <motion.div
                  className="bg-gradient-to-br from-gray-800/50 via-gray-900 to-gray-950 p-6 rounded-xl backdrop-blur-sm"
                  initial={{
                    opacity: 0,
                    rotateY: 90,
                    transformPerspective: 1000,
                  }}
                  whileInView={{
                    opacity: 1,
                    rotateY: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {update.icon}
                    <h3 className="text-xl font-semibold">{update.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-4">{update.description}</p>
                  <span className="text-sm text-purple-400">{update.date}</span>
                </motion.div>
              </BorderAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <motion.div
              className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/50 to-purple-500/20 -z-10 hidden md:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            {[
              {
                step: 1,
                title: "Connect Wallet",
                description: "Link your crypto wallet to start betting",
                icon: <FaWallet className="text-purple-400 text-3xl" />,
              },
              {
                step: 2,
                title: "Choose Match",
                description: "Select from live and upcoming cricket matches",
                icon: <FaTrophy className="text-purple-400 text-3xl" />,
              },
              {
                step: 3,
                title: "Place Your Bet",
                description: "Bet against our AI's predictions",
                icon: <FaRobot className="text-purple-400 text-3xl" />,
              },
            ].map((step, index) => (
              <BorderAnimationWrapper key={step.step}>
                <motion.div
                  className="bg-gradient-to-br from-gray-800/50 via-gray-900 to-gray-950 p-8 rounded-xl backdrop-blur-sm"
                  initial={{
                    opacity: 0,
                    y: 50,
                    rotate: -10,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotate: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.3,
                    type: "spring",
                    bounce: 0.4,
                  }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-xl font-bold"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.3 }}
                  >
                    {step.step}
                  </motion.div>
                  <div className="text-center pt-6">
                    {step.icon}
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              </BorderAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            About Us
          </motion.h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <BorderAnimationWrapper>
              <motion.div
                className="bg-gradient-to-br from-gray-800/50 via-gray-900 to-gray-950 p-8 rounded-xl backdrop-blur-sm relative group"
                initial={{
                  opacity: 0,
                  x: -100,
                  skewX: -10,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  skewX: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  bounce: 0.4,
                }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent relative z-10">
                  Our Mission
                </h3>
                <p className="text-gray-400 mb-6 relative z-10">
                  We're revolutionizing sports betting by combining cutting-edge
                  AI technology with blockchain transparency. Our platform
                  offers a unique opportunity to challenge AI predictions while
                  ensuring fair and secure betting experiences.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                  {[
                    {
                      label: "Founded",
                      value: "2024",
                      icon: <FaRegCalendar className="text-purple-400" />,
                    },
                    {
                      label: "Countries",
                      value: "25+",
                      icon: <FaGlobe className="text-purple-400" />,
                    },
                    {
                      label: "Team Size",
                      value: "50+",
                      icon: <FaUsers className="text-purple-400" />,
                    },
                    {
                      label: "Tech Stack",
                      value: "AI & Blockchain",
                      icon: <FaRobot className="text-purple-400" />,
                    },
                  ].map((stat) => (
                    <motion.div
                      key={stat.label}
                      className="border border-purple-500/20 rounded-lg p-4 hover:border-purple-500/40 transition-colors duration-300 group/stat"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {stat.icon}
                        <p className="text-sm text-gray-400">{stat.label}</p>
                      </div>
                      <p className="text-xl font-semibold text-purple-300 group-hover/stat:text-purple-200 transition-colors">
                        {stat.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </BorderAnimationWrapper>

            <BorderAnimationWrapper>
              <motion.div
                className="bg-gradient-to-br from-gray-800/50 via-gray-900 to-gray-950 p-8 rounded-xl backdrop-blur-sm relative group"
                initial={{
                  opacity: 0,
                  x: -100,
                  skewX: -10,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  skewX: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  bounce: 0.4,
                }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent relative z-10">
                  Our Vision
                </h3>
                <p className="text-gray-400 relative z-10">
                  To create a global sports betting ecosystem where AI and human
                  intuition converge, providing unprecedented transparency and
                  excitement in predicting sports outcomes.
                </p>
              </motion.div>
            </BorderAnimationWrapper>

            <motion.button
              onClick={() => router.push("/about")}
              className="relative group/btn overflow-hidden bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-3 rounded-lg text-sm font-semibold w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Learn More About Us
                <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Join Our Community Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Join Our Community
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Discord",
                description: "Join our active community of bettors and traders",
                icon: <FaDiscord className="text-purple-400 text-4xl" />,
                members: "5.2K Members",
                link: "#",
              },
              {
                title: "Telegram",
                description: "Get instant updates and betting signals",
                icon: <FaTelegram className="text-purple-400 text-4xl" />,
                members: "3.8K Members",
                link: "#",
              },
              {
                title: "Twitter",
                description: "Follow us for the latest news and updates",
                icon: <FaTwitter className="text-purple-400 text-4xl" />,
                members: "12K Followers",
                link: "#",
              },
            ].map((platform, index) => (
              <BorderAnimationWrapper key={platform.title}>
                <motion.div
                  className="bg-gradient-to-br from-gray-800/50 via-gray-900 to-gray-950 p-8 rounded-xl backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  {platform.icon}
                  <h3 className="text-xl font-semibold my-4">
                    {platform.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{platform.description}</p>
                  <p className="text-purple-400 text-sm mb-6">
                    {platform.members}
                  </p>
                  <motion.a
                    href={platform.link}
                    className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-2 rounded-lg text-sm font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join Now
                    <FaArrowRight className="text-sm" />
                  </motion.a>
                </motion.div>
              </BorderAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4">
                QuickBet AI
              </h3>
              <p className="text-gray-400">
                The future of sports betting powered by artificial intelligence
                and blockchain technology.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="text-purple-400 hover:text-purple-300"
                >
                  <FaTwitter />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="text-purple-400 hover:text-purple-300"
                >
                  <FaDiscord />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="text-purple-400 hover:text-purple-300"
                >
                  <FaTelegram />
                </motion.a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["Home", "About", "Features", "How It Works", "Contact"].map(
                  (link) => (
                    <li key={link}>
                      <motion.a
                        href="#"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {link}
                      </motion.a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                {["Documentation", "API", "Support", "Terms", "Privacy"].map(
                  (link) => (
                    <li key={link}>
                      <motion.a
                        href="#"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {link}
                      </motion.a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">
                Stay updated with our latest features and releases.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <motion.button
                  className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-2 rounded-r-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaArrowRight />
                </motion.button>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2024 QuickBet AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Add this SVG filter */}
      <svg className="hidden">
        <defs>
          <filter id="pixel-filter">
            <feFlood x="4" y="4" height="2" width="2" />
            <feComposite width="10" height="10" />
            <feTile result="a" />
            <feComposite in="SourceGraphic" in2="a" operator="in" />
            <feMorphology operator="dilate" radius="2" />
          </filter>

          <filter id="glitch">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.15"
              numOctaves="1"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="5"
              result="displacement"
            />
            <feGaussianBlur
              in="displacement"
              stdDeviation="0.5"
              result="blur"
            />
            <feBlend in="SourceGraphic" in2="blur" mode="normal" />
          </filter>
        </defs>
      </svg>
    </main>
  );
}
