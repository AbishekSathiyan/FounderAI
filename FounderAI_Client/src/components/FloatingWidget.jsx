import React from "react";
import { motion } from "framer-motion";
import { FaMoneyBillWave } from "react-icons/fa";

export default function FloatingWidget({ total }) {
  return (
    <motion.div
      className="fixed top-10 right-10 z-50 bg-cyan-500/30 backdrop-blur-lg text-white p-4 rounded-2xl shadow-2xl flex items-center space-x-3 cursor-pointer"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: [0, -10, 0], opacity: 1 }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.1, boxShadow: "0 0 40px #00fff0, 0 0 80px #00fff0" }}
    >
      <FaMoneyBillWave className="text-2xl animate-bounce text-yellow-400" />
      <div className="flex flex-col">
        <span className="text-sm text-gray-200">Total Setup Cost</span>
        <span className="text-xl font-bold">${total || 0}</span>
      </div>
      {/* Neon particle effects */}
      <motion.div
        className="absolute -top-2 -left-2 w-2 h-2 bg-cyan-400 rounded-full blur-xl"
        animate={{ x: [0, 8, 0], y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-2 -right-2 w-2 h-2 bg-pink-400 rounded-full blur-xl"
        animate={{ x: [0, -8, 0], y: [0, 5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}