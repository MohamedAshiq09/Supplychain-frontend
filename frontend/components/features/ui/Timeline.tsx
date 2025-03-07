// Timeline.tsx
"use client";
import { motion } from "framer-motion";

interface TimelineItem {
  time: string;
  title: string;
  content: string;
}

export const Timeline = ({ items }: { items: TimelineItem[] }) => (
  <div className="space-y-4">
    {items.map((item, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="flex items-start space-x-4"
      >
        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
        <div>
          <p className="text-sm text-gray-400">{item.time}</p>
          <p className="font-medium">{item.title}</p>
          <p className="text-sm text-gray-400">{item.content}</p>
        </div>
      </motion.div>
    ))}
  </div>
);