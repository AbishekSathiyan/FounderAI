import React from "react";
import { motion } from "framer-motion";
import { FaFileInvoiceDollar, FaRegCalendarAlt, FaClipboardList } from "react-icons/fa";

export default function ResultCard({ result }) {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-xl border border-cyan-400/40 rounded-3xl shadow-xl p-6 space-y-6 relative overflow-hidden"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Header */}
      <div className="relative">
        <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400">{result.name}</h2>
        <p className="text-gray-300 mt-1">{result.reason}</p>
        {/* Neon glow effect */}
        <motion.div
          className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-cyan-400/50 blur-2xl animate-pulse"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Cost Breakdown with animated neon bars */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center space-x-2 text-yellow-400">
          <FaFileInvoiceDollar /> Cost Breakdown
        </h3>
        <div className="space-y-3">
          {["license", "visas", "office"].map((item) => (
            <div key={item} className="w-full">
              <div className="flex justify-between mb-1 text-gray-200">
                <span>{item.charAt(0).toUpperCase() + item.slice(1)} Fee</span>
                <span>AED {result.breakdown[item] || 0}</span>
              </div>
              <motion.div
                className="h-3 bg-cyan-400/50 rounded-full overflow-hidden relative"
                initial={{ width: 0 }}
                animate={{
                  width: `${(result.breakdown[item] / result.totalCost) * 100 || 0}%`,
                }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                {/* Neon moving gradient */}
                <motion.div
                  className="h-3 bg-gradient-to-r from-cyan-200 to-cyan-500 rounded-full"
                  animate={{ x: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
          ))}
          <div className="flex justify-between mt-3 font-semibold text-white">
            <span>Total</span>
            <span>AED {result.totalCost}</span>
          </div>
        </div>
      </div>

      {/* Timeline with glowing icons */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center space-x-2 text-green-400">
          <FaRegCalendarAlt /> Setup Timeline
        </h3>
        <ul className="space-y-2 text-gray-300">
          {Object.entries(result.timeline).map(([key, value]) => (
            <motion.li
              key={key}
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-cyan-400 font-bold animate-pulse">●</span>
              <span className="capitalize">{key.replace("-", " ")}: {value || "N/A"}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Required Documents */}
      <div>
        <h3 className="font-semibold mb-2 flex items-center space-x-2 text-purple-400">
          <FaClipboardList /> Required Documents
        </h3>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          {result.documents.map((doc, i) => (
            <motion.li
              key={i}
              className="cursor-pointer hover:text-cyan-400 hover:scale-105 transition-transform"
            >
              {doc}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Notes */}
      {result.notes.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2 text-red-500">Important Notes</h3>
          <ul className="list-disc list-inside space-y-1 text-red-400">
            {result.notes.map((note, i) => (
              <motion.li
                key={i}
                className="hover:text-red-600 hover:scale-105 transition-transform"
              >
                {note}
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}